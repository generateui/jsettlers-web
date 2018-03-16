<template>
    <div id="wrapper" >
        <div id="background-wrapper" v-bind:style="{ borderColor: player.color.css, backgroundColor: player.color.toCssRgba(0.25) }">
            <div id="player-name">{{player.user.name}}</div>
            <div id="towns" class="stock-info" :data-tooltip="`${player.stock.towns} towns in stock`">
                <img src="doc/images/Town48.png" />
                <span>{{player.stock.towns}}</span>
            </div>
            <div id="cities" class="stock-info" :data-tooltip="`${player.stock.cities} cities in stock`">
                <img src="doc/images/City48.png" />
                <span>{{player.stock.cities}}</span>
            </div>
            <div id="roads" class="stock-info" :data-tooltip="`${player.stock.roads} roads in stock`">
                <img src="doc/images/Road48.png" />
                <span>{{player.stock.roads}}</span>
            </div>
            <div id="soldiers" class="stock-info" :data-tooltip="`${player.soldiers.length} soldiers played`">
                <img src="doc/images/LargestArmy48.png" />
                <span v-bind:class="{ 'is-winner': game.largestArmy.player === player}">{{player.soldiers.length}}</span>
            </div>
            <div id="route-length" class="stock-info" :data-tooltip="`${player.routeLength} road length`">
                <img src="doc/images/LongestRoad48.png" />
                <span v-bind:class="{ 'is-winner': game.longestRoad.player === player}">{{player.routeLength}}</span>
            </div>
            <div id="developmentCards" class="stock-info" :data-tooltip="`${player.developmentCards.length} development cards`">
                <img src="doc/images/DevelopmentCard48.png" />
                <span >{{player.developmentCards.length}}</span>
            </div>
            <div id="ports" class="stock-info">
                <popper trigger="hover" :options="{placement: 'right'}">
                    <div class="popper ports">
                        <div v-for="port in player.ports.items">
                            <img :src="`doc/images/${getPortName(port)}PortIcon48.png`" class="port" />
                        </div>
                    </div>
                    <div slot="reference">
                        <img src="doc/images/Port48.png" class="image"/>
                        <span>{{player.ports.items.length}}</span>
                    </div>
                </popper>
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
            <div class="hand-cards">
                <!-- TODO: diff opponent & playing player -->
                <!-- <div > -->
                    <span class="hand-cards-amount">{{player.resources.length}}</span>
                    <div class="hand-card-wrapper" v-for="n in player.resources.length">
                        <img src="doc/images/BlankResourceCard48.png" />
                    </div>
                <!-- </div> -->
            </div>
        </div>
        <div id="popup" class="popper" v-bind:ref="'popup-' + player.id" v-show="actions.length > 0 || offerTrades.length > 0">
                <div id="actions" v-for="action in actions">
                    <div class="roll-dice-production" v-if="action instanceof RollDice">
                        <div id="roll-dice-view" v-if="action.player === player">
                            <!-- TODO: show actual dice numbers -->
                            <img src="doc/images/RollDice48.png" />
                        </div>
                        <resource-list-view 
                            v-if="action.productionByPlayer.has(player)"
                            :resources="action.productionByPlayer.get(player)"
                            :size="48">
                        </resource-list-view>
                    </div>

                    <div id="build-town-view" v-if="action instanceof BuildTown">
                        <img src="doc/images/Town48.png" />
                    </div>

                    <div id="build-road-view" v-if="action instanceof BuildRoad">
                        <img src="doc/images/Road48.png" />
                    </div>

                    <div id="build-city-view" v-if="action instanceof BuildCity">
                        <img src="doc/images/City48.png" />
                    </div>

                    <div id="buy-development-card-view-view" v-if="action instanceof BuyDevelopmentCard">
                        <img src="doc/images/BuyDevelopmentCard48.png" />
                    </div>

                    <div class="play-development-card-view" v-if="action instanceof PlayDevelopmentCard">
                        <img src="doc/images/PlayDevelopmentCard48.png" />
                        <div class="development-card-view" v-if="action.developmentCard instanceof Soldier">
                            <img class="development-card-logo" src="doc/images/SoldierLogo48.png" />
                        </div>
                        <div class="development-card-view"  v-if="action.developmentCard instanceof YearOfPlenty">
                            <img class="development-card-logo" src="doc/images/YearOfPlentyLogo48.png" />
                            <resource-list-view
                                :resources="action.developmentCard.resources"
                                :size="48">
                            </resource-list-view>
                        </div>
                        <div class="development-card-view" 
                            v-if="action.developmentCard instanceof Monopoly">
                            <img class="development-card-logo" src="doc/images/MonopolyLogo48.png" />
                            <resource-list-view
                                :resources="action.developmentCard.stolen"
                                :size="48">
                            </resource-list-view>
                        </div>
                        <div class="development-card-view"  v-if="action.developmentCard instanceof RoadBuilding">
                            <img class="development-card-logo" src="doc/images/RoadBuildingLogo48.png" />
                        </div>
                        <div class="development-card-view"  v-if="action.developmentCard instanceof VictoryPoint">
                            <img class="development-card-logo" src="doc/images/VictoryPointLogo48.png" />
                        </div>
                    </div>

                    <div id="move-robber-view" v-if="action instanceof MoveRobber">
                        <img src="doc/images/MoveRobber48.png" />
                    </div>

                    <div id="rob-player-view" v-if="action instanceof RobPlayer">
                        <img src="doc/images/RobPlayer48.png" />
                    </div>

                    <div class="offer-trade-view"
                        v-if="action instanceof OfferTrade">
                        <img src="doc/images/OfferTrade48.png" />
                        <span>offers</span>
                        <resource-list-view
                            :resources="action.wantedResourceList"
                            :size="48">
                        </resource-list-view>
                        <span>for</span>
                        <resource-list-view
                            :resources="action.offeredResourceList"
                            :size="48">
                        </resource-list-view>
                    </div>

                    <div id="accept-offer-view" v-if="action instanceof AcceptOffer">
                        <img src="doc/images/AcceptOffer48.png" />
                    </div>

                    <div id="reject-offer-view" v-if="action instanceof RejectOffer">
                        <img src="doc/images/RejectOffer48.png" />
                    </div>

                    <div class="counter-offer-view" v-if="action instanceof CounterOffer">
                        <img src="doc/images/CounterOffer48.png" />
                        <span>counters</span>
                        <resource-list-view
                            :resources="action.wantedResourceList"
                            :size="48">
                        </resource-list-view>
                        <span>for</span>
                        <resource-list-view
                            :resources="action.offeredResourceList"
                            :size="48">
                        </resource-list-view>
                    </div>

                    <div class="trade-bank-view" v-if="action instanceof TradeBank">
                        <img src="doc/images/TradeBank48.png" />
                        <span>got</span>
                        <resource-list-view :resources="action.wanted" :size="48"></resource-list-view>
                        <span>for</span>
                        <resource-list-view :resources="action.offered" :size="48"></resource-list-view>
                    </div>

                    <!-- your trade -->
                    <div class="trade-player-view-you" v-if="action instanceof TradePlayer && action.player === player">
                        <img src="doc/images/TradePlayer48.png" />
                        <span>got</span>
                        <resource-list-view
                            :resources="action.wantedResourceList"
                            :size="48">
                        </resource-list-view>
                        <span>for</span>
                        <resource-list-view
                            :resources="action.offeredResourceList"
                            :size="48">
                        </resource-list-view>
                    </div>
                    <!-- your opponent you trade with -->
                    <div class="trade-player-view-opponent" v-if="action instanceof TradePlayer && action.opponent === player">
                        <img src="doc/images/TradePlayer48.png" />
                        <span>got</span>
                        <!-- so, show offered & wanted the other way around -->
                        <resource-list-view
                            :resources="action.offeredResourceList"
                            :size="48">
                        </resource-list-view>
                        <span>for</span>
                        <resource-list-view
                            :resources="action.wantedResourceList"
                            :size="48">
                        </resource-list-view>
                    </div>

                    <div class="loose-resources-view" v-if="action instanceof LooseResources">
                        <img src="doc/images/LooseResources48.png" />
                        <resource-list-view 
                            :resources="action.resources"
                            :size="48">
                        </resource-list-view>
                    </div>
                </div>

        </div>
        <div v-if="player === game.playerOnTurn" class="is-on-turn-indicator indicator">
            <span class="indicator-arrow">🡐</span>
            <!-- <span class="indicator-text">its your turn</span> -->
        </div>
    </div>
