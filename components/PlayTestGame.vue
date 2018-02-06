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

      <div id="bot-picker-wrapper">
        <h2>3. Pick 3 or 4 bots</h2>
        <ul>
          <li v-for="bot in bots">{{bot.name}}</li>
        </ul>
      </div>

      <h2>4. Start!</h2>
      <input type="button" value="start!" />
    </div>

    <div id="right">
      <board-preview id="board-preview" v-bind:board="board"></board-preview>
    </div>

  </div>
</template>

<script>
import BoardPreview from './BoardPreview.vue';
import {User} from '../src/player.js';
import { Standard4pDesign, JustSomeSea, TheGreatForest } from '../src/board';

const boards = [
  new Standard4pDesign(), new JustSomeSea(), new TheGreatForest()
];

export default {
  name: 'play-test-game',
  components: { 
    BoardPreview
  },
  data () {
    return {
      user: new User({name: "player 1"}),
      boards: boards,
      board: boards[0],
      bots: [
        { name: "SimpleBot", id: 0 },
        { name: "EvenSimpelerBot", id: 1 },
        { name: "DerpyBot", id: 2 },
        { name: "DerpierBot", id: 3 },
      ]
    }
  },
  methods: {
    selectBoard(board) {
      this.$data.board = board;
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
#board-picker-wrapper {
  flex: 1;
}
#board-list {
  flex: 1;
}
#board-preview {
  flex: 4;
  width: 100%;
}
#bot-picker-wrapper {
  flex: 1;
}
#board-list {
  overflow-y: scroll;
}
#left {
  flex: 1;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}
#right{
  flex: 4;
}
li:hover {
  background-color: grey;
  cursor: pointer;
}
</style>