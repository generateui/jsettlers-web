<template id="modal-template">
    <div class="modal-mask">
        <div class="modal-body">
            <div id="players">
                <div v-for="opponent in game.getOpponents(game.player)" 
                    class="player" 
                    v-bind:style="{ backgroundColor: opponent.color.toCssRgba(0.25) }"
                    :key="opponent.id">
                    <div v-bind:style="{ backgroundColor: opponent.color.css}" class="player-color"></div>
                    <span class="opponent-name">{{opponent.user.name}}</span>
                    <div class="response"
                        v-if="tradeOffer !== null && tradeOffer.responses.has(opponent) && tradeOffer.responses.get(opponent) instanceof RejectOffer">
                        <button class="response-button" disabled>
                            <span>Nope...</span>
                            <img class="response-image" src="doc/images/RejectOffer48.png" />
                        </button>
                    </div>
                    <div class="response"
                        v-if="tradeOffer !== null && tradeOffer.responses.has(opponent) && tradeOffer.responses.get(opponent) instanceof AcceptOffer">
                        <button class="response-button" @click="acceptOffer(tradeOffer.responses.get(opponent))">
                            <span>Trade!</span>
                            <img class="response-image" src="doc/images/AcceptOffer48.png" />
                        </button>
                    </div>
                    <div class="response"
                        v-if="tradeOffer !== null && tradeOffer.responses.has(opponent) && tradeOffer.responses.get(opponent) instanceof CounterOffer">
                        <div class="counter-resources offered">
                            <img
                                v-for="resourceType in tradeOffer.responses.get(opponent).offered" :key="resourceType" 
                                :src="`doc/images/${getName(resourceType).toPascalCase()}Card.png`" />
                        </div>
                        <div class="counter-resources wanted">
                            <img 
                                v-for="resourceType in tradeOffer.responses.get(opponent).wanted" :key="resourceType"
                                :src="`doc/images/${getName(resourceType).toPascalCase()}Card.png`" />
                        </div>
                        <button class="response-button" @click="counterOffer(tradeOffer.responses.get(opponent))">
                            <span>Trade!</span>
                            <img class="response-image" src="doc/images/CounterOffer48.png" />
                        </button>
                    </div>
                </div>
            </div>
            <div id="wanted-resource-picker">
                <img v-for="rt in resourceTypes"
                    class="resource"
                    :key="rt"
                    :src="`doc/images/${getName(rt).toPascalCase()}Card.png`"
                    v-bind:class="{ cannotTrade: isOffered(rt)}"
                    @click="pickWantedResourceType(rt)" />
            </div>
            <div id="wanted-picked-resources">
                <img v-for="rt in wantedResourceTypes" 
                    :key="rt"
                    class="resource"
                    :src="`doc/images/${getName(rt).toPascalCase()}Card.png`" 
                    @click="unpickWantedResourceType(rt)" />
            </div>
            <div id="offered-picked-resources">
                <img v-for="resource in offeredResources" 
                    :key="resource.id"
                    class="resource"
                    :src="`doc/images/${resource.name}Card.png`" 
                    @click="unpickOfferedResource(resource)" />
            </div>
            <div id="offered-resource-picker">
                <div v-for="rt in playerResources.types" :key="rt">
                    <img v-for="resource in playerResources.of(rt)"
                        class="resource"
                        :key="resource.id"
                        :src="`doc/images/${resource.name}Card.png`"
                        v-bind:class="{ cannotTrade: isOffered(rt)}"
                        @click="pickOfferedResource(resource)" />
                </div>
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
                    :disabled="wantedResourceTypes.length === 0">
                    <span v-if="wantedResourceTypes.length === 0">Can't do...</span>
                    <span v-if="wantedResourceTypes.length > 0">Offer trade</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    var proto = require("../data_pb");
    import { Util } from "../src/util.js";
    import { OfferTrade } from '../src/actions/offerTrade';
    import { TradePlayer } from '../src/actions/tradePlayer';
    import { ResourceList } from '../src/resource';
    
    export default {
        name: 'trade-player-dialog',
        props: {
            game: {
                type: Object
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
          offerTrade: function() {
              const offered = this.offeredResources.map(r => r.type);
              const offerTrade = OfferTrade.createData(this.game.player, offered, this.wantedResourceTypes);
              this.$emit("action", offerTrade);
          },
          acceptOffer: function(acceptOffer) {
              const tradePlayer = TradePlayer.createData(this.game.player, this.tradeOffer, acceptOffer);
              this.$emit("action", tradePlayer);
          },
          counterOffer: function(counterOffer) {
              const tradePlayer = TradePlayer.createData(this.game.player, this.tradeOffer, counterOffer);
              this.$emit("action", tradePlayer);
          }
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
                    // successfull trade, so kill the current offer
                    that.tradeOffer = null;
                    that.offeredResources.clear();
                    that.wantedResourceTypes.clear();
                    that.playerResources = new ResourceList(that.game.player.resources);
                }
            });
        },
        unmounted: function() {
            this.removeActionAddedSubscription();
        }
    }
