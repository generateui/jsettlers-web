<template>
    <popper trigger="hover" :options="{placement: 'top'}" class="root">
        <ul class="popper popup">
            <div class="popup-hero">
                <img class="popup-logo" src="doc/images/DevelopmentCard48.png" />
                <span class="popup-title">Buy a development card</span>
                <div class="popup-cost">
                    <div v-for="resourceType in cost.types" :key="resourceType">
                        <img class="popup-resource" v-for="resource in cost.of(resourceType)" :key="resource.id"
                            :src="`doc/images/${resource.name}Card.png`" />
                    </div>
                </div>
            </div>
            <ul>
                <li v-for="message in messages" :key="message">{{message}}</li>
            </ul>
        </ul>

        <div id="buy-development-card" class="build-button" slot="reference" v-bind:class="{ disabled: !canBuyDevelopmentCard }">
            <img id="button" src="doc/images/DevelopmentCard48.png" />
            <img id="trade1" class="trade" src="doc/images/Trade48.png"
                v-if="!canPayDevelopmentCardDirectly && amountGoldNeeded >= 1 && amountGold >= 1" />
            <img id="trade2" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayDevelopmentCardDirectly && amountGoldNeeded >= 2 && amountGold >= 2" />
            <img id="trade3" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayDevelopmentCardDirectly && amountGoldNeeded >= 3 && amountGold >= 3" />
        </div>
    </popper>
</template>

<script>
import * as m from "../src/matcher";
import Popper from 'vue-popperjs';
import { BuyDevelopmentCard } from '../src/actions/buyDevelopmentCard';
import { DevelopmentCard } from '../src/developmentCard';
import { ResourceList } from '../src/resource';

export default {
    name: 'build-development-card-button',
    components: { Popper },
    props: {
        game: {
            type: Object
        }
    },
    data() {
        return {
            messages: [],
            canBuyDevelopmentCard: false,
            canPayDevelopmentCardDirectly: false,
            amountGoldNeeded: 0,
            amountGold: 0,
            cost: DevelopmentCard.cost,
        }
    },
    methods: {
        updateGold() {
            const resources = this.game.player.resources;
            this.canPayDevelopmentCardDirectly = resources.hasAtLeast(DevelopmentCard.cost);
            this.amountGoldNeeded = resources.amountGoldNeeded(DevelopmentCard.cost);
            const resourcesWithoutCost = new ResourceList(resources);
            resourcesWithoutCost.remove(DevelopmentCard.cost);
            this.amountGold = this.game.player.ports.amountGold(resourcesWithoutCost);
        },
        updateCanBuildDevelopmentCard() {
            const game = this.game;
            const player = this.game.player;
            this.messages = m.match([
                m.isOnTurn(game, player),
                m.isExpected(game, new BuyDevelopmentCard({player: player})),
            ]);
            this.canBuyDevelopmentCard = this.messages.length === 0;
        }
    },
    mounted() {
        this.updateCanBuildDevelopmentCard();
        this.updateGold();
        this.removeActionAddedHandler = this.game.actions.added((action) => {
            this.updateGold();
            this.updateCanBuildDevelopmentCard();
        })
    },
    unmount() {
        this.removeActionAddedHandler();
    }

}
</script>

<style scoped>
.root {
    height: 108px; /* todo: fix. 72 + half */
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