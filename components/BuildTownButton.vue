<template>
    <popper trigger="hover" :options="{placement: 'top'}" class="root">
        <ul class="popper popup">
            <div class="popup-hero">
                <img class="popup-logo" src="doc/images/Town48.png" />
                <span class="popup-title">Build a town</span>
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

        <div id="build-town" class="build-button" slot="reference" v-bind:class="{ disabled: !canBuildTown }">
            <img id="button" src="doc/images/Town48.png" />
            <img id="trade1" class="trade" src="doc/images/Trade48.png"
                v-if="!canPayTownDirectly && amountGoldNeeded >= 1 && amountGold >= 1" />
            <img id="trade2" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayTownDirectly && amountGoldNeeded >= 2 && amountGold >= 2" />
            <img id="trade3" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayTownDirectly && amountGoldNeeded >= 3 && amountGold >= 3" />
            <img id="trade4" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayTownDirectly && amountGoldNeeded >= 4 && amountGold >= 4" />
        </div>
    </popper>
</template>

<script>
import * as m from "../src/matcher";
import Popper from 'vue-popperjs';
import { BuildTown } from '../src/actions/buildTown';
import { Town } from '../src/town';
import { ResourceList } from '../src/resource';

export default {
    name: 'build-town-button',
    components: { Popper },
    props: {
        game: {
            type: Object
        }
    },
    data() {
        return {
            messages: [],
            canBuildTown: false,
            canPayTownDirectly: false,
            amountGoldNeeded: 0,
            amountGold: 0,
            edgePieces: game.player.edgePieces,
            stockTowns: game.player.stock.towns,
            cost: Town.cost,
        }
    },
    methods: {
        updateGold() {
            const resources = this.game.player.resources;
            this.canPayTownDirectly = resources.hasAtLeast(Town.cost);
            this.amountGoldNeeded = resources.amountGoldNeeded(Town.cost);
            const resourcesWithoutCost = new ResourceList(resources);
            resourcesWithoutCost.remove(Town.cost);
            this.amountGold = this.game.player.ports.amountGold(resourcesWithoutCost);
        },
        updateCanBuildTown() {
            const game = this.game;
            const player = this.game.player;
            this.messages = m.match([
                m.hasTownInStock(player.stock),
                m.isOnTurn(game, player),
                m.isExpected(game, new BuildTown({player: player})),
                m.canPlaceTownOnBoard(game, player),
            ]);
            this.canBuildTown = this.messages.length === 0;
        }
    },
    mounted() {
        this.updateCanBuildTown();
        this.updateGold();
        this.removeActionAddedHandler = this.game.actions.added((action) => {
            this.updateGold();
            this.updateCanBuildTown();
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
    height: 108px; /* todo: fix. 72 + half */
    align-self: end;
}
#build-town {
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
#trade4 {
    grid-column-start: 2;
    grid-row-start: 1;
}
</style>