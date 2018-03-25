<template id="modal-template">
    <div class="modal-mask" v-show="show">
        <div class="modal-body">
            <div id="opponents-or-offers">
                <div id="opponents" v-show="mode === TRADEMODE.offer">
                    <div v-for="opponent in game.getOpponents(game.player)" 
                        class="opponent" 
                        v-bind:style="{ backgroundColor: opponent.color.toCssRgba(0.25) }"
                        :key="opponent.id">
                        <div v-bind:style="{ backgroundColor: opponent.color.css}" class="opponent-color"></div>
                        <span class="opponent-name">{{opponent.user.name}}</span>
                        <div v-if="tradeOffer !== null && tradeOffer.responses.has(opponent) && tradeOffer.responses.get(opponent) instanceof AcceptOffer"
                            class="accept button" 
                            @click="tradePlayer(tradeOffer.responses.get(opponent))">
                            <span class="accept-text">accepted</span>
                            <img class="accept-icon" src="doc/images/AcceptOffer48.png" />
                        </div>
                        <div class="reject"
                            v-if="tradeOffer !== null && tradeOffer.responses.has(opponent) && tradeOffer.responses.get(opponent) instanceof RejectOffer">
                            <span class="reject-text">rejected</span>
                            <img class="reject-icon" src="doc/images/RejectOffer48.png" />
                        </div>
                        <div class="counter button"
                            @click="tradePlayer(tradeOffer.responses.get(opponent))"
                            v-if="tradeOffer !== null && tradeOffer.responses.has(opponent) && tradeOffer.responses.get(opponent) instanceof CounterOffer">
                            <resource-list-view class="counter-offered"
                                :resources="tradeOffer.responses.get(opponent).wantedResourceList"
                                :size="32">
                            </resource-list-view>
                            <span class="counter-text">for</span>
                            <resource-list-view class="counter-wanted"
                                :resources="tradeOffer.responses.get(opponent).offeredResourceList"
                                :size="32">
                            </resource-list-view>
                            <img class="counter-icon" src="doc/images/CounterOffer48.png" />
                        </div>
                    </div>
                </div>

                <div id="trade-offers" v-show="mode === TRADEMODE.respond">
                    <div class="trade-offer" v-for="to in tradeOffers">
                        <div class="trade-offer-top">
                            <div class="trade-offer-resources">
                                <resource-list-view
                                    class="trade-offer-offered"
                                    :resources="to.offeredResourceList"
                                    :size="38">
                                </resource-list-view>
                                <span class="trade-offer-text">for</span>
                                <resource-list-view
                                    class="trade-offer-wanted"
                                    :resources="to.wantedResourceList"
                                    :size="38">
                                </resource-list-view>
                            </div>
                            <div class="trade-offer-response-buttons">
                                <div class="accept-offer-button button" @click="acceptOffer(to)">
                                    <span class="accept-logo">✔️</span>
                                </div>
                                <div class="counter-offer-button button" @click="rejectOffer(to)">
                                    <span class="reject-logo">❌</span>
                                </div>
                                <div class="reject-offer-button button" @click="prepareCounterOffer(to)">
                                    <span class="counter-logo">⇄?</span>
                                </div>
                            </div>
                            <span v-if="tradeOffer === to" class="trade-offer-selected">🡒</span>
                        </div>
                        <progress class="trade-offer-progress" value="90" max="100"></progress>
                    </div>
                </div>
            </div>
            <div id="wanted-resource-picker">
                <img v-for="rt in resourceTypes"
                    :class="{ 'disabled': tradeOffers.length > 0 && !counterOffering, 'cannot-trade': isOffered(rt)}"
                    class="resource"
                    :key="rt"
                    :src="`doc/images/${getName(rt).toPascalCase()}Card.png`"
                    @click="pickWantedResourceType(rt)" />
            </div>
            <div id="wanted-picked-resources">
                <img v-for="rt in wantedResourceTypes" 
                    :class="{ 'disabled': tradeOffers.length > 0 && !counterOffering}"
                    :key="rt"
                    class="resource"
                    :src="`doc/images/${getName(rt).toPascalCase()}Card.png`" 
                    @click="unpickWantedResourceType(rt)" />
            </div>
            <div id="offered-picked-resources">
                <img v-for="resource in offeredResources" 
                    :class="{ 'disabled': tradeOffers.length > 0 && !counterOffering}"
                    :key="resource.id"
                    class="resource"
                    :src="`doc/images/${resource.name}Card.png`" 
                    @click="unpickOfferedResource(resource)" />
            </div>
            <div id="offered-resource-picker">
                <template v-for="rt in playerResources.types">
                    <div class="resource-wrapper" v-for="resource in playerResources.of(rt)" :key="resource.id">
                        <img 
                            :class="{ 'disabled': tradeOffers.length > 0 && !counterOffering, 'cannot-trade': isOffered(rt)}"
                            class="resource"
                            :src="`doc/images/${resource.name}Card.png`"
                            @click="pickOfferedResource(resource)" />
                    </div>
                </template>
            </div>
            <div id="get-wrapper">
                <div id="get" class="get-give">GET</div>
            </div>
            <div id="spacer"></div>
            <div id="give-wrapper">
                <div id="give" class="get-give">GIVE</div>
            </div>
            <div id="button-wrapper">
                <button
                    id="button"
                    @click="offerTrade"
                    :disabled="wantedResourceTypes.length === 0 || tradeOffers.length > 0 && !counterOffering">
                    <span v-if="wantedResourceTypes.length === 0">Can't do...</span>
                    <span v-if="wantedResourceTypes.length > 0">Offer trade</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import ResourceListView from "./ResourceListView.vue";

