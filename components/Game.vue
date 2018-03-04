<template>
  <div id="game">
    <div id="left">
        <trade-bank-dialog 
            v-if="showTradeBankDialog" 
            v-bind:game="game" 
            v-on:trade="tradeBank"></trade-bank-dialog>
        <div id="players">
            <div v-for="player in game.players">
                <player-info v-bind:player="player" v-bind:ref="'player' + player.id"></player-info>
            </div>
        </div>
        <bank-view id="bank" v-bind:bank="game.bank" v-bind:update="update"></bank-view>

        <div id="tabs">
            <button class="tab-button" @click="doShowActions()">actions</button>
            <button class="tab-button" @click="doShowChat()">chat</button>
            <button class="tab-button" @click="doShowPerformAction()">action</button>
            <button class="tab-button" @click="doShowQueue()">queue</button>
        </div>
        <div id="tab-content">
            <action-log 
                v-if="showActions" 
                id="action-log" 
                v-bind:actions="game.actions.array"></action-log>
            <div v-if="showChats" id="chats"></div>
            <div v-if="showQueue" id="queue">
                <!-- <ul>
                    <li v-for="item in game.queue.queuedActions">
                        <div v-if="item instanceof QueuedAction">
                            {{item.action.constructor.name}} - {{item.action.player.user.name}}
                            <span v-if="item.optional"> (optional)</span>
                        </div>
                        <ul v-if="item instanceof Unordered">
                            <li v-for="nested in item.queuedActions">
                                {{nested.action.constructor.name}} - {{nested.action.player.user.name}}
                                <span v-if="nested.optional"> (optional)</span>
                            </li>
                        </ul>
                    </li>
                </ul> -->
            </div>
            <debug-perform-actions 
                v-if="showPerformActions" 
                v-bind:game="game" 
                v-bind:host="host" 
                v-bind:keyListener="keyListener"
                v-on:behaviorChanged="behaviorChanged"></debug-perform-actions>
        </div>
    </div>

    <div id="right">
        <div id="game-board-renderer"></div>
        <actions 
            v-bind:game="game" 
            v-on:behaveThenAct="behaveThenAct" 
            v-on:action="performAction"
            v-on:rolldice="rollDice"
            v-on:tradebank="openTradeBankDialog"
            v-bind:keyListener="keyListener"></actions>
        <player-assets 
            v-bind:game="game"
            v-bind:player="game.player"
            v-bind:update="update"
            v-bind:showLooseResourcesDialog="showLooseResourcesDialog"
            v-on:looseResources="looseResources"
            v-on:action="performAction">
        </player-assets>
        <actions-message
            v-bind:game="game"></actions-message>
    </div>

  </div>

</template>

