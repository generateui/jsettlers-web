<template>
    <div id="actions">
        <build-town-button id="build-town-button" v-bind:game="game"></build-town-button>
        <div id="build-city" class="build-button">
            <img id="city-trade1" class="trade" src="doc/images/Trade48.png" />
            <img id="city-trade2" class="trade" src="doc/images/Trade48.png" />
            <img id="city-trade3" class="trade" src="doc/images/Trade48.png" />
            <img id="city-trade4" class="trade" src="doc/images/Trade48.png" />
            <img id="city-trade5" class="trade" src="doc/images/Trade48.png" />
            <img id="build-city-button" src="doc/images/City48.png" />
        </div>
        <div id="build-road" class="build-button">
            <!-- <img id="road-trade1" class="trade" src="doc/images/Trade48.png" /> -->
            <!-- <img id="road-trade2" class="trade" src="doc/images/Trade48.png" /> -->
            <img id="road-token1" v-if="game.player.roadBuildingTokens > 0" class="trade" src="doc/images/RoadBuildingToken.png" />
            <img id="road-token2" v-if="game.player.roadBuildingTokens > 1" class="trade" src="doc/images/RoadBuildingToken.png" />
            <img id="build-road-button" src="doc/images/Road48.png" @click="buildRoad" />
        </div>
        <div id="buy-development-card" class="build-button">
            <img id="buy-development-card-trade1" class="trade trade1" src="doc/images/Trade48.png" />
            <img id="buy-development-card-trade2" class="trade trade2" src="doc/images/Trade48.png" />
            <img id="buy-development-card-trade3" class="trade trade3" src="doc/images/Trade48.png" />
            <img id="buy-development-card-button" src="doc/images/BuyDevelopmentCard48.png" />
        </div>
        <!-- <div id="play-developmentCard" class="build-button">
            <img src="doc/images/PlayDevelopmentCard48.png" />
        </div> -->
        <div id="trade-player" class="build-button">
            <img src="doc/images/TradePlayer48.png" @click="openTradePlayerDialog" />
        </div>
        <div id="trade-bank" class="build-button" @click="tradeBank">
            <img src="doc/images/TradeBank48.png" />
        </div>
        <div id="end-turn" class="build-button" @click="endTurn">
            <img src="doc/images/EndTurn48.png" />
        </div>
        <dice-view id="dice-view" class="build-button" v-on:rolldice="rollDice" v-bind:dice="dice"></dice-view>
        <game-phases-view id="game-phases-view"
            v-bind:game="game">
        </game-phases-view>
        <trade-player-dialog 
            v-if="showTradePlayerDialog" 
            v-on:action="action"
            v-bind:game="game">
        </trade-player-dialog>
    </div>
</template>

<script>
    import DiceView from "./DiceView.vue";
    import TradeBankDialog from "./TradeBankDialog.vue";
    import TradePlayerDialog from './TradePlayerDialog.vue';
    import BuildTownButton from './BuildTownButton.vue';
    import GamePhasesView from './GamePhasesView.vue';

    import * as gb from "../src/ui/gameBehavior.js";
    import {BuildRoad} from "../src/actions/buildRoad.js";

    export default {
        components: {
            DiceView, TradeBankDialog, TradePlayerDialog, GamePhasesView, BuildTownButton
        },
        props: {
            game: {
                type: Object
            },
            keyListener: {
                type: Object
            }
        },
        name: 'actions',
        data() {
            return {
                dice: game.dice,
                showTradeBankDialog: false,
                showTradePlayerDialog: false,
            }
        },
        methods: {
            action: function(action) {
                this.$emit("action", action);
            },
            buildRoad: function() {
                const player = this.$props.game.player;
                const behavior = new gb.BuildRoad(player, this.$props.keyListener);
                const createAction = (player, edge) => BuildRoad.createData(player, edge);
                this.$emit("behaveThenAct", behavior, createAction);
            },
            openTradeBankDialog: function() {
                this.$data.showTradeBankDialog = true;
            },
            tradeBank: function(tradeBankAction) {
                this.$emit("tradebank", tradeBankAction);
            },
            rollDice: function() {
                this.$emit("rolldice");
            },
            endTurn: function() {
                this.$emit("endTurn");
            },
            openTradePlayerDialog: function() {
                this.showTradePlayerDialog = !this.showTradePlayerDialog;
            }
        }
    }
</script>

<style>
.build-button { 
    margin: 0.25em;
    align-self: end;
}
.build-button:hover:not(.disabled) {
    filter: drop-shadow(0px 0px 12px #fff);
}
.trade {
    width: 20px;
    height: 20px;
    align-self: center;
}
.disabled {
    filter: blur(2px) grayscale(100%);
}
</style>

<style scoped>
#actions {
    display: grid;
    height: 64px;
    grid-template-columns: 110px repeat(8, 48px) 10em;
    grid-template-rows: repeat(9, 64px);
    grid-column-gap: 1em;
}

#build-city {
    grid-column-start: 4;
    grid-row-start: 1;
    display: grid;
    grid-template-columns: 24px 24px;
    grid-template-rows: 24px 24px 24px 48px;
}
    #build-city-button {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 4;
        grid-row-end: 4;
        width: 48px;
        height: 48px;
    }
    #city-trade1 {
        grid-column-start: 1;
        grid-row-start: 3;
    }
    #city-trade2 {
        grid-column-start: 2;
        grid-row-start: 3;
    }
    #city-trade3 {
        grid-column-start: 1;
        grid-row-start: 2;
    }
    #city-trade4 {
        grid-column-start: 2;
        grid-row-start: 2;
    }
    #city-trade5 {
        grid-column-start: 1;
        grid-row-start: 1;
    }

#build-town-button {
    grid-column-start: 2;
    grid-row-start: 1;
}

#build-road {
    grid-column-start: 3;
    grid-row-start: 1;
    display: grid;
    grid-template-columns: 24px 24px;
    grid-template-rows: 24px 48px;
}
    #build-road-button {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 2;
        width: 48px;
        height: 48px;
    }
    #road-trade1 {
        grid-column-start: 1;
        grid-row-start: 1;
    }
    #road-trade2 {
        grid-column-start: 2;
        grid-row-start: 1;
    }
    #road-token1 {
        grid-column-start: 1;
        grid-row-start: 1;
    }
    #road-token2 {
        grid-column-start: 2;
        grid-row-start: 1;
    }
#buy-development-card {
    grid-column-start: 5;
    grid-row-start: 1;
    display: grid;
    grid-template-columns: 24px 24px;
    grid-template-rows: 24px 24px 48px;
}
    #buy-development-card-button {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 3;
        grid-row-end: 3;
        width: 48px;
        height: 48px;
    }
    #buy-development-card-trade1 {
        grid-column-start: 1;
        grid-row-start: 2;
    }
    #buy-development-card-trade2 {
        grid-column-start: 2;
        grid-row-start: 2;
    }
    #buy-development-card-trade3 {
        grid-column-start: 1;
        grid-row-start: 1;
    }
#play-developmentCard {
    grid-column-start: 5;
    grid-row-start: 1;
}
#trade-player {
    grid-column-start: 6;
    grid-row-start: 1;
}
#trade-bank {
    grid-column-start: 7;
    grid-row-start: 1;
}
#end-turn {
    grid-column-start: 8;
    grid-row-start: 1;
}
#dice-view {
    grid-column-start: 1;
    grid-row-start: 1;
}
#game-phases-view {
    grid-column-start: 10;
}
</style>