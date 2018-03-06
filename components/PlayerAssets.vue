<template>
    <div id="player-assets">
        <monopoly-dialog 
            v-if="showMonopolyDialog" 
            v-on:close="closeMonopolyDialog">
        </monopoly-dialog>
        <div v-if="update"></div>
        <year-of-plenty-dialog 
            v-if="showYearOfPlentyDialog" 
            v-on:close="closeYearOfPlentyDialog">
        </year-of-plenty-dialog>
        <loose-resources-dialog
            v-if="showLooseResourcesDialog"
            v-bind:game="game"
            v-on:looseResources="looseResources"
            v-bind:selectedResources="selectedResources">
        </loose-resources-dialog>
        <div id="resources">
            <div 
                id="resourceType" 
                v-if="player.resources.hasOf(resourceType)"
                v-for="resourceType in player.resources.types"
                :key="resourceType">
                <img 
                    v-for="resource in player.resources.of(resourceType)"  
                    :src="`doc/images/${resource.name}Card.png`"
                    :key="resource.id"
                    @click="toggleResource(resource)"
                    v-bind:class="{ selected: selectedResources.includes(resource)}" />
            </div>
        </div>
        <div id="developmentCards">
            <img v-for="developmentCard in player.developmentCards" 
                :src="`doc/images/${developmentCard.name}.png`"
                @dblclick="playDevelopmentCard(developmentCard)" />
        </div>
        <div id="victoryPoints"></div>
        <div id="ports"></div>
    </div>
</template>

<script>
    import MonopolyDialog from './MonopolyDialog.vue';
    import YearOfPlentyDialog from './YearOfPlentyDialog.vue';
    import LooseResourcesDialog from "./LooseResourcesDialog.vue";

    import { Monopoly } from '../src/developmentCard.js';
    import { PlayDevelopmentCard } from "../src/actions/playDevelopmentCard.js";
    import { LooseResources } from "../src/actions/looseResources";
    import { ResourceList } from '../src/resource';

    export default {
        name: 'player-assets',
        components: {MonopolyDialog, YearOfPlentyDialog, LooseResourcesDialog },
        props: {
            player: {
                type: Object
            },
            host: {
                type: Object
            },
            update: {
                type: Boolean
            },
            game: {
                type: Object
            },
            showLooseResourcesDialog: {
                type: Boolean
            },
        },
        data() {
            return {
                showMonopolyDialog: false,
                showYearOfPlentyDialog: false,
                developmentCard: null,
                selectedResources: [],
                selectResources: false,
            }
        },
        methods: {
            action(action) {
                this.$emit('action', action);
            },
            playDevelopmentCard(developmentCard) {
                this.$data.developmentCard = developmentCard;
                // instanceof don't work here
                const typeName = developmentCard.constructor.name;
                if (typeName === "Monopoly") {
                    this.$data.showMonopolyDialog = true;
                } else if (typeName === "YearOfPlenty") {
                    this.$data.showYearOfPlentyDialog = true;
                } else if (typeName === "RoadBuilding") {
                    const rb = this.$data.developmentCard;
                    const player = this.$props.player;
                    rb.player = player;
                    const playRoadBuilding = PlayDevelopmentCard.createData(player, rb);
                    this.$emit('action', playRoadBuilding)
                } else if (typeName === "VictoryPoint") {
                    const vp = this.$data.developmentCard;
                    const player = this.$props.player;
                    vp.player = player;
                    const playVp = PlayDevelopmentCard.createData(player, vp);
                    this.$emit('action', playVp)
                } else if (typeName === "Soldier") {
                    const soldier = this.developmentCard;
                    soldier.player = this.player;
                    const playSoldier = PlayDevelopmentCard.createData(this.player, soldier);
                    playSoldier.player = this.player;
                    this.$emit('action', playSoldier);
                }
            },
            closeMonopolyDialog(resourceType) {
                this.$data.showMonopolyDialog = false;
                if (resourceType === null) {
                    return;
                }
                const player = this.$props.player;
                const monopoly = this.$data.developmentCard;
                monopoly.resourceType = resourceType;
                monopoly.player = player;
                const playMonopoly = PlayDevelopmentCard.createData(player, monopoly);
                this.$emit('action', playMonopoly)
            },
            closeYearOfPlentyDialog(resourceTypes) {
                this.$data.showYearOfPlentyDialog = false;
                const yop = this.$data.developmentCard;
                yop.resourceType1 = resourceTypes[0];
                yop.resourceType2 = resourceTypes[1];
                const player = this.$props.player;
                yop.player = player;
                const playYop = PlayDevelopmentCard.createData(player, yop);
                this.$emit('action', playYop)
            },
            toggleResource(resource) {
                if (this.selectedResources.includes(resource)) {
                    this.selectedResources.remove(resource);
                } else {
                    this.selectedResources.push(resource);
                }
            },
            looseResources() {
                const resourceList = new ResourceList(this.selectedResources);
                const looseResources = LooseResources.createData(this.player, resourceList);
                this.selectedResources.length = 0;
                this.$emit('looseResources', looseResources)
            }
        }
    }
</script>

<style scoped>
#player-assets {
    display: inline-flex;
    background-color: black;
    padding-left: 67px;
}
#resourceType {
    padding-left: 100px;
    display: inline-flex;
}
#resourceType img {
    margin-left: -96px;
    height: 101px;
    width: 63px;
}
#resourceType img:hover {
    transform: translate(0, -0.5em);
}
.selected, .selected:hover {
    transform: translate(0, -2em) !important;
}
#developmentCards {
    /* margin-left: 37px; */
    right: 0;
    margin: 0;
    padding: 0;
    height: 101px;
    position: absolute;
}
    #developmentCards img {
        /* margin-left: -90px; */
        height: 101px;
        width: 63px;
    }
    #developmentCards img:hover {
        transform: translate(0, -1em);
    }
</style>