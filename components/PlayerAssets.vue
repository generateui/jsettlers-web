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
        <div id="all">
            <template 
                class="resource-type" 
                v-if="player.resources.hasOf(resourceType)"
                v-for="resourceType in player.resources.types">
                <div class="wrapper" v-for="resource in player.resources.of(resourceType)">
                    <img class="resource"
                        :src="`doc/images/${resource.name}Card.png`"
                        :key="resource.id"
                        @click="toggleResource(resource)"
                        v-bind:class="{ selected: selectedResources.includes(resource)}" />
                </div>
            </template>

            <popper v-for="dc in player.developmentCards" class="root"
                trigger="hover" 
                :options="{placement: 'top'}">
                <ul class="popper popup">
                    <div v-if="dc instanceof Soldier">
                        <div class="popup-hero">
                            <img class="popup-logo" src="doc/images/Soldier.png" />
                            <span class="popup-title">soldier</span>
                            <p class="popup-description">
                                Move the robber. Then, you may steal a resource from any of the players having a town or city on the hex of the new robber position.
                            </p>
                        </div>
                        <ul>
                            <li v-for="message in soldierMessages" :key="message">{{message}}</li>
                        </ul>
                    </div>

                    <div v-if="dc instanceof RoadBuilding">
                        <div class="popup-hero">
                            <img class="popup-logo" src="doc/images/RoadBuilding.png" />
                            <span class="popup-title">road building</span>
                            <p class="popup-description">
                                Build two roads for free
                            </p>
                        </div>
                        <ul>
                            <li v-for="message in otherMessages" :key="message">{{message}}</li>
                        </ul>
                    </div>

                    <div v-if="dc instanceof VictoryPoint">
                        <div class="popup-hero">
                            <img class="popup-logo" src="doc/images/VictoryPoint.png" />
                            <span class="popup-title">victory point</span>
                            <p class="popup-description">
                                Gain 1 victory point
                            </p>
                        </div>
                        <ul>
                            <li v-for="message in victoryPointMessages" :key="message">{{message}}</li>
                        </ul>
                    </div>
                    <div v-if="dc instanceof YearOfPlenty">
                        <div class="popup-hero">
                            <img class="popup-logo" src="doc/images/YearOfPlenty.png" />
                            <span class="popup-title">year of plenty</span>
                            <p class="popup-description">
                                Choose two resources for free
                            </p>
                        </div>
                        <ul>
                            <li v-for="message in otherMessages" :key="message">{{message}}</li>
                        </ul>
                    </div>
                    <div v-if="dc instanceof Monopoly">
                        <div class="popup-hero">
                            <img class="popup-logo" src="doc/images/Monopoly.png" />
                            <span class="popup-title">monopoly</span>
                            <p class="popup-description">
                                Pick a resource type. Opponents with resources of that type must give you all their resources of that type.
                            </p>
                        </div>
                        <ul>
                            <li v-for="message in otherMessages" :key="message">{{message}}</li>
                        </ul>
                    </div>
                </ul>
                <div slot="reference">
                    <img 
                        class="development-card" 
                        v-if="dc instanceof RoadBuilding || dc instanceof YearOfPlenty || dc instanceof Monopoly"
                        v-bind:class=" { disabled: !canPlayOther }"
                        :src="`doc/images/${dc.name}.png`"/>
                    <img 
                        class="development-card" 
                        v-if="dc instanceof VictoryPoint"
                        v-bind:class=" { disabled: !canPlayVp }"
                        :src="`doc/images/${dc.name}.png`"/>
                    <img 
                        class="development-card" 
                        v-if="dc instanceof Soldier"
                        v-bind:class=" { disabled: !canPlaySoldier }"
                        :src="`doc/images/${dc.name}.png`"/>
                </div>
            </popper>
        </div>
    </div>
</template>

<script>
    import MonopolyDialog from './MonopolyDialog.vue';
    import YearOfPlentyDialog from './YearOfPlentyDialog.vue';
    import LooseResourcesDialog from "./LooseResourcesDialog.vue";
    import Popper from 'vue-popperjs';

    import * as m from "../src/matcher";
    import { Monopoly, Soldier } from '../src/developmentCard.js';
    import { PlayDevelopmentCard } from "../src/actions/playDevelopmentCard.js";
    import { LooseResources } from "../src/actions/looseResources";
    import { ResourceList } from '../src/resource';

    export default {
        name: 'player-assets',
        components: {MonopolyDialog, YearOfPlentyDialog, LooseResourcesDialog, Popper },
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
                victoryPointMessages: [],
                soldierMessages: [],
                otherMessages: [],
                showMonopolyDialog: false,
                showYearOfPlentyDialog: false,
                developmentCard: null,
                selectedResources: [],
                selectResources: false,
                canPlayVp: false,
                canPlaySoldier: false,
                canPlayOther: false,
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
            },
            updateCanPlayVp() {
                const game = this.game;
                const player = this.game.player;
                this.victoryPointMessages = m.match([
                    m.isOnTurn(game, player),
                    m.isExpected(game, new PlayDevelopmentCard({player: player})),
                ]);
                this.canPlayVp = this.victoryPointMessages.length === 0;
            },
            updateCanPlaySoldier() {
                const game = this.game;
                const player = this.game.player;
                this.soldierMessages = m.match([
                    m.isOnTurn(game, player),
                    m.isExpected(game, new PlayDevelopmentCard({player: player, developmentCard: new Soldier()})),
                ]);
                this.canPlaySoldier = this.soldierMessages.length === 0;
            },
            updateCanPlayNonVp() {
                const game = this.game;
                const player = this.game.player;
                this.otherMessages = m.match([
                    m.notYetPlayedDevelopmentCard(game),
                    m.isOnTurn(game, player),
                    m.isExpected(game, new PlayDevelopmentCard({player: player})),
                ]);
                this.canPlayOther = this.otherMessages.length === 0;
            }
        },
        mounted() {
            this.updateCanPlayVp();
            this.updateCanPlaySoldier();
            this.updateCanPlayNonVp();
            this.removeActionAddedHandler = this.game.actions.added((action) => {
                this.updateCanPlayVp();
                this.updateCanPlaySoldier();
                this.updateCanPlayNonVp();
            });
        },
        unmount() {
            this.removeActionAddedHandler();
        }

    }
</script>

<style scoped>
.root {
    width: 50px;
    height: 100px;
}
#player-assets {
    background-color: black;
    padding-right: 0.5em;
    padding-left: 0.5em;
    padding-top: 0.5em;
}
#all {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
}
.wrapper:last-child {
    flex: 0 0 auto;
}
.wrapper {
    flex: 1 1 0;
    min-width: 0;
}
.resource, .development-card {
    height: 101px;
    width: 63px;
    min-width: 0;
}
.resource:hover {
    transform: translate(0, -0.5em);
}
.development-card:hover {
    transform: translate(0, -1em);
}
.selected, .selected:hover {
    transform: translate(0, -2em) !important;
}
</style>