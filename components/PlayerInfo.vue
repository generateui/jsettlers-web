<template>
    <div id="wrapper" >
        <div id="background-wrapper" v-bind:style="{ borderColor: player.color.css, backgroundColor: player.color.toCssRgba(0.25) }">
            <div id="player-name">{{player.user.name}}</div>
            <div id="towns" class="stock-info">
                <img src="doc/images/Town48.png" />
                <span>{{player.stock.towns}}</span>
            </div>
            <div id="cities" class="stock-info">
                <img src="doc/images/City48.png" />
                <span>{{player.stock.cities}}</span>
            </div>
            <div id="roads" class="stock-info">
                <img src="doc/images/Road48.png" />
                <span>{{player.stock.roads}}</span>
            </div>
            <div id="soldiers" class="stock-info">
                <img src="doc/images/LargestArmy48.png" />
                <span v-bind:class="{ 'is-winner': game.largestArmy.player === player}">{{player.soldiers.length}}</span>
            </div>
            <div id="route-length" class="stock-info">
                <img src="doc/images/LongestRoad48.png" />
                <span v-bind:class="{ 'is-winner': game.longestRoad.player === player}">{{player.routeLength}}</span>
            </div>
            <div id="developmentCards" class="stock-info">
                <img src="doc/images/DevelopmentCard48.png" />
                <span >{{player.developmentCards.length}}</span>
            </div>
            <div id="ports" class="stock-info">
                <img src="doc/images/Port48.png" />
                <span>{{player.ports.items.length}}</span>
            </div>
            <div id="victoryPoints" class="stock-info">
                <popper trigger="hover" :options="{placement: 'right'}">
                    <div class="popper vps">
                        <div v-for="vp in player.victoryPoints" class="vp">
                            <img  :src="`doc/images/${vp.name}48.png`" class="vp-image" />
                            <span v-if="vp.victoryPoints > 1" class="vp-count">{{vp.victoryPoints}}</span>
                        </div>
                    </div>
                    <div slot="reference">
                        <img src="doc/images/VictoryPoint48.png" class="image" />
                        <span>{{player.victoryPoints.length > 0 ? player.victoryPoints.reduce((vp1, vp2) => vp1.victoryPoints + vp2.victoryPoints) : 0 }}</span>
                    </div>
                </popper>
            </div>
            <div id="resources">
                <!-- TODO: diff opponent & playing player -->
                <!-- <div > -->
                    <img v-for="n in player.resources.length" src="doc/images/BlankResourceCard48.png" />
                <!-- </div> -->
            </div>
        </div>
        <div id="popup" class="popper" v-bind:ref="'popup-' + player.id" v-show="actions.length > 0">
            <div id="actions" v-for="action in actions">
                <div id="resources" v-if="action.constructor.name === 'RollDice' && action.productionByPlayer.has(player)">
                    <div id="resourceType" 
                        v-if="action.productionByPlayer.get(player).hasOf(resourceType)"
                        v-for="resourceType in action.productionByPlayer.get(player).types">
                        <img v-for="resource in action.productionByPlayer.get(player).of(resourceType)" :src="`doc/images/${resource.name}Card.png`" />
                    </div>
                </div>
                <div id="resources" v-if="action instanceof BuildTown && action.player === player">
                    <img src="doc/images/Town48.png" />
                </div>
                <div id="resources" v-if="action.constructor.name === 'BuildRoad' && action.player === player">
                    <img src="doc/images/Road48.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs';
    import PopperJs from "../node_modules/popper.js/dist/esm/popper.js";
    import { RollDice } from '../src/actions/rollDice';

    const timer = ms => new Promise(result => setTimeout(result, ms));
    
    export default {
        name: 'player-info',
        components: {Popper},
        props: {
            player: {
                type: Object
            },
            game: {
                type: Object
            }
        },
        data() {
            return {
                showResourcesGained: false,
                showPopup: false,
                actions: [],
            }
        },
        methods: {
            showAction: async function(action) {
                this.actions.push(action);
                await timer(4000);
                this.actions.remove(action);
            },
        },
        mounted: function() {
            var el = this.$el;
            var popupEl = this.$refs["popup-" + this.player.id]
            var x = new PopperJs(el, popupEl, { placement: 'right'});
            x.update();
        }
    }
</script>

<style scoped>
#popup {
    /* float:right; */
    color: white;
    background-color: black;
    display: inline-flex;
}
h3 {
    color: white;
}
.stock-info > img {
    /* font-size: 10px; */
    /* width: 24px; */
    height: 24px;
}
.image {
    height: 24px;
    /* width: 24px; */
}
.vp-image {
    width: 48px;
    height: auto;
    grid-column-start: 1;
    grid-row-start: 1;
    filter: drop-shadow(0px 0px 12px #FFD700);
}
.vp-count {
    background: rgba(255,255,255,0.6);
    grid-column-start: 1;
    grid-row-start: 1;
    font-size: 14px;
    font-weight: 900;
    border-radius: 50%;
    margin-top: 16px;
    margin-left: 16px;
    height: 18px;
    width: 18px;
    z-index: 1000;
}
.vps {
    display: inline-flex;
    background-color: black;
    padding: 1em;
}
.vp {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
}
.stock-info span {
    vertical-align: super;
}

#wrapper {
    height: 100px;
    padding: 0;
    background-color: white;
}
#background-wrapper {
    height: 100%;
    width: 100%;
    border: 4px solid;
    padding: 4px;
    /* padding: 0.25em; */
    display: grid;
    grid-template-columns: auto 4em 4em 4em;
    grid-template-rows: 33% 33% 33%;
    box-sizing: border-box;
}
#player-name {
    font-size: 16px;
    font-weight: bold;
}
#towns {
    grid-column-start: 2;
    grid-row-start: 1;
}
#roads {
    grid-column-start: 2;
    grid-row-start: 2;
}
#cities {
    grid-column-start: 2;
    grid-row-start: 3;
}
#developmentCards {
    grid-column-start: 3;
    grid-row-start: 1;
}
#ports {
    grid-column-start: 3;
    grid-row-start: 2;
}
#resources {
    grid-column-start: 1;
    grid-row-start: 2;
    grid-row-end: 3;
    display: inline-flex;
    padding-left: 3em;
}
#resources :nth-child(4n)  {
    margin-right: 1em;
}
#resources img {
    margin-left: -2em;
    width: 3em;
    height: 4em;
}
#victoryPoints {
    grid-column-start: 3;
    grid-row-start: 3;
}
#soldiers {
    grid-column-start: 4;
    grid-row-start: 1;
}
#route-length {
    grid-column-start: 4;
    grid-row-start: 2;
}
.is-winner {
    font-weight: bold;
    font-size: 125%;
    color: darkred;
}
</style>