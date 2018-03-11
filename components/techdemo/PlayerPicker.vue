<template>
  <ul class="toggle-button">
    <li v-for="p in players">
        <input type="radio" :id="`player${p.user.name}`" name="playerPicker">
        <label 
            :for="`player${p.user.name}`"
            @click="click(p)" 
            :class="{active: player === p}">
            <span :style="{color: toCssColor(p.color)}">⬛ </span>
            {{p.user.name}}
        </label>
    </li>
  </ul>
</template>

<script>
  import {Player, User, Color} from "../../src/player.js";
  const players = [
      new Player({ color: Color.red, user: new User({name: "player1" }) }),
      new Player({ color: Color.green, user: new User({name: "player2" }) }),
      new Player({ color: Color.blue, user: new User({name: "player3" }) }),
      new Player({ color: Color.white, user: new User({name: "player4" }) }),
      new Player({ color: Color.orange, user: new User({name: "player5" }) }),
      new Player({ color: Color.brown, user: new User({name: "player6" }) }),
  ];
  export default {
    name: 'player-picker',
    data () {
      return {
        players: players,
        player: players[0],
      }
    },
    methods: {
        click(player) {
            this.$data.pickedPlayer = player;
            this.$emit('playerChanged', player);
        },
        toCssColor(integer) {
          return '#' + ('00000' + (integer | 0).toString(16)).substr(-6);
      }
    }
  }

</script>

<style scoped>

</style>