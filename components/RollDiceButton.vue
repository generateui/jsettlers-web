<template>
    <div @click="rollDice" v-bind:class="{ disabled: !canRollDice }">
        <die-view id="first" v-bind:die="game.dice === null ? null: game.dice.die1"></die-view>
        <die-view id="second" v-bind:die="game.dice === null ? null : game.dice.die2"></die-view>
    </div>
</template>

<script>
import * as m from "../src/matcher";
import DieView from "./DieView.vue";
import { RollDice } from '../src/actions/rollDice';

export default {
    components: {
        DieView
    },
    name: 'roll-dice-button',
    props: {
        game: {
            type: Object
        }
    },
    data() {
        return {
            messages: [],
            canRollDice: false,
        }
    },
    methods: {
        updateCanRollDice() {
            const game = this.game;
            const player = this.game.player;
            this.messages = m.match([
                m.isOnTurn(game, player),
                m.isExpected(game, new RollDice({player: player})),
            ]);
            this.canRollDice = this.messages.length === 0;
        },
        rollDice() {
            this.$emit("rollDice");
        }
    },
    mounted() {
        this.updateCanRollDice();
        this.removeActionAddedHandler = this.game.actions.added((action) => {
            this.updateCanRollDice();
        })
    },
    unmount() {
        this.removeActionAddedHandler();
    }
}
</script>

<style scoped>

</style>