</template>

<script>
var proto = require("../data_pb");
import Popper from 'vue-popperjs';
import ResourceListView from './ResourceListView.vue';
import PopperJs from "../node_modules/popper.js/dist/esm/popper.js";

import { Util } from '../src/util';
import { RollDice } from '../src/actions/rollDice';
import { TradePlayer } from '../src/actions/tradePlayer';
import { ResourceList } from '../src/resource';
import { AcceptOffer } from '../src/actions/acceptOffer';
import { OfferTrade } from '../src/actions/offerTrade';

const timer = ms => new Promise(result => setTimeout(result, ms));

export default {
    name: 'player-info',
    components: {Popper, ResourceListView},
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
            offerTrades: [],
        }
    },
    methods: {
        getPortName(port) {
            return Util.getEnumName(proto.PortType, port.type).toLowerCase();
        },
        showAction: async function(action) {
            // show resources gained for all player who gain
            const isRollDiceWithResources = action instanceof RollDice && action.productionByPlayer.has(this.player);
            // show tradeplayer for both players
            // const isTradePlayer = action instanceof OfferTrade && action.opponent === this.player;
            const mustRespond = action instanceof OfferTrade && 
                action.player !== game.player &&
                action.player !== this.player;

            // show all actions of this player
            const isMine = action.player === this.player;
            // if (isRollDiceWithResources || isTradePlayer || isMine) {
            if (isRollDiceWithResources || isMine) {
                this.actions.push(action);
                await timer(4000);
                this.actions.remove(action);
            }
        },

    },
    mounted() {
        var el = this.$el;
        var popupEl = this.$refs["popup-" + this.player.id]
        var x = new PopperJs(el, popupEl, { placement: 'right'});
        x.update();
    }
}
</script>

