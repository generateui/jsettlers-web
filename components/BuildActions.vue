<template>
    <div id="build-actions">
        <div id="build-town" class="build-button">
            <img id="town-trade1" class="trade" src="doc/images/Trade48.png" />
            <img id="town-trade2" class="trade" src="doc/images/Trade48.png" />
            <img id="town-trade3" class="trade" src="doc/images/Trade48.png" />
            <img id="town-trade4" class="trade" src="doc/images/Trade48.png" />
            <img id="build-town-button" src="doc/images/Town48.png" />
        </div>
        <div id="build-city" class="build-button">
            <img id="city-trade1" class="trade" src="doc/images/Trade48.png" />
            <img id="city-trade2" class="trade" src="doc/images/Trade48.png" />
            <img id="city-trade3" class="trade" src="doc/images/Trade48.png" />
            <img id="city-trade4" class="trade" src="doc/images/Trade48.png" />
            <img id="city-trade5" class="trade" src="doc/images/Trade48.png" />
            <img id="build-city-button" src="doc/images/City48.png" />
        </div>
        <div id="build-road" class="build-button">
            <img id="road-trade1" class="trade" src="doc/images/Trade48.png" />
            <img id="road-trade2" class="trade" src="doc/images/Trade48.png" />
            <img id="build-road-button" src="doc/images/Road48.png" />
        </div>
        <div id="buy-development-card" class="build-button">
            <img id="buy-development-card-trade1" class="trade trade1" src="doc/images/Trade48.png" />
            <img id="buy-development-card-trade2" class="trade trade2" src="doc/images/Trade48.png" />
            <img id="buy-development-card-trade3" class="trade trade3" src="doc/images/Trade48.png" />
            <img id="buy-development-card-button" src="doc/images/BuyDevelopmentCard48.png" />
        </div>
        <div id="play-developmentCard" class="build-button">
            <img src="doc/images/PlayDevelopmentCard48.png" />
        </div>
        <div id="trade-player" class="build-button">
            <img src="doc/images/TradePlayer48.png" />
        </div>
        <div id="trade-bank" class="build-button">
            <img src="doc/images/TradeBank48.png" />
        </div>
        <div id="end-turn" class="build-button">
            <img src="doc/images/EndTurn48.png" />
        </div>
        <dice-view id="dice-view" class="build-button" v-bind:dice="dice"></dice-view>

    </div>
</template>

<script>
    import DiceView from "./DiceView.vue";
    import {Dice} from "../src/dice.js";

    export default {
        components: {
            DiceView
        },
        name: 'build-actions',
        data() {
            return {
                dice: new Dice()
            }
        }
    }
</script>

<style scoped>
#build-actions {
    display: flex;
    flex-direction: row;
    vertical-align: baseline;
    height: 64px;
}
.build-button { 
    margin: 0.25em;
    align-self: end;
}
.build-button:hover {
    filter: drop-shadow(0px 0px 12px #fff);
}
#end-turn {
    float: right;
}
.trade {
    width: 24px;
    height: 24px;
}
#build-city {
    flex: 0 0 auto;
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

#build-town {
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: 24px 24px;
    grid-template-rows: 24px 24px 48px;
}
    #build-town-button {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 3;
        grid-row-end: 3;
        width: 48px;
        height: 48px;
    }
    #town-trade1 {
        grid-column-start: 1;
        grid-row-start: 2;
    }
    #town-trade2 {
        grid-column-start: 2;
        grid-row-start: 2;
    }
    #town-trade3 {
        grid-column-start: 1;
        grid-row-start: 1;
    }
    #town-trade4 {
        grid-column-start: 2;
        grid-row-start: 1;
    }
#build-road {
    flex: 0 0 auto;
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
#buy-development-card {
    flex: 0 0 auto;
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
    flex: 0 0 auto;
}
#trade-player {
    flex: 0 0 auto;
}
#trade-bank {
    flex: 0 0 auto;
}
#end-turn {
    flex: 0 0 auto;
}
#dice-view {
    flex: 1 1 auto;
    align-self: bottom;
}
</style>