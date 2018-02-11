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
        </div>
        <div id="tab-content">
            <action-log v-if="showActions" id="action-log" v-bind:game="game"></action-log>
            <div v-if="showChats" id="chats"></div>
        </div>
    </div>

    <div id="right">
        <div id="game-board-renderer"></div>
        <build-actions></build-actions>
        <player-assets v-bind:player="game.playingPlayer"></player-assets>
    </div>

  </div>

</template>

<script>
    import PlayerInfo from "./PlayerInfo.vue";
    import PlayerAssets from "./PlayerAssets.vue";
    import BuildActions from "./BuildActions.vue";
    import BankView from "./BankView.vue";
    import ActionLog from "./ActionLog.vue";
    import DiceView from "./DiceView.vue";
    import {Game} from "../src/game.js";
    import {Bank} from "../src/bank.js";
    import {GameBoardRenderer} from "../src/ui/webgl/gameBoardRenderer.js";
    import {Player, User} from "../src/player.js";
    import { Standard4pDesign, BoardDescriptor } from '../src/board.js';

    export default {
        name: 'game',
        components: {
            PlayerInfo, PlayerAssets, BuildActions, BankView, ActionLog, DiceView
        },
        props: {
            settings: {
                type: Object
            }
        },
        data() {
            return {
                showActions: true,
                showChat: false,
                game: null
            }
        },
        methods: {
            doShowActions: function() {
                this.$data.showActions = true;
                this.$data.showChat = false;
            },
            doShowChat: function() {
                this.$data.showActions = false;
                this.$data.showChat = true;
            },
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
            game.gameBoard = board;
            const playingPlayer = settings.players[0];
            game.players.push(playingPlayer);

            var iterator = Player.colors[Symbol.iterator]();
            for(var player of game.players) {
                player.color = iterator.next().value;
            }
            game.playingPlayer = playingPlayer;
            this.$data.game = game;
        },
        beforeMount: function() {
            console.log("test");

        },
        mounted: function() {
            var brEl = document.getElementById("game-board-renderer");
            const game = this.$data.game;
            const boardRenderer = new GameBoardRenderer(brEl, game);
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