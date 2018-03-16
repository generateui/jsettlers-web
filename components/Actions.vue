<template>
    <div id="actions">
        <build-town-button id="build-town-button" :game="game"></build-town-button>
        <build-city-button id="build-city-button" :game="game"></build-city-button>
        <build-road-button id="build-road-button" :game="game"></build-road-button>
        <buy-development-card-button id="buy-development-card-button" :game="game"></buy-development-card-button>
        <div id="trade-player" class="build-button">
            <img src="doc/images/TradePlayer48.png" @click="toggleTradePlayerDialog" />
        </div>
        <div id="trade-bank" class="build-button" @click="toggleTradeBankDialog">
            <img src="doc/images/TradeBank48.png" />
        </div>
        <div id="end-turn" class="build-button" @click="endTurn">
            <img src="doc/images/EndTurn48.png" />
        </div>
        <dice-view id="dice-view" class="build-button" v-on:rolldice="rollDice" :dice="dice"></dice-view>
        <game-phases-view id="game-phases-view"
            :game="game">
        </game-phases-view>
        <trade-player-dialog 
            @action="action"
            @close="closeTradePlayerDialog"
            :keyListener="keyListener"
            :show="showTradePlayerDialog"
            :game="game">
        </trade-player-dialog>
    </div>
</template>

<script>
    import DiceView from "./DiceView.vue";
    import TradeBankDialog from "./TradeBankDialog.vue";
    import TradePlayerDialog from './TradePlayerDialog.vue';
    import BuildTownButton from './BuildTownButton.vue';
    import BuildCityButton from './BuildCityButton.vue';
    import BuildRoadButton from './BuildRoadButton.vue';
    import BuyDevelopmentCardButton from './BuyDevelopmentCardButton.vue';
    import GamePhasesView from './GamePhasesView.vue';

    import * as gb from "../src/ui/gameBehavior.js";
    import {BuildRoad} from "../src/actions/buildRoad.js";

    export default {
        components: {
            DiceView, TradeBankDialog, TradePlayerDialog, GamePhasesView, BuildTownButton, 
            BuildRoadButton, BuildCityButton, BuyDevelopmentCardButton
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
            action(action) {
                this.$emit("action", action);
            },
            buildRoad() {
                const player = this.$props.game.player;
                const edges = this.game.phase.roadPossibilities(this.game, this.game.player);
                const behavior = new gb.PickRoadEdge(edges, this.$props.keyListener);
                const createAction = (player, edge) => BuildRoad.createData(player, edge);
                this.$emit("behaveThenAct", behavior, createAction);
            },
            toggleTradeBankDialog() {
                this.$emit("toggleTradeBankDialog");
            },
            rollDice() {
                this.$emit("rolldice");
            },
            endTurn() {
                this.$emit("endTurn");
            },
            toggleTradePlayerDialog() {
                this.showTradePlayerDialog = !this.showTradePlayerDialog;
            },
            closeTradePlayerDialog() {
                this.showTradePlayerDialog = false;
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
.popup {
    max-width: 200px;
}
.popup-resource {
    width: 24px;
    /* height: 32px; */
    margin: 2px;
}
.popup p {
    text-align: left;
    margin: 0.5em;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
}
.popup-hero {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    justify-content: center;
}
.popup-logo {
    grid-column-start: 1;
    grid-row-start: 1;
    /* height: 24px; */
    width: 48px;
    margin-right: 6px;
    margin-left: 4px;
    margin-top: 4px;
}
.popup-cost {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    display: inline-flex;
    margin: 0.5em;
}
.popup-title {
    grid-column-start: 2;
    grid-row-start: 1;
    align-self: center;
    font-weight: bold;
    font-family: "Nanum Pen Script";
    font-size: 20px;
}
.popup li {
    text-align: left;
    list-style: none;
}
.popup li:before {
    content: '❌';
    margin-right: 4px;
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

#build-city-button {
    grid-column-start: 4;
    grid-row-start: 1;
}
#build-town-button {
    grid-column-start: 2;
    grid-row-start: 1;
}
#build-road-button {
    grid-column-start: 3;
    grid-row-start: 2;
}
#buy-development-card-button {
    grid-column-start: 5;
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