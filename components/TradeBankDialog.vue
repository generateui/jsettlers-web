<template id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <div id="bank-pick-resources">
                <div v-for="rt1 in bankResources.types">
                    <div class="bank-resource-count">{{bankResources.of(rt1).length}}</div>
                    <img class="resource-image" 
                         v-bind:class="{ cannotTrade: bankHasNoResource(rt1)}"
                        :src="`doc/images/${rt1.toPascalCase()}Card.png`" 
                        @click="pickBankResource(rt1)" />
                </div>
            </div>
            <div id="bank-picked-resources">
                    <img 
                        v-for="resourceType in bankPickedResources"
                        class="resource-image" 
                        :src="`doc/images/${resourceType.toPascalCase()}Card.png`" 
                        @click="unpickBankResource(resourceType)" />
            </div>
            <div id="get-wrapper">
                <div id="get" class="get-give">GET</div>
            </div>
            <div id="spacer"></div>
            <div id="trade-button-wrapper">
                <button id="trade-button" @click="trade" :disabled="cannotTrade">
                    🡹 Trade! 🡻
                </button>
            </div>
            <div id="player-picked-resources">
                    <img 
                        v-for="resourceType in playerPickedResources"
                        class="resource-image" 
                        :src="`doc/images/${resourceType.toPascalCase()}Card.png`" 
                        @click="unpickPlayerResource(resourceType)" />
            </div>
            <div id="give-wrapper">
                <div id="give" class="get-give">GIVE</div>
            </div>
            <div id="player-pick-resources" >
                <div v-for="rt4 in playerResources.types" v-bind:class="{ cannotTrade: cannotTradeResource(rt4) }">
                    <img class="port-image" :src="`doc/images/${getPort(rt4)}port.png`" />
                    <img class="resource-image"
                        :src="`doc/images/${rt4.toPascalCase()}Card.png`" 
                        @click="pickPlayerResource(rt4)" />
                </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    var proto = require("../data_pb");
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
          getName: function(resourceType) {
            return Util.getEnumName(proto.ResourceType, resourceType);
          },
          getPortName: function(port) {
            return Util.getEnumName(proto.PortType, port.type).toLowerCase();
          },
          pickBankResource: function(resourceType) {
            this.$data.bankPickedResources.push(resourceType);
            this.bankResources.remove(resourceType);
          },
          unpickBankResource: function(resourceType) {
            this.$data.bankPickedResources.remove(resourceType);
            this.bankResources.add(resourceType);
          },
          unpickPlayerResource: function(resourceType) {
            const p = this.$props.game.player;
            const port = p.ports.bestPortForResourceType(resourceType);
            for (var i = 0; i < port.inAmount; i++) {
                this.$data.playerPickedResources.remove(resourceType);
                this.$data.playerResources.add(resourceType);
            }
            this.goldAmount--;
          },
          pickPlayerResource: function(resourceType) {
            const p = this.$props.game.player;
            const port = p.ports.bestPortForResourceType(resourceType);
            for (var i = 0; i < port.inAmount; i++) {
                this.$data.playerPickedResources.push(resourceType);
                this.$data.playerResources.remove(resourceType);
            }
            this.goldAmount++;
          },
          getPort(resourceType) {
              const port = this.$props.game.player.ports.bestPortForResourceType(resourceType);
              return this.getPortName(port);
          },
          cannotTradeResource(resourceType) {
              const p = this.$props.game.player;
              const port = p.ports.bestPortForResourceType(resourceType);
              return this.playerResources.of(resourceType).length < port.inAmount;
          },
          bankHasNoResource: function(resourceType) {
              return !this.game.bank.resources.hasOf(resourceType);
          },
          trade: function() {
              const bankPicks = this.bankPickedResources.map(rt => proto.ResourceType[rt]);
              const playerPicks = this.playerPickedResources.map(rt => proto.ResourceType[rt]);
              const tradeBank = TradeBank.createData(this.game.player, playerPicks, bankPicks);
              this.$emit("trade", tradeBank);
          }
        },
        computed: {
            cannotTrade: function() {
              return this.bankPickedResources.length !== this.goldAmount || this.goldAmount === 0;
            }
        }
    }
</script>

<style scoped>
.cannotTrade {
    pointer-events: none;
    filter: blur(4px);
}
.resource-image {
    height: 101px;
    width: 63px;
    border: 0.5em solid white;
    border-radius: 16px;
}
.resource-image:hover {
  cursor: pointer;
  border: 0.5em solid lightblue;
}
.selected, .selected:hover {
    border: 0.5em solid black;
}
.bank-resource-count {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
}
.port-image {
    height: 48px;
    width: 48px;
    filter: drop-shadow(0px 0px 6px #000);
    margin-left: 1em;
    margin-bottom: .5em;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  /* transition: opacity .2s ease; */
}
#get-wrapper {
    text-align: center;
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 2;
    transform: translateX(52%) rotate(-90deg);
}
#give-wrapper {
    text-align: center;
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 2;
    transform: translateY(120%) rotate(-90deg);
}
.get-give {
    font-size: 80px;
    font-weight: 900;
    color: #c0c0c0;
}
#spacer {
    background-color: #c0c0c0;
    grid-row-start: 3;
    grid-column-start: 1;
    grid-column-end: 1;
    
}
#trade-button-wrapper {
    grid-row-start: 2;
    grid-row-end: 5;
    grid-column-start: 2;
    /* margin-top: 4em; */

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
#trade-button {
    height: 3em;
    width: 100%;
    font-size: 20px;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
  display: grid;
  grid-template-columns: auto 10em;
  grid-template-rows: 150px 120px 10px 120px 150px;
}

#bank-pick-resources {
    grid-row-start: 1;
    grid-column-start: 1;
    display: inline-flex;
}
#bank-picked-resources {
    grid-row-start: 2;
    grid-column-start: 1;
    display: inline-flex;
}
#player-picked-resources {
    grid-row-start: 4;
    grid-column-start: 1;
}
#player-pick-resources {
    grid-row-start: 5;
    grid-column-start: 1;
    display: inline-flex;
}

</style>