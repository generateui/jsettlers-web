<template>
  <div id="game">
    <div id="left">
        <div id="players">
            <div v-for="player in game.players">
                <player-info v-bind:player="player"></player-info>
            </div>
        </div>
        <bank-view id="bank" v-bind:bank="game.bank"></bank-view>

        <div id="tabs">
            <button class="tab-button" @click="doShowActions()">actions</button>
            <button class="tab-button" @click="doShowChat()">chat</button>
            <button class="tab-button" @click="doShowPerformAction()">action</button>
        </div>
        <div id="tab-content">
            <action-log v-if="showActions" id="action-log" v-bind:actions="game.actions"></action-log>
            <div v-if="showChats" id="chats"></div>
            <debug-perform-actions v-if="showPerformActions" v-bind:game="game" v-on:behaviorChanged="behaviorChanged"></debug-perform-actions>
        </div>
    </div>

    <div id="right">
        <div id="game-board-renderer"></div>
        <actions></actions>
        <player-assets v-bind:player="game.player"></player-assets>
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

    import {Game} from "../src/game.js";
    import {Bank} from "../src/bank.js";
    import {BoardRenderer} from "../src/ui/webgl/boardRenderer.js";
    import {Player, User} from "../src/player.js";
    import { Standard4pDesign, BoardDescriptor } from '../src/board.js';

    var boardRenderer = null;
    var receiver = null;
    var host = null;

    export default {
        name: 'game',
        components: {
            PlayerInfo, PlayerAssets, Actions, BankView, ActionLog, DiceView, DebugPerformActions
        },
        props: {
            settings: {
                type: Object
            }
        },
        data() {
            return {
                showActions: false,
                showChat: false,
                showPerformActions: true,
                game: null,
                selectedPlayer: null,
            }
        },
        methods: {
            doShowActions: function() {
                this.$data.showActions = true;
                this.$data.showChat = false;
                this.$data.showPerformActions = false;
            },
            doShowChat: function() {
                this.$data.showActions = false;
                this.$data.showChat = true;
                this.$data.showPerformActions = false;
            },
            doShowPerformAction: function() {
                this.$data.showActions = false;
                this.$data.showChat = false;
                this.$data.showPerformActions = true;
            },
            behaviorChanged: function(behavior) {
                boardRenderer.behavior = behavior;
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
            this.$data.game = game;
        },
        mounted: function() {
            var brEl = document.getElementById("game-board-renderer");
            const game = this.$data.game;
            boardRenderer = new BoardRenderer(brEl, game.board);
            
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

</style>