<script>
    import PlayerInfo from "./PlayerInfo.vue";
    import PlayerAssets from "./PlayerAssets.vue";
    import Actions from "./Actions.vue";
    import BankView from "./BankView.vue";
    import ActionLog from "./ActionLog.vue";
    import DiceView from "./DiceView.vue";
    import DebugPerformActions from "./DebugPerformActions.vue";
    import TradeBankDialog from "./TradeBankDialog.vue";
    import ActionsMessage from "./ActionsMessage.vue";

    import {HostAtClient} from "../src/host.js";
    import {Game, GameSettings} from "../src/game.js";
    import {Bank} from "../src/bank.js";
    import {RollDice} from "../src/actions/rollDice.js";
    import {BoardRenderer} from "../src/ui/webgl/boardRenderer.js";
    import {Player, User} from "../src/player.js";
    import { Standard4pDesign, JustSomeSea, TheGreatForest, BoardDescriptor } from '../src/board.js';
    import {KeyListener} from "../src/ui/keyListener.js";
    import * as bb from "../src/ui/boardBehavior.js";
    import * as gb from "../src/ui/gameBehavior.js";
    import { LooseResources } from '../src/actions/looseResources';
    import { RobPlayer } from '../src/actions/robPlayer';
    import { MoveRobber } from '../src/actions/moveRobber';
    import { BuildTown } from '../src/actions/buildTown';
    import { BuildRoad } from '../src/actions/buildRoad';

    var boardRenderer = null;
    var host = null;

    const boards = [
        Standard4pDesign.descriptor,
        JustSomeSea.descriptor,
        TheGreatForest.descriptor,
    ];
    const bots = [
        { name: "SimpleBot", id: 0 },
        { name: "EvenSimpelerBot", id: 1 },
        { name: "DerpyBot", id: 2 },
        { name: "DerpierBot", id: 3 },
    ];

    export default {
        name: 'game',
        components: {
            PlayerInfo, PlayerAssets, Actions, BankView, ActionLog, DiceView, 
            DebugPerformActions, TradeBankDialog, ActionsMessage
        },
        props: {
            settings: {
                type: Object,
                default: function() {
                    return new GameSettings({
                        boardDescriptor: boards[0],
                        bots: [bots[1], bots[2], bots[3]],
                        players: [new Player({ user: new User({name: "player 1"}) })],
                    })
                }
            }
        },
        data() {
            return {
                showActions: false,
                showChat: false,
                showPerformActions: true,
                showQueue: false,
                game: null,
                selectedPlayer: null,
                host: null,
                keyListener: new KeyListener(),
                showTradeBankDialog: false,
                update: false,
                showLooseResourcesDialog: true,
            }
        },
        methods: {
            doShowActions: function() {
                this.showActions = true;
                this.showChat = false;
                this.showPerformActions = false;
                this.showQueue = false;
            },
            doShowChat: function() {
                this.showActions = false;
                this.showChat = true;
                this.showPerformActions = false;
                this.showQueue = false;
            },
            doShowPerformAction: function() {
                this.showActions = false;
                this.showChat = false;
                this.showPerformActions = true;
                this.showQueue = false;
            },
            doShowQueue() {
                this.showActions = false;
                this.showChat = false;
                this.showPerformActions = false;
                this.showQueue = true;
            },
            openTradeBankDialog: function() {
                this.showTradeBankDialog = true;
            },
            rollDice: function() {
                let rollDice = RollDice.createData(this.game.player);
                this.act(rollDice);
            },
            tradeBank: function(action) {
                this.performAction(action);
                this.showTradeBankDialog = false;
                this.$forceUpdate();
                this.update = !this.update;
            },
            looseResources: function(action) {
                this.showLooseResourcesDialog = false;
                this.performAction(action);
                this.update = !this.update;
            },
            behaviorChanged: function(behavior) {
                boardRenderer.behavior = behavior;
            },
            performAction: async function(action) {
                try {
                    await this.$data.host.send(action);
                    this.update = !this.update;
                } catch (error) {
                    alert(error.message);
                }
            },
            act: async function(action) {
                try {
                    await this.$data.host.send(action);
                } catch (error) {
                    alert(error.message);
                }
            },
            behaveThenAct: async function(behavior, createAction) {
                // Set the board to the new behavior
                boardRenderer.behavior = behavior;
                try {
                    // await the behavior for completion (e.g. a click on the board on some renderer)
                    const result = await behavior.promise;
                    // create some data
                    const action = createAction(this.$data.game.player, result);
                    // send the data
                    await this.$data.host.send(action);
                } catch (error) {
                    // add it to game errors?
                    alert(error.message);
                } finally {
                    boardRenderer.behavior = new bb.NoBehavior();
                }
            },
            forceYouActionIfNeeded(action) {
                if (action === null) {
                    return;
                }
                if (action.isTradeResponse) {
                    // popup traderesponse dialog
                }
                if (action instanceof BuildTown) {
                    const behavior = new gb.BuildTown(this.player, this.keyListener);
                    const createActionData = (player, node) => BuildTown.createData(this.player, node);
                    this.behaveThenAct(behavior, createActionData);
                }
                if (action instanceof BuildRoad) {
                    const behavior = new gb.BuildRoad(this.player, this.keyListener);
                    const createAction = (player, edge) => BuildRoad.createData(this.player, edge);
                    this.behaveThenAct(behavior, createAction);
                }
                if (action instanceof MoveRobber) {
                    const behavior = new gb.MoveRobber();
                    const createAction = (player, coord) => MoveRobber.createData(player, coord);
                    this.behaveThenAct(behavior, createAction);
                }
                if (action instanceof RobPlayer) {
                    const behavior = new gb.PickPlayer(this.opponents);
                    const createAction = (player, opponent) => RobPlayer.createData(player, opponent);
                    this.behaveThenAct(behavior, createAction);
                }
                if (action instanceof LooseResources) {
                    this.showLooseResourcesDialog = true;
                }
            }
        },
        created: function() {
            const settings = this.$props.settings;
            const board = settings.boardDescriptor.createBoard();
            board.generateBoardForPlay();
            const game = new Game();
            for (var bot of settings.bots) {
                var botPlayer = new Player({
                    user: new User({
                        name: bot.name,
                        id: bot.id
                    })
                });
                game.players.push(botPlayer);
            }
            game.board = board;
            const player = settings.players[0];
            game.players.push(player);

            var iterator = Player.colors[Symbol.iterator]();
            var playerId = 0;
            for(var p of game.players) {
                p.color = iterator.next().value;
                p.id = playerId;
                playerId++;
            }
            game.player = player;
            game.playerOnTurn = player;
            this.game = game;
            window.game = game; // nice for debugging
            game.actions.added(async item => {
                if (item instanceof RollDice) {
                    if (item.die1 + item.die2 !== 7) {
                        const diceRoll = item.die1 + item.die2;
                        const behavior = new gb.ShowProduction(this.keyListener, diceRoll);
                        boardRenderer.behavior = behavior;
                        await behavior.promise;
                        boardRenderer.behavior = new bb.NoBehavior();
                    }
                }
            });
            game.longestRoad.edgesChanged((oldEdges, newEdges) => {
                if (newEdges === null) {
                    return;
                }
                if (oldEdges === null || oldEdges.length !== newEdges.length) {
                    boardRenderer.animateLongestRoad(game.longestRoad.edges);
                }
            });
        },
        mounted: function() {
            var brEl = document.getElementById("game-board-renderer");
            const game = this.game;
            boardRenderer = new BoardRenderer(brEl, game.board);
            this.host = new HostAtClient(game);

            this.removeActionAddedHandler = game.actions.added(item => {
                for (var player of game.players) {
                    this.$refs["player" + player.id][0].showAction(item);
                }
            });
            const that = this;
            this.removeExpectationChangedHandler = game.expectationChanged((oldExpectation, newExpectation) => {
                if (that.removeYouActionChangedHandler !== undefined){
                    that.removeYouActionChangedHandler();
                }
                that.removeYouActionChangedHandler = game.expectation.youActionChanged((oldYouAction, newYouAction) => {
                    that.forceYouActionIfNeeded(newYouAction);
                });
                that.forceYouActionIfNeeded(newExpectation.youAction);
            });
        },
        destroyed: function() {
            boardRenderer.dispose();
            this.removeExpectationChangedHandler();
            this.removeActionAddedHandler();
            if (this.removeYouActionChangedHandler !== undefined){
                this.removeYouActionChangedHandler();
            }
        }
    }
</script>

<style scoped>

#game {
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
#left {
  flex: 1;
  display: flex;
  flex: auto auto auto auto;
  flex-direction: column;
  background-color: black;;
}
#players {
    flex: 0 0 auto;
}

#bank {
    display: inline-flex;
    flex: 0 0 auto;
}
#tabs {
    flex: 0 0 auto;
}
#action-log {
    flex: auto;
}
#tab-content {
    flex: 1 1 auto;
    overflow-y: scroll;
    color: white;
}
#right{
  flex: 9;
  background-color: black;
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}
#game-board-renderer {
    top: 0;
    left: 0;
    background-color: #000;
    display: flex;
    flex: 8;
    height: 100%;
    width: 100%;
}
#queue > ul, queue > li {
    padding-left: 1em;
}
#queue {
    padding-left: 1em;
}
</style>