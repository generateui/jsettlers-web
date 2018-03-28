<template>
  <div id="game">
    <div id="left">
        <trade-bank-dialog 
            v-if="showTradeBankDialog" 
            :game="game" 
            @toggleTradeBankDialog="toggleTradeBankDialog"
            @trade="tradePlayer"
            @close="closeTradeBankDialog"
            :keyListener="keyListener"></trade-bank-dialog>
        <div id="players">
            <div v-for="player in game.players" :key="player.id">
                <player-info 
                    :player="player" 
                    :game="game" 
                    :ref="'player' + player.id"></player-info>
            </div>
        </div>
        <bank-view id="bank" :bank="game.bank" :update="update"></bank-view>

        <div id="tabs">
            <button class="tab-button" @click="tabMode = TABMODE.actions">actions</button>
            <button class="tab-button" @click="tabMode = TABMODE.chat">chat</button>
            <button class="tab-button" @click="tabMode = TABMODE.debug">debug</button>
            <button class="tab-button" @click="tabMode = TABMODE.expectation">expect</button>
        </div>
        <div id="tab-content">
            <action-log 
                v-show="tabMode === TABMODE.actions" 
                id="action-log" 
                :actions="game.actions.array"></action-log>
            <div v-show="tabMode === TABMODE.chat" id="chats"></div>
            <div v-show="tabMode === TABMODE.expectation" id="queue"></div>
            <debug-perform-actions 
                v-show="tabMode === TABMODE.debug" 
                :game="game" 
                :host="host" 
                :keyListener="keyListener"
                @behaviorChanged="behaviorChanged"></debug-perform-actions>
        </div>
    </div>

    <div id="right">
        <div id="game-board-renderer"></div>
        <actions 
            :game="game" 
            @behaveThenAct="behaveThenAct" 
            @action="performAction"
            @rolldice="rollDice"
            @endTurn="endTurn"
            @toggleTradeBankDialog="toggleTradeBankDialog"
            :keyListener="keyListener"></actions>
        <player-assets 
            :game="game"
            :player="game.player"
            :update="update"
            :showLooseResourcesDialog="showLooseResourcesDialog"
            @looseResources="looseResources"
            @action="performAction">
        </player-assets>
        <actions-message :game="game"></actions-message>
    </div>

  </div>

</template>

<script>
import Vue from 'vue';
import PlayerInfo from "./PlayerInfo.vue";
import PlayerAssets from "./PlayerAssets.vue";
import Actions from "./Actions.vue";
import BankView from "./BankView.vue";
import ActionLog from "./ActionLog.vue";
import DiceView from "./DiceView.vue";
import DebugPerformActions from "./debug/DebugPerformActions.vue";
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
import { EndTurn } from '../src/actions/endTurn';
import { Bot } from '../src/bot';

