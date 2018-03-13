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
                    <div v-if="tradeOffer !== null && tradeOffer.responses.has(opponent) && tradeOffer.responses.get(opponent) instanceof AcceptOffer"
                        class="accept-button" 
                        @click="acceptOffer(tradeOffer.responses.get(opponent))">
                        <img class="accept-icon" src="doc/images/AcceptOffer48.png" />
                        <span class="accept-text">Trade!</span>
                    </div>
                    <div class="reject"
                        v-if="tradeOffer !== null && tradeOffer.responses.has(opponent) && tradeOffer.responses.get(opponent) instanceof RejectOffer">
                        <img class="reject-icon" src="doc/images/RejectOffer48.png" />
                        <span class="reject-text">Rejected</span>
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
                <template v-for="rt in playerResources.types">
                    <div class="resource-wrapper" v-for="resource in playerResources.of(rt)" :key="resource.id">
                        <img 
                            class="resource"
                            :src="`doc/images/${resource.name}Card.png`"
                            v-bind:class="{ cannotTrade: isOffered(rt)}"
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
            },
            keyListener: {
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
                    // successfull trade: kill the current offer, clear the UI and reset players' resources
                    that.tradeOffer = null;
                    that.offeredResources.clear();
                    that.wantedResourceTypes.clear();
                    that.playerResources = new ResourceList(that.game.player.resources);
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
#players {
    display: flex;
    flex-direction: column;
    grid-row-start: 1;
    grid-row-end: 6;
    grid-column-start: 1;
}
.player {
    height: 3em;
    display: grid;
    grid-template-columns: 1em 1fr 8em;
    padding: 2px;
}
.player-color {
    height: 100%;
    width: 1em;
    grid-column-start: 1;
}
.opponent-name {
    grid-column-start: 2;
    align-self: center;
    margin-left: .5em;
    font-weight: bold;
}
.accept-button {
    grid-column-start: 3;
    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-template-columns: auto 1fr;
    grid-template-rows: 3em;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
    background-color: darkgrey;
    border-radius: 8px;
}
.accept-button:hover {
    background-color: grey;
}
    .accept-icon {
        grid-column-start: 1;
        height: 32px;
        padding-left: 0.5em;
        padding-right: 0.5em;
    }
    .accept-text {
        grid-column-start: 2;
        font-weight: bold;
    }
.reject {
    grid-column-start: 3;
    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-template-columns: auto 1fr;
    grid-template-rows: 3em;
    height: 100%;
}
    .reject-icon {
        grid-column-start: 1;
        height: 32px;
        padding-left: 0.5em;
        padding-right: 0.5em;
    }
    .reject-text {
        grid-column-start: 2;
    }

.cannotTrade {
    pointer-events: none;
    filter: blur(2px);
    opacity: 0.5;
}
.resource  {
    height: 50px;
    border: 0.25em solid white;
    border-radius: 0.25em;
}
.resource:hover {
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