var proto = require("../src/generated/data_pb");
import { Util } from "../src/util.js";
import { OfferTrade } from '../src/actions/offerTrade';
import { AcceptOffer } from '../src/actions/acceptOffer';
import { RejectOffer } from '../src/actions/rejectOffer';
import { CounterOffer } from '../src/actions/counterOffer';
import { TradePlayer } from '../src/actions/tradePlayer';
import { ResourceList } from '../src/resource';

const TRADEMODE = {
    // game.player is on turn and offers a trade
    offer: 0,
    // player on turn is an opponent, and game.player should respond
    respond: 1,
    // player on turn is an opponent, and game.player wants to make an offer
    offerInOpponentTurn: 2,
};
Vue.prototype.TRADEMODE = TRADEMODE;

export default {
    name: 'trade-player-dialog',
    components: { ResourceListView },
    props: {
        game: {
            type: Object
        },
        keyListener: {
            type: Object
        },
        isResponse: {
            type: Boolean
        },
        show: {
            type: Boolean
        }
    },
    data() {
        return {
            resourceTypes: [
                proto.ResourceType.WHEAT,
                proto.ResourceType.TIMBER,
                proto.ResourceType.ORE,
                proto.ResourceType.SHEEP,
                proto.ResourceType.BRICK,
            ],
            wantedResourceTypes: [],
            offeredResources: [],
            // make a copy, so we dont change the resources of the player
            playerResources: new ResourceList(game.player.resources), 
            tradeOffer: null,
            tradeOffers: [],
            counterOffering: false,
            mode: TRADEMODE.offer,
        }
    },
    methods: {
        getName: function(resourceType) {
            return Util.getEnumName(proto.ResourceType, resourceType);
        },
        pickWantedResourceType(resourceType) {
            this.wantedResourceTypes.push(resourceType);
        },
        unpickWantedResourceType(resourceType) {
            this.wantedResourceTypes.remove(resourceType);
        },
        pickOfferedResource(resource) {
            this.offeredResources.push(resource);
            this.playerResources.remove(resource);
        },
        unpickOfferedResource(resource) {
            this.offeredResources.remove(resource);
            this.playerResources.add(resource);
        },
        isOffered(resourceType) {
            for (var resource of this.offeredResources) {
                if (resource.type === resourceType) {
                    return true;
                }
            }
            return false;
        },
        offerTrade() {
            if (this.counterOffering) {
                this.tradeOffers.remove(this.tradeOffer);
                const offered = this.offeredResources.map(r => r.type);
                const counterOffer = CounterOffer.createData(this.game.player, this.tradeOffer, offered, this.wantedResourceTypes);
                this.$emit("action", counterOffer);
            } else {
                const offered = this.offeredResources.map(r => r.type);
                const offerTrade = OfferTrade.createData(this.game.player, offered, this.wantedResourceTypes);
                this.$emit("action", offerTrade);
            }
        },
        tradePlayer(acceptOffer) {
            const tradePlayer = TradePlayer.createData(this.game.player, this.tradeOffer, acceptOffer);
            this.$emit("action", tradePlayer);
        },
        prepareCounterOffer(offer) {
            this.tradeOffer = offer;
            this.counterOffering = true;
        },
        acceptOffer(offer) {
            this.tradeOffer = offer;
            this.counterOffering = false;
            this.tradeOffers.remove(offer);
            const acceptOffer = AcceptOffer.createData(game.player, offer);
            this.$emit("action", acceptOffer);
        },
        rejectOffer(offer) {
            this.tradeOffer = offer;
            this.counterOffering = false;
            this.tradeOffers.remove(offer);
            const rejectOffer = RejectOffer.createData(game.player, offer);
            this.$emit("action", rejectOffer);
        },
    },
    watch: { // Vue's api is a bit retarded here, so do a manual diff
        offeredResources:  function(newResource, oldResource) {
            // when the player offers a resource, ensure he cannot chose it from the "wanted" resources
            const toRemove = [];
            for (var resource of this.offeredResources) {
                for (var resourceType of this.wantedResourceTypes) {
                    if (resource.type === resourceType) {
                        toRemove.push(resourceType);
                    }
                }
            }
            for (var resourceType of toRemove) {
                this.wantedResourceTypes.remove(resourceType);
            }
        },
        show() {
            if (this.tradeOffers.length > 0) {
                this.mode = TRADEMODE.respond;
                return;
            }
            if (this.game.player === this.game.playerOnTurn) {
                this.mode = TRADEMODE.offer;
            } else {
                this.mode = TRADEMODE.offerInOpponentTurn;
            }
        }
    },
    mounted: function() {
        const that = this;
        this.removeActionAddedSubscription = this.game.actions.added((action) => {
            if (action instanceof OfferTrade && action.player === that.game.player) {
                that.tradeOffer = action;
            }
            if (action instanceof TradePlayer && 
                action.player === that.game.player &&
                that.tradeOffer !== null &&
                action.tradeOfferId === that.tradeOffer.id) {
                // successfull trade: kill the current offer, clear the UI and reset players' resources
                that.tradeOffer = null;
                that.offeredResources.clear();
                that.wantedResourceTypes.clear();
                that.playerResources = new ResourceList(that.game.player.resources);
            }
            if (action instanceof OfferTrade && action.player !== this.game.player) {
                const tradeOffer = action;
                this.tradeOffers.push(tradeOffer);
                this.show = true;
                this.mode = TRADEMODE.respond;
            }
        });
        this.removeEscapeHandler = this.keyListener.escape(() => {
            this.$emit("close");
        });

    },
    unmounted: function() {
        this.removeActionAddedSubscription();
        this.removeEscapeHandler();
    }
}
</script>

