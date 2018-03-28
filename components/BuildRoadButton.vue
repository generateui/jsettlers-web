<template>
    <popper trigger="hover" :options="{placement: 'top'}" class="root">
        <div class="popper popup">
            <div class="popup-hero">
                <img class="popup-logo" src="doc/images/Road48.png" />
                <span class="popup-title">Build a road</span>
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
        </div>

        <div id="build-road" @click="buildRoad()" class="build-button" slot="reference" v-bind:class="{ disabled: !canBuildRoad }">
            <img id="button" src="doc/images/Road48.png" />
            <img id="trade1" class="trade" src="doc/images/Trade48.png"
                v-if="!canPayRoadDirectly && amountGoldNeeded >= 1 && amountGold >= 1 && game.player.roadBuildingTokens === 0" />
            <img id="trade2" class="trade" src="doc/images/Trade48.png" 
                v-if="!canPayRoadDirectly && amountGoldNeeded >= 2 && amountGold >= 2 && game.player.roadBuildingTokens === 0" />
            <img id="token1" v-if="game.player.roadBuildingTokens > 0" class="trade" src="doc/images/RoadBuildingToken.png" />
            <img id="token2" v-if="game.player.roadBuildingTokens > 1" class="trade" src="doc/images/RoadBuildingToken.png" />
        </div>
    </popper>
</template>

<script>
import * as m from "../src/matcher";
import Popper from 'vue-popperjs';
import { ResourceListView } from './ResourceListView.vue';

import { BuildRoad } from '../src/actions/buildRoad';
import { Road } from '../src/road';
import { ResourceList } from '../src/resource';

export default {
    name: 'build-road-button',
    components: { Popper, ResourceListView },
    props: {
        game: {
            type: Object
        }
    },
    data() {
        return {
            messages: [],
            canBuildRoad: false,
            canPayRoadDirectly: false,
            amountGoldNeeded: 0,
            amountGold: 0,
            edgePieces: game.player.edgePieces,
            stockRoads: game.player.stock.roads,
            cost: Road.cost,
        }
    },
    methods: {
        updateGold() {
            const resources = this.game.player.resources;
            this.canPayRoadDirectly = resources.hasAtLeast(Road.cost);
            this.amountGoldNeeded = resources.amountGoldNeeded(Road.cost);
            const resourcesWithoutCost = new ResourceList(resources);
            resourcesWithoutCost.remove(Road.cost);
            this.amountGold = this.game.player.ports.amountGold(resourcesWithoutCost);
        },
        updateCanBuildRoad() {
            const game = this.game;
            const player = this.game.player;
            this.messages = m.match([
                m.hasRoadInStock(player.stock),
                m.isOnTurn(game, player),
                m.isExpected(game, new BuildRoad({player: player})),
                m.canPlaceRoadOnBoard(game, player),
                m.canPayPiece(player, Road.cost, game.phase),
            ]);
            this.canBuildRoad = this.messages.length === 0;
        },
        buildRoad() {
            if (this.canBuildRoad) {
                this.$emit("buildRoad");
            }
        }
    },
    mounted() {
        this.updateCanBuildRoad();
        this.updateGold();
        this.removeActionAddedHandler = this.game.actions.added((action) => {
            this.updateGold();
            this.updateCanBuildRoad();
        })
    },
    unmount() {
        this.removeActionAddedHandler();
    }

}
</script>

<style scoped>

.root {
    height: 148px; /* todo: fix. 72 + half */
    align-self: end;
}
#build-road {
    display: grid;
    grid-template-columns: 24px 24px;
    grid-template-rows: 24px 48px;
}
#button {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    width: 48px;
    height: 48px;
}
#trade1, #token1 {
    grid-column-start: 1;
    grid-row-start: 1;
}
#trade2, #token2 {
    grid-column-start: 2;
    grid-row-start: 1;
}

</style>