</script>

<style scoped>
.counter-resources img {
    height: 4em;
    margin-left: -1em;
}
.offered {
    margin-left: 2em;
}
.wanted {
    margin-left: 2em;
}
.counter-resources {
    display: inline-flex;
}
.player-color {
    height: 100%;
    width: 1em;
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
}
#players {
    display: flex;
    flex-direction: column;
    grid-row-start: 1;
    grid-row-end: 6;
    grid-column-start: 1;
    padding-right: 1em;
}
.player {
    height: 100px;
    display: grid;
    grid-template-rows: 2em 5em;
    grid-template-columns: 1em auto;
}
.response {
    grid-row-start: 2;
    grid-column-start: 2;
}
.response-button {
    grid-row-start: 2;
    grid-column-start: 3;
    height:4em;
    width:10em;
    float: right;
    display: flex;
    align-items: flex-end;
    margin-right: 1em;
}
.response-button:disabled {
    filter: blur(1px); 
    opacity: 0.7;
}
.response-button span {
    margin: 1em;
    font-weight: bold;
}
.opponent-name {
    grid-row-start: 1;
    grid-column-start: 2;
    margin-left: 1em;
    margin-top: 0.25em;
    font-weight: bold;
}
.cannotTrade {
    pointer-events: none;
    filter: blur(2px);
    opacity: 0.5;
}
.resource  {
    height: 101px;
    width: 63px;
    border: 0.5em solid white;
    border-radius: 16px;
}
.resource:hover {
    cursor: pointer;
    border: 0.5em solid lightblue;
}
.selected, .selected:hover {
    border: 0.5em solid black;
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
    width: 1000px;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 1em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    display: grid;
    grid-template-columns: 400px auto 8em;
    grid-template-rows: 120px 120px 10px 120px 120px;
}

#get-wrapper {
    text-align: center;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    transform: translateX(10%) translateY(60%) rotate(-90deg);
}
.get-give {
    font-size: 72px;
    font-weight: 900;
    color: #c0c0c0;
}

#spacer {
    background-color: #c0c0c0;
    grid-row-start: 3;
    grid-column-start: 2;
    grid-column-end: 4;
}
#give-wrapper {
    text-align: center;
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 3;
    transform: translateY(100%) translateX(10%) rotate(-90deg);
}

#wanted-resource-picker {
    grid-row-start: 1;
    grid-column-start: 2;
}
#wanted-picked-resources {
    grid-row-start: 2;
    grid-column-start: 2;
}
#offered-picked-resources {
    grid-row-start: 4;
    grid-column-start: 2;
    display: inline-flex;
}
#offered-resource-picker {
    grid-row-start: 5;
    grid-column-start: 2;
    display: inline-flex;
    padding-left: 4em;
}
#offered-resource-picker img, #offered-resource-picker div {
    margin-left: -2em;
}
#button-wrapper {
    width: 100%;
    height: 100%;
    grid-row-start: 2;
    grid-row-end: 5;
    grid-column-start: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
#button {
    width: 100%;
    height: 4em;
    border-radius: 0.5em;
}
</style>