<style scoped>

#popup {
    color: white;
    background-color: black;
    display: inline-flex;
}
h3 {
    color: white;
}
.roll-dice-production, 
.loose-resources-view, 
.trade-player-view,
.play-development-card-view,
.trade-bank-view,
.development-card-view,
.trade-player-view-opponent,
.trade-player-view-you,
.offer-trade-view,
/* .response-offer-trade-view, */
.counter-offer-view {
    display: flex;
    align-items: center;
    justify-content: center;
}
.development-card-logo {
    filter: drop-shadow(0px 0px 2px #fff);
}
.stock-info > img {
    height: 24px;
}
.image {
    height: 24px;
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
.ports {
    display: inline-flex;
    background-color: black;
    padding: 0.5em;
}
.port {
    padding: 0.5em;
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
    height: 6.5em;
    padding: 0;
    background-color: white;
}
#background-wrapper {
    height: 100%;
    width: 100%;
    border-top: 4px solid;
    border-bottom: 4px solid;
    border-right: 4px solid;
    border-left: 4px solid;
    padding: 4px;
    display: grid;
    grid-template-columns: 14em 4em 4em 4em;
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
.hand-cards {
    grid-column-start: 1;
    grid-row-start: 2;
    grid-row-end: 4;
    display: flex;
    margin-right: 3.5em;
    align-items: center;
}
.hand-card-wrapper {
    flex: 1 1 0;
    min-width: 0;
}
.hand-cards-amount {
    font-weight: bolder;
    font-size: 150%;
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
.is-on-turn-indicator {
    position: relative;
    color: white;
}

/** To make indicator relative, there must be an element before it which is absolute */
.indicator:before {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
}
.indicator {
    position: relative;
    /* move it to the top right of PlayerInfo root element */
    left: 100%;
    top: -100%;
    pointer-events: none;
}
.indicator-arrow {
    font-size: 91px;
    height: 91px;
    line-height: 91px;
    -webkit-text-stroke: 2px black;
    font-weight: 900;
}
.indicator-text {
    font-size: 24px;
    height: 91px;
    line-height: 91px;
}

</style>