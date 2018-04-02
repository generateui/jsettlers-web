<template>
    <popper trigger="hover" :options="{placement: 'top'}" class="root">
        <ul class="popper popup">
            <div class="popup-hero">
                <img class="popup-logo" src="doc/images/EndTurn48.png" />
                <span class="popup-title">End turn</span>
            </div>
            <ul>
                <li v-for="message in messages" :key="message">{{message}}</li>
            </ul>
        </ul>

        <div 
            id="end-turn"
            @click="endTurn()"
            class="build-button"
            slot="reference"
            v-bind:class="{ disabled: !canEndTurn }">
            <img id="button" src="doc/images/EndTurn48.png" />
        </div>
    </popper>
</template>

<script>
import * as m from "../src/matcher";
import Popper from 'vue-popperjs';
import { EndTurn } from '../src/actions/endTurn';

export default {
    name: 'end-turn-button',
    components: { Popper },
    props: {
        game: {
            type: Object
        }
    },
    data() {
        return {
            messages: [],
            canEndTurn: false,
        }
    },
    methods: {
        updateCanEndTurn() {
            const game = this.game;
            const player = this.game.player;
            this.messages = m.match([
                m.isOnTurn(game, player),
                m.isExpected(game, new EndTurn({player: player})),
                // TODO: disable when the player can win the game
            ]);
            this.canEndTurn = this.messages.length === 0;
        },
        endTurn() {
            this.$emit("endTurn");
        }
    },
    mounted() {
        this.updateCanEndTurn();
        this.removeActionAddedHandler = this.game.actions.added((action) => {
            this.updateCanEndTurn();
        })
    },
    unmount() {
        this.removeActionAddedHandler();
    }

}
</script>

<style scoped>
.root {
    height:60px; /* todo: fix. 72 + half */
    align-self: end;
}
#buy-development-card {
    display: grid;
    grid-template-columns: 24px 24px;
    grid-template-rows: 24px 24px 24px;
}
#button {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 3;
    width: 48px;
    height: 48px;
}
#trade1 {
    grid-column-start: 1;
    grid-row-start: 2;
}
#trade2 {
    grid-column-start: 2;
    grid-row-start: 2;
}
#trade3 {
    grid-column-start: 1;
    grid-row-start: 1;
}
</style>