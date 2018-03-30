<template>
    <div @click="rollDice">
        <die-view id="first" v-bind:die="dice.die1"></die-view>
        <die-view id="second" v-bind:die="dice.die2"></die-view>
    </div>
</template>

<script>
import DieView from "./DieView.vue";

export default {
    components: {
        DieView
    },
    name: 'dice-view',
    props: {
        dice: {
            type: Object
        }
    },
    methods: {
        rollDice: function() {
            this.$emit("rollDice");
        }
    }
}
</script>

<style scoped>

</style>