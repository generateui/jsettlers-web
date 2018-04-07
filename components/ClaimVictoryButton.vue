<!-- TODO: it would be nice to put some simple CSS effect on the image to indicate 
that the player is able to win the game. Also, it would be cool if there was
a distinctive victory music starting with low volume slowly increasing to max 
volume -->
<template>
    <popper trigger="hover" :options="{placement: 'top'}" class="root">
        <ul class="popper popup">
            <div class="popup-hero">
                <img class="popup-logo" src="doc/images/ClaimVictory48.png" />
                <span class="popup-title">Claim victory</span>
                <span class="victory-points-amount">{{game.victoryPointsToWin}}</span>
                <span>points to claim victory</span>
            </div>
            <ul>
                <li v-for="message in messages" :key="message">{{message}}</li>
            </ul>
        </ul>

        <div id="claim-victory" @click="claimVictory()" class="build-button" slot="reference" v-bind:class="{ disabled: !canClaimVictory }">
            <img id="button-image" class="claim-victory-image" src="doc/images/ClaimVictory48.png" />
        </div>
    </popper>
</template>

<script>
import * as m from "../src/matcher";
import Popper from 'vue-popperjs';
import { ClaimVictory } from '../src/actions/claimVictory';

export default {
    name: 'claim-victory-button',
    components: { Popper },
    props: {
        game: {
            type: Object
        }
    },
    data() {
        return {
            messages: [],
            canClaimVictory: false,
        }
    },
    methods: {
        updateCanClaimVictory() {
            const game = this.game;
            const player = this.game.player;
            this.messages = m.match([
                m.isOnTurn(game, player),
                m.isExpected(game, new ClaimVictory({player: player})),
                m.hasEnoughVictoryPoints(game, player),
            ]);
            this.canClaimVictory = this.messages.length === 0;
        },
        claimVictory() {
            if (this.canClaimVictory) {
                this.$emit("claimVictory");
            }
        }
    },
    mounted() {
        this.updateCanClaimVictory();
        this.removeActionAddedHandler = this.game.actions.added((action) => {
            this.updateCanClaimVictory();
        });
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
#button-image {
    width: 48px;
    height: 48px;
    filter: invert(100%);
}
.victory-points-amount {
    font-weight: bold;
    font-size: 150%;
}
</style>