<template>
    <popper trigger="hover" :options="{placement: 'top'}" class="root">
        <ul class="popper popup">
            <div class="popup-hero">
                <img class="popup-logo" src="doc/images/TradePlayer48.png" />
                <span class="popup-title">Offer a trade</span>
            </div>
            <span>Negotaiate and trade resources with your opponents</span>
            <ul>
                <li v-for="message in messages" :key="message">{{message}}</li>
            </ul>
        </ul>

        <div 
            id="trade-player"
            @click="tradeOffer()"
            class="build-button"
            slot="reference"
            v-bind:class="{ disabled: !canOffer }">
            <img id="button" src="doc/images/TradePlayer48.png" />
        </div>
    </popper>
</template>

<script>
import * as m from "../src/matcher";
import Popper from 'vue-popperjs';
import { OfferTrade } from '../src/actions/offerTrade';

export default {
    name: 'offer-trade-button',
    components: { Popper },
    props: {
        game: {
            type: Object
        }
    },
    data() {
        return {
            messages: [],
            canOffer: false,
        }
    },
    methods: {
        updateCanOffer() {
            const game = this.game;
            const player = this.game.player;
            this.messages = m.match([
                m.isOnTurn(game, player),
                m.isExpected(game, new OfferTrade({ player: player })),
            ]);
            this.canOffer = this.messages.length === 0;
        },
        tradeOffer() {
            if (this.canOffer) {
                this.$emit("offerTrade");
            }
        }
    },
    mounted() {
        this.updateCanOffer();
        this.removeActionAddedHandler = this.game.actions.added((action) => {
            this.updateCanOffer();
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