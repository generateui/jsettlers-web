<template>
    <popper trigger="hover" :options="{placement: 'top'}" class="root">
        <ul class="popper popup">
            <div class="popup-hero">
                <img class="popup-logo" src="doc/images/City48.png" />
                <span class="popup-title">Build a city</span>
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

        <div id="build-city" class="build-button" slot="reference" v-bind:class="{ disabled: !canBuildCity }">
            <img id="button" src="doc/images/City48.png" />
            <img id="trade1" class="trade" src="doc/images/Trade48.png"
                v-if="!canPayCityDirectly && amountGoldNeeded >= 1 && amountGold >= 1" />
            <img id="trade2" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayCityDirectly && amountGoldNeeded >= 2 && amountGold >= 2" />
            <img id="trade3" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayCityDirectly && amountGoldNeeded >= 3 && amountGold >= 3" />
            <img id="trade4" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayCityDirectly && amountGoldNeeded >= 4 && amountGold >= 4" />
            <img id="trade5" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayCityDirectly && amountGoldNeeded >= 4 && amountGold >= 5" />
        </div>
    </popper>
</template>

<script>
import * as m from "../src/matcher";
import Popper from 'vue-popperjs';
import { BuildCity } from '../src/actions/buildCity';
import { City } from '../src/city';
import { ResourceList } from '../src/resource';

export default {
    name: 'build-city-button',
    components: { Popper },
    props: {
        game: {
            type: Object
        }
    },
    data() {
        return {
            messages: [],
            canBuildCity: false,
            canPayCityDirectly: false,
            amountGoldNeeded: 0,
            amountGold: 0,
            stockCities: game.player.stock.cities,
            cost: City.cost,
        }
    },
    methods: {
        updateGold() {
            const resources = this.game.player.resources;
            this.canPayCityDirectly = resources.hasAtLeast(City.cost);
            this.amountGoldNeeded = resources.amountGoldNeeded(City.cost);
            const resourcesWithoutCost = new ResourceList(resources);
            resourcesWithoutCost.remove(City.cost);
            this.amountGold = this.game.player.ports.amountGold(resourcesWithoutCost);
        },
        updateCanBuildCity() {
            const game = this.game;
            const player = this.game.player;
            this.messages = m.match([
                m.hasCityInStock(player.stock),
                m.isOnTurn(game, player),
                m.isExpected(game, new BuildCity({player: player})),
                m.canPlaceCityOnBoard(player),
            ]);
            this.canBuildCity = this.messages.length === 0;
        }
    },
    mounted() {
        this.updateCanBuildCity();
        this.updateGold();
        this.removeActionAddedHandler = this.game.actions.added((action) => {
            this.updateGold();
            this.updateCanBuildCity();
        })
    },
    unmount() {
        this.removeActionAddedHandler();
    }

}
</script>

<style scoped>
li {
    text-align: left;
    list-style: none;
}
.root {
    height: 134px; /* todo: fix. 72 + half */
    align-self: end;
}
#build-city {
    display: grid;
    grid-template-columns: 24px 24px;
    grid-template-rows: 24px 24px 24px 48px;
}
#button {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 4;
    width: 48px;
    height: 48px;
}
#trade1 {
    grid-column-start: 1;
    grid-row-start: 3;
}
#trade2 {
    grid-column-start: 2;
    grid-row-start: 3;
}
#trade3 {
    grid-column-start: 1;
    grid-row-start: 2;
}
#trade4 {
    grid-column-start: 2;
    grid-row-start: 2;
}
#trade5 {
    grid-column-start: 1;
    grid-row-start: 1;
}
</style>