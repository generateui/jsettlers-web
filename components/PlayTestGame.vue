<template>
    <router-view></router-view>
</template>

<script>
import GameSettings from './GameSettings.vue';
import Game from './Game.vue';

export default {
  name: 'play-test-game',
  components: {
    GameSettings, Game
  }
}
</script>

<style scoped>

</style>