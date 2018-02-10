<template>
  <div id="game">
    <div id="left">
        <div id="players">
            <div v-for="player in settings.players">
                <player-info v-bind:player="player"></player-info>
            </div>
        </div>
        <bank-view id="bank" v-bind:bank="settings.bank"></bank-view>

        <div id="tabs">
            <button class="tab-button" @click="doShowActions()">actions</button>
            <button class="tab-button" @click="doShowChat()">chat</button>
        </div>
        <div id="tab-content">
            <action-log v-if="showActions" id="action-log"></action-log>
            <div v-if="showChats" id="chats">
                
            </div>
        </div>
        
        
    </div>

    <div id="right">
        <div id="game-board-renderer"></div>
        <build-actions></build-actions>
        <player-assets v-bind:player="settings.playingPlayer"></player-assets>
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
    import {BoardRenderer} from "../src/ui/webgl/boardRenderer.js";
    import {Player, User} from "../src/player.js";
    import { Standard4pDesign, BoardDescriptor } from '../src/board.js';

    const players = [
        new Player({ color: 0xff0000, user: new User({name: "derpy"}) }),
        new Player({ color: 0x00ff00, user: new User({name: "derpy2"}) }),
        new Player({ color: 0x0000ff, user: new User({name: "derpy3"}) }),
        new Player({ color: 0xffffff, user: new User({name: "derpy4"}) })
    ];
    
    export default {
        name: 'game',
        components: {
            PlayerInfo, PlayerAssets, BuildActions, BankView, ActionLog, DiceView
        },
        data() {
            return {
                settings: {
                    boardDescriptor: Standard4pDesign.descriptor,
                    players: players,
                    playingPlayer: players[0],
                    bank: new Bank()
                },
                showActions: true,
                showChat: false
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
        mounted: function() {
            const settings = this.$data.settings;
            const board = settings.boardDescriptor.createBoard();
            board.generateBoardForPlay();
            const game = new Game();
            game.gameBoard = board;
            var brEl = document.getElementById("game-board-renderer");
            const boardRenderer = new BoardRenderer(brEl, board);
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