<style scoped>
.disabled {
    filter: greyscale(100%) blur(1px);
    pointer-events: none;
}
.trade-offer {
    display: grid;
    grid-template-rows: 1fr 0.5em;
}
.trade-offer-top {
    grid-row-start: 1;
    display: grid;
    grid-template-columns: 1fr auto 2em;
    align-items: center;
    align-content: flex-end;
    min-width: 0;
}
.trade-offer-resources {
    grid-column-start: 1;
    display: inline-flex;
}
.trade-offer-response-buttons {
    grid-column-start: 2;
    display: inline-flex;
}
.trade-offer-selected {
    grid-column-start: 3;
    font-size: 32px;
}
.trade-offer-progress {
    grid-row-start: 2;
    background-color: darkmagenta;
    width: 100%;
    height: 2px;
}
.trade-offer-progress[90] {
    color: red;
}
.trade-offer-offered {
    padding-left: 0.5em;
}
.trade-offer-wanted {
    padding-right: 0.5em;
}
.trade-offer-text {
    padding-left: 0.5em;
    padding-right: 0.5em;
}
.button {
    border: 2px solid lightgray;
}
.button:hover {
    border: 2px solid black;
    cursor: pointer;
}
.accept-logo {
    font-size: 24px;
    color: green;
}
.reject-logo {
    font-size: 24px;
}
.counter-logo {
    font-size: 24px;
    color: darkorange;
    margin: 2px;
    font-weight: 900;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-body {
    pointer-events: all;
    width: 56em;
    padding: 1em;
    background-color: #fff;
    border-radius: 1em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    display: grid;
    grid-template-columns: 20em 20em 4em 1fr;
    grid-template-rows: 6em 0.5em 6em;
    grid-column-gap: 0.5em;
}
.offered {
    margin-left: 2em;
}
.wanted {
    margin-left: 2em;
}
#opponents {
    display: flex;
    flex-direction: column;
    grid-row-start: 1;
    grid-row-end: 6;
    grid-column-start: 1;
}
.opponent {
    height: 3em;
    display: grid;
    grid-template-columns: 1em 1fr;
    padding: 2px;
    align-items: center;
    justify-content: center;
}
.opponent-color {
    height: 100%;
    width: 1em;
    grid-column-start: 1;
}
.opponent-name {
    grid-row-start: 1;
    grid-column-start: 2;
    align-self: center;
    margin-left: .5em;
    font-weight: bold;
}
.button {
    background-color: lightgray;
    border-radius: 8px;
}
.button:hover {
    background-color: none;
}
.accept {
    grid-column-start: 2;
    grid-row-start: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    justify-self: flex-end;
    box-sizing: border-box;
    cursor: pointer;
}
.accept-icon {
    grid-column-start: 2;
    height: 32px;
    padding-left: 0.5em;
    padding-right: 0.5em;
}
.accept-text {
    grid-column-start: 1;
    padding-left: 0.5em;
    font-weight: bold;
    color: darkgreen;
}
.reject {
    grid-row-start: 1;
    grid-column-start: 2;
    display: flex;
    justify-self: flex-end;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
}
    .reject-icon {
        grid-column-start: 2;
        height: 32px;
        padding-left: 0.5em;
        padding-right: 0.5em;
    }
    .reject-text {
        padding-left: 0.5em;
        grid-column-start: 1;
        color: red;
        font-weight: bold;
    }
