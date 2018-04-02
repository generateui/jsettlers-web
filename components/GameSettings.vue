<template>
    <div id="play-test-game">
        <div id="left">
            <h1>Play a test game</h1>

            <h2>1. Player name</h2>
            <div id="player-info-wrapper">
                <input id="player-name" type="text" :value="user.name">
                <label for="player-name">Your name:</label>
            </div>

            <h2>2. Pick a board</h2>
            <ul id="board-list">
                <li v-for="board in boards" @click="selectBoard(board)">{{board.name}}</li>
            </ul>

            <h2>3. Pick 3 or 4 bots</h2>
            <div id="bot-picker-wrapper">

              <div id="bot-list-wrapper">
                  <h3>all bots:</h3>
                  <ul id="bot-list">
                      <li 
                          v-for="bot in bots"
                          :key="bot.name"
                          :data-tooltip="`${bot.description}`"
                          @click="addBot(bot)">{{bot.name}}</li>
                  </ul>
              </div>

              <div id="selected-bot-list-wrapper">
                  <h3>your selected bots:</h3>
                  <ul id="selected-bot-list">
                      <li v-for="bot in selectedBots" @click="removeBot(bot)">{{bot.name}}</li>
                  </ul>
              </div>

            </div>

            <h2>4. Start!</h2>
            <button @click="startGame()"><h2>Start</h2></button>
        </div>

        <div id="right">
            <board-preview id="board-preview" :board="board"></board-preview>
        </div>

    </div>
</template>

<script>
import BoardPreview from './BoardPreview.vue';
import { User } from '../src/player.js';
import { Standard4pDesign, JustSomeSea, TheGreatForest, From2DBoard } from '../src/board.js';
import { GameSettings } from '../src/game.js';
import { Player } from '../src/player.js';
import { Bot, BotDescriptor } from '../src/bot';
import { ClientRandom } from '../src/random';

const boards = [
    Standard4pDesign.descriptor,
    JustSomeSea.descriptor,
    TheGreatForest.descriptor,
    From2DBoard.descriptor
];
const bots = [
    Bot.descriptor
];

export default {
    name: 'game-settings',
    components: { 
        BoardPreview
    },
    data () {
        return {
            user: new User({name: "player 1"}),
            boards: boards,
            board: boards[0],
            bots: bots,
            selectedBots: [],
        }
    },
    methods: {
        selectBoard(board) {
            this.board = board;
        },
        addBot(bot) {
            const random = new ClientRandom();
            const index = this.bots.indexOf(bot);
            const botInstance = bot.createNamedInstance();
            this.selectedBots.push(botInstance);
        },
        removeBot(bot) {
            const index = this.selectedBots.indexOf(bot);
            this.selectedBots.splice(index, 1);
        },
        startGame() {
            const gameSettings = new GameSettings({
                boardDescriptor: this.board,
                bots: this.selectedBots,
                players: [new Player({ user: this.user })]
            });
            window.gameSettings = gameSettings; // how to pass in an object to receiving router component?
            this.$router.push({ name:"game", params: {settings: gameSettings } });
        }
    }
}
</script>

<style scoped>
#play-test-game {
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
}
#left {
    flex: 1;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    background-color: var(--main-background-color-dark);
    padding: 1em;
}
#right{
    flex: 4;
    background-color: black;
}
#board-list {
    padding: 1em;
    flex: 1;
    height: 100%;
    border: 1px solid black;
}
#board-preview {
    flex: 4;
    width: 100%;
    height: 100%;
}
#bot-picker-wrapper {
    flex: 1;
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    padding: 1em;
    border: 1px solid black;
}
    #bot-list-wrapper {
        flex: 1;
    }
    #selected-bot-list-wrapper{
        flex:1;
    }
#board-list {
    overflow-y: scroll;
}

li:hover {
  background-color: grey;
  cursor: pointer;
}
input[type="text"] {
  padding: 0.5em;
}
input[type="button"] {
  height: 4em;
}
</style>