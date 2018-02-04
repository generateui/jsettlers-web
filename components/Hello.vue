<template>
  <div id="hello">
    <h1>Play a test game</h1>

    <h2>1. Player name</h2>
    <input id="player-name" type="text">
    <label for="player-name">Your name:</label>

    <h2>2. Pick a board</h2>
    <div id="board-picker">
      <ul id="board-list">
        <li v-for="board in boards">{{board}}</li>
      </ul>
      <board-preview id="board-preview"></board-preview>
    </div>

    <h2>3. Pick 3 or 4 bots</h2>
    <ul>
      <li v-for="bot in bots">{{bot.name}}</li>
    </ul>

    <h2>4. Start!</h2>
    <input type="button" value="start!" />

  </div>
</template>

<script>
import BoardPreview from './BoardPreview.vue'

export default {
  name: 'hello',
  components: { 
    BoardPreview
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      boards: [
        "Standard 4p",
        "Ruud's awesome creation"
      ],
      bots: [
        { name: "SimpleBot", id: 0 },
        { name: "EvenSimpelerBot", id: 1 },
        { name: "DerpyBot", id: 2 },
      ]
    }
  }
}
</script>

<style scoped>
#board-picker {
    display: flex;
    flex: 1 1 auto;
}
#board-list {
  flex: 1;
}
#board-preview {
  flex: 1;
}
</style>