.counter {
    grid-row-start: 1;
    grid-column-start: 2;
    justify-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.counter-icon {
    height: 32px;
    padding-left: 0.5em;
    padding-right: 0.5em;
}
.counter-text {
    padding-left: 0.5em;
    padding-right: 0.5em;
}
.counter-offered {
    padding-left: 0.5em;
    align-self: center;
}
.cannot-trade {
    pointer-events: none;
    filter: blur(2px);
    opacity: 0.5;
}
.resource  {
    height: 50px;
    border: 0.25em solid white;
    border-radius: 0.25em;
}
.resource:hover:not(.disabled) {
    cursor: pointer;
    border: 0.25em solid lightblue;
}
.selected, .selected:hover {
    border: 0.25em solid black;
}

#get-wrapper {
    text-align: center;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    transform: translateX(20%) translateY(10%) rotate(-90deg);
    z-index:0;
}
.get-give {
    font-size: 3em;
    font-weight: 900;
    color: #c0c0c0;
}

#spacer {
    background-color: #c0c0c0;
    grid-row-start: 2;
    grid-column-start: 2;
    grid-column-end: 4;
}
#give-wrapper {
    text-align: center;
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 3;
    transform: translateY(-100%) translateX(-35%) rotate(-90deg);
    z-index:0;
    height: 1.5em;
}

#wanted-resource-picker {
    grid-row-start: 1;
    grid-column-start: 2;
}
#wanted-picked-resources {
    grid-row-start: 1;
    grid-column-start: 4;
    z-index:1;
}
#offered-picked-resources {
    grid-row-start: 3;
    grid-column-start: 4;
    display: inline-flex;
    margin-top: 2em;
    z-index:1;
}
#offered-resource-picker {
    grid-row-start: 3;
    grid-column-start: 2;
    display: flex;
    min-width: 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 1.5em;
    margin-top: 2em;
}
.resource-wrapper {
    min-width: 0.25em;
    flex: 1 1 0;
}
#button-wrapper {
    width: 100%;
    height: 100%;
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
}
#button {
    height: 3em;
    width: 100%;
}
</style>