var boardRenderer = null;
var host = null;
const TABMODE = {
    actions: 0,
    chat: 1,
    debug: 2,
    expectation: 3
};
Vue.prototype.TABMODE = TABMODE;
var botPlayers = [];
var activeBots = [];

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
            tabMode: TABMODE.debug,
            game: null,
            selectedPlayer: null,
            host: null,
            keyListener: new KeyListener(),
            showTradeBankDialog: false,
            update: false,
            showLooseResourcesDialog: false,
            youAction: null,
        }
    },
    methods: {
        toggleTradeBankDialog() {
            this.showTradeBankDialog = !this.showTradeBankDialog;
        },
        closeTradeBankDialog() {
            this.showTradeBankDialog = false;
        },
        rollDice() {
            let rollDice = RollDice.createData(this.game.player);
            this.act(rollDice);
        },
        tradeBank(action) {
            this.performAction(action);
            this.showTradeBankDialog = false;
            this.$forceUpdate();
            this.update = !this.update;
        },
        tradePlayer(action) {
            this.performAction(action);
            this.update = !this.update;
            this.closeTradeBankDialog();
        },
        looseResources(action) {
            this.$data.showLooseResourcesDialog = false;
            this.performAction(action);
            this.update = !this.update;
        },
        endTurn() {
            let endTurn = EndTurn.createData(this.game.player);
            this.act(endTurn);
        },
        behaviorChanged(behavior) {
            boardRenderer.behavior = behavior;
        },
        performAction: async function(action) {
            try {
                await this.host.send(action);
                this.update = !this.update;
            } catch (error) {
                alert(error.message);
            }
        },
        act: async function(action) {
            try {
                await this.host.send(action);
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
        // force a response from the player
        forceYouActionIfNeeded() {
            const action = this.game.expectation.youAction;
            if (action === null) {
                this.youAction = null;
                return; // player don't need to do anything
            }
            const changed = this.youAction === null ||
                action.constructor.name !== this.youAction.constructor.name;
            if (!changed) {
                return;
            }
            this.youAction = action;
            if (action.isTradeResponse) {
                // popup traderesponse dialog
            }
            if (action instanceof BuildTown) {
                const nodes = this.game.phase.townPossibilities(this.game, this.player);
                const behavior = new gb.PickTownNode(nodes, this.keyListener);
                const createActionData = (player, node) => BuildTown.createData(player, node);
                this.behaveThenAct(behavior, createActionData);
            }
            if (action instanceof BuildRoad) {
                const edges = this.game.phase.roadPossibilities(this.game, this.game.player);
                const behavior = new gb.PickRoadEdge(edges, this.keyListener);
                const createAction = (player, edge) => BuildRoad.createData(player, edge);
                this.behaveThenAct(behavior, createAction);
            }
            if (action instanceof MoveRobber) {
                const behavior = new gb.MoveRobber();
                const createAction = (player, coord) => MoveRobber.createData(player, coord);
                this.behaveThenAct(behavior, createAction);
            }
            if (action instanceof RobPlayer) {
                const coord = this.game.board.robber.coord;
                const opponents = new Set();
                const player = this.game.player;
                for (let node of coord.nodes) {
                    if (this.game.board.nodePieces.map.has(node)) {
                        const piece = this.game.board.nodePieces.map.get(node);
                        if (piece.player !== player) {
                            opponents.add(piece.player);
                        }
                    }
                }
                if (opponents.size > 0) {
                    const behavior = new gb.PickPlayer(opponents);
                    const createAction = (player, opponent) => RobPlayer.createData(player, opponent);
                    // if we immediately execute this, MoveRobber behaveThenAct 
                    // is not yet finished. This is most likely not a problem 
                    // when async and serialization is implemented, as the 
                    // MoveRobber behaveThenAct will win from the 
                    // game.actions.changed eventhandler.
                    window.setTimeout(() => this.behaveThenAct(behavior, createAction), 500);
                } else {
                    const action = RobPlayer.createData(player, null);
                    this.act(action);
                }
            }
            if (action instanceof LooseResources) {
                this.showLooseResourcesDialog = true;
            }
        }
    },
    created() {
        const board = this.settings.boardDescriptor.createBoard();
        board.generateBoardForPlay();
        const game = new Game();
        for (var botSpec of this.settings.bots) {
            var botPlayer = new Player({
                user: new User({
                    name: botSpec.name,
                    id: botSpec.id
                })
            });
            // this.host.addBot(bot);
            botPlayers.push(botPlayer);
            game.players.push(botPlayer);
        }
        game.board = board;
        const player = this.settings.players[0];
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
                const rollDice = item;
                if (rollDice.dice.total !== 7) {
                    const behavior = new gb.ShowProduction(this.keyListener, rollDice.dice.total);
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
    mounted() {
        var brEl = document.getElementById("game-board-renderer");
        const game = this.game;
        boardRenderer = new BoardRenderer(brEl, game.board);
        this.host = new HostAtClient(game);
        for (let botPlayer of botPlayers) {
            var bot = new Bot(this.host, game, botPlayer);
            activeBots.push(bot);
        }

        this.removeActionAddedHandler = game.actions.added(item => {
            for (var player of game.players) {
                this.$refs["player" + player.id][0].showAction(item);
            }
            this.forceYouActionIfNeeded();
        });
        const that = this;
    },  
    destroyed() {
        boardRenderer.dispose();
        this.removeActionAddedHandler();
        for (let bot of activeBots) {
            bot.dispose();
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
  background-color: black;
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
  min-width: 0; /* nested flexboxes need this */
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