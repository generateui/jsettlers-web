<template>
    <div id="actions">
        <build-town-button
            id="build-town-button"
            @buildTown="buildTown()"
            :game="game"></build-town-button>
        <build-city-button 
            id="build-city-button"
            @buildCity="buildCity()"
            :game="game"></build-city-button>
        <build-road-button 
            id="build-road-button"
            @buildRoad="buildRoad()"
            :game="game"></build-road-button>
        <buy-development-card-button
            id="buy-development-card-button"
            @buyDevelopmentCard="buyDevelopmentCard()"
            :game="game"></buy-development-card-button>
        <div id="trade-player" class="build-button">
            <img src="doc/images/TradePlayer48.png" @click="toggleTradePlayerDialog" />
        </div>
        <trade-bank-button
            id="trade-bank-button"
            @tradeBank="toggleTradeBankDialog"
            :game="game"></trade-bank-button>
        <end-turn-button
            id="end-turn-button"
            @endTurn="endTurn()"
            :game="game"></end-turn-button>
        <claim-victory-button
            id="claim-victory-button"
            @claimVictory="claimVictory()"
            :game="game"></claim-victory-button>
        <roll-dice-button
            id="roll-dice-button"
            class="build-button"
            @rollDice="rollDice()"
            :game="game"
            :dice="dice"></roll-dice-button>

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
import RollDiceButton from "./RollDiceButton.vue";
import TradeBankDialog from "./TradeBankDialog.vue";
import TradeBankButton from "./TradeBankButton.vue";
import TradePlayerDialog from './TradePlayerDialog.vue';
import BuildTownButton from './BuildTownButton.vue';
import BuildCityButton from './BuildCityButton.vue';
import BuildRoadButton from './BuildRoadButton.vue';
import EndTurnButton from './EndTurnButton.vue';
import ClaimVictoryButton from './ClaimVictoryButton.vue';
import BuyDevelopmentCardButton from './BuyDevelopmentCardButton.vue';
import GamePhasesView from './GamePhasesView.vue';

import * as gb from "../src/ui/gameBehavior.js";
import { BuildRoad } from "../src/actions/buildRoad.js";
import { BuildTown } from '../src/actions/buildTown';
import { BuildCity } from '../src/actions/buildCity';
import { BuyDevelopmentCard } from '../src/actions/buyDevelopmentCard';
import { ClaimVictory } from '../src/actions/claimVictory';
import { RollDice } from '../src/actions/rollDice';
import { EndTurn } from '../src/actions/endTurn';

export default {
    components: {
        RollDiceButton, TradeBankDialog, TradePlayerDialog, GamePhasesView,
        BuildTownButton, BuildRoadButton, BuildCityButton,
        BuyDevelopmentCardButton, EndTurnButton, ClaimVictoryButton,
        TradeBankButton
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
        buildTown() {
            const player = this.game.player;
            const nodes = this.game.phase.townPossibilities(this.game, player);
            const behavior = new gb.PickTownNode(nodes, this.keyListener);
            const createAction = (player, node) => 
                new BuildTown({ player: player, node: node });
            this.$emit("behaveThenAct", behavior, createAction);
        },
        buildRoad() {
            const player = this.game.player;
            const edges = this.game.phase.roadPossibilities(this.game, this.game.player);
            const behavior = new gb.PickRoadEdge(edges, this.keyListener);
            const createAction = (player, edge) => 
                new BuildRoad({ player: player, edge: edge });
            this.$emit("behaveThenAct", behavior, createAction);
        },
        buildCity() {
            const player = this.game.player;
            const behavior = new gb.PickTownForCity(player, this.keyListener, true);
            const createAction = (player, node) =>
                new BuildCity({ player: player, node: node });
            this.$emit("behaveThenAct", behavior, createAction);
        },
        buyDevelopmentCard() {
            const player = this.game.player;
            const buyDevelopmentCard = new BuyDevelopmentCard({ player: player });
            this.$emit("action", buyDevelopmentCard);
        },
        claimVictory() {
            const player = this.game.player;
            const claimVictory = new ClaimVictory({ player: player });
            this.$emit("action", claimVictory);
        },
        toggleTradeBankDialog() {
            this.$emit("toggleTradeBankDialog");
        },
        rollDice() {
            let rollDice = new RollDice({ player: this.game.player });
            this.$emit("action", rollDice);
        },
        endTurn() {
            let endTurn = new EndTurn({ player: this.game.player });
            this.$emit("action", endTurn);
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
    grid-template-columns: 110px repeat(9, 48px) 10em;
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
#trade-bank-button {
    grid-column-start: 7;
    grid-row-start: 1;
}
#end-turn-button {
    grid-column-start: 8;
    grid-row-start: 1;
}
#claim-victory-button {
    grid-column-start: 9;
    grid-row-start: 1;
}
#roll-dice-button {
    grid-column-start: 1;
    grid-row-start: 1;
}
#game-phases-view {
    grid-column-start: 11;
}
</style>