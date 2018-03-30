<template>
    <div class="mask">
        <div class="container">

            <div id="bank-pick-resources">
                <div v-for="rt1 in bankResources.types" :key="rt1">
                    <img class="resource-image" 
                        :class="{ 'cannot-trade': bankHasNoResource(rt1)}"
                        :src="`doc/images/${rt1}Card.png`" 
                        @click="pickBankResource(rt1)" />
                    <div 
                        class="bank-resource-count" 
                        :data-tooltip="`the bank has ${bankResources.of(rt1).length} ${rt1.toPascalCase()} in stock`">
                        {{bankResources.of(rt1).length}}
                    </div>
                </div>
            </div>
            <div id="bank-picked-resources">
                    <img 
                        v-for="resourceType in bankPickedResources"
                        class="resource-image" 
                        :key="resourceType"
                        :src="`doc/images/${resourceType.toPascalCase()}Card.png`" 
                        @click="unpickBankResource(resourceType)" />
            </div>
            <div id="get-wrapper" data-tooltip="on this top side, select resources you want">
                <div id="get" class="get-give">GET</div>
            </div>
            <div id="spacer"></div>
            <div id="trade-button-wrapper">
                <button id="trade-button" @click="trade" :disabled="cannotTrade" data-tooltip="to bank, balance the top and bottom resources and hit this button">
                    🡹 Trade! 🡻
                </button>
            </div>
            <div id="player-picked-resources">
                    <img 
                        v-for="resourceType in playerPickedResources"
                        class="resource-image" 
                        :key="resourceType"
                        :src="`doc/images/${resourceType.toPascalCase()}Card.png`" 
                        @click="unpickPlayerResource(resourceType)" />
            </div>
            <div id="give-wrapper" data-tooltip="on this bottom side, select resources you exchange for">
                <div id="give" class="get-give">GIVE</div>
            </div>
            <div id="player-pick-resources">
                <div
                    class="resource-type-and-port" 
                    v-for="rt4 in playerResources.types" 
                    v-bind:class="{ 'cannot-trade': cannotTradeResource(rt4) }"
                    :key="rt4">
                    <span :data-tooltip="`you have a ${getPort(rt4).name} port`" class="port-ratio">{{getPort(rt4).inAmount}}:{{getPort(rt4).outAmount}}</span>
                    <img class="resource-image"
                        :src="`doc/images/${rt4.toPascalCase()}Card.png`" 
                        @click="pickPlayerResource(rt4)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var proto = require("../src/generated/data_pb");
import {Util} from "../src/util.js";
import {ResourceList} from "../src/resource.js";
import {TradeBank} from "../src/actions/tradeBank.js";

const r = ResourceList.withAllTypes();
r.add(proto.ResourceType.WHEAT);

export default {
    name: 'trade-bank-dialog',
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
            bankResources: new ResourceList(this.game.bank.resources),
            bankPickedResources: [],
            playerPickedResources: [],
            playerResources: new ResourceList(this.game.player.resources),
            goldAmount: 0,
        }
    },
    methods: {
        pickBankResource: function(resourceType) {
            this.bankPickedResources.push(resourceType);
            this.bankResources.remove(resourceType);
        },
        unpickBankResource: function(resourceType) {
            this.bankPickedResources.remove(resourceType);
            this.bankResources.add(resourceType);
        },
        unpickPlayerResource: function(resourceType) {
            const p = this.game.player;
            const port = p.ports.bestPortForResourceType(resourceType);
            for (var i = 0; i < port.inAmount; i++) {
                this.playerPickedResources.remove(resourceType);
                this.playerResources.add(resourceType);
            }
            this.goldAmount--;
        },
        pickPlayerResource: function(resourceType) {
            const p = this.game.player;
            const port = p.ports.bestPortForResourceType(resourceType);
            for (var i = 0; i < port.inAmount; i++) {
                this.playerPickedResources.push(resourceType);
                this.playerResources.remove(resourceType);
            }
            this.goldAmount++;
        },
        getPort(resourceType) {
            return this.game.player.ports.bestPortForResourceType(resourceType);
        },
        cannotTradeResource(resourceType) {
            const p = this.game.player;
            const port = p.ports.bestPortForResourceType(resourceType);
            return this.playerResources.of(resourceType).length < port.inAmount;
        },
        bankHasNoResource(resourceType) {
            return !this.game.bank.resources.hasOf(resourceType);
        },
        trade() {
            const bankPicks = this.bankPickedResources.map(rt => proto.ResourceType[rt]);
            const playerPicks = this.playerPickedResources.map(rt => proto.ResourceType[rt]);
            const tradeBank = TradeBank.createData(this.game.player, playerPicks, bankPicks);
            this.$emit("trade", tradeBank);
        }
    },
    computed: {
        cannotTrade() {
            return this.bankPickedResources.length !== this.goldAmount || this.goldAmount === 0;
        }
    },
    mounted() {
        this.removeEscapeHandler = this.keyListener.escape(() => {
            this.$emit("close");
        });
    },
    destroyed() {
        this.removeEscapeHandler();
    },
}
</script>

<style scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  pointer-events: none;
}
.container {
  align-self: center;
  width: 40em;
  height: 13.5em;
  margin: 0.5em auto;
  padding: 0.5em;
  background-color: #fff;
  border-radius: 0.5em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  display: grid;
  grid-template-columns: auto 4em 1fr;
  grid-template-rows: 6.5em 0.5em 6.5em;
  pointer-events: all;
}
.cannot-trade {
    pointer-events: none;
    filter: grayscale(100%) blur(2px);
}
.resource-image {
    height: 50px;
    border: 4px solid white;
    border-radius: 4px;
}
.resource-image:hover {
    cursor: pointer;
    border: 4px solid black;
    border-radius: 4px;
}
.resource-type-and-port {
    display: inline-grid;
}
.selected, .selected:hover {
    border: 4px solid black;
    border-radius: 4px;
}
.bank-resource-count {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
}
.port-ratio {
    padding-top: 0.5em;
    font-weight: bold;
    font-size: 125%;
    text-align: center;
}
#get-wrapper {
    text-align: center;
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 2;
    transform: translateX(50%) rotate(-90deg);
    z-index: 0;
}
#give-wrapper {
    text-align: center;
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 2;
    transform: translateY(20%) translateX(50%) rotate(-90deg);
    z-index: 0;
}
.get-give {
    font-size: 2em;
    font-weight: 900;
    color: #c0c0c0;
}
#spacer {
    background-color: #c0c0c0;
    grid-row-start: 2;
    grid-column-start: 1;
    grid-column-end: 3;
}
#trade-button-wrapper {
    grid-row-start: 1;
    grid-row-end: 4;
    grid-column-start: 3;
    display: flex;
    align-items: center;
    justify-content: center;
}
#trade-button {
    height: 3em;
    width: 100%;
    font-size: 1em;
    font-weight: bold;
}


#bank-pick-resources {
    grid-row-start: 1;
    grid-column-start: 1;
    display: inline-flex;
}
#bank-picked-resources {
    grid-row-start: 1;
    grid-column-start: 3;
    display: inline-flex;
    z-index: 1;
}
#player-picked-resources {
    grid-row-start: 3;
    grid-column-start: 3;
    align-self: flex-end;
    padding-top: 0.25em;
    z-index: 1;
}
#player-pick-resources {
    grid-row-start: 3;
    grid-column-start: 1;
    display: inline-flex;
}

</style>