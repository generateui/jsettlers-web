<template>
    <ol id="action-log">
        <li v-for="action in actions" :key="action.id">
            <div id="build-city-view" class="item-wrapper" v-if="action instanceof BuildCity">
                <img src="doc/images/City48.png">
                <span>{{action.player.user.name}} built a city at {{action.node.toString()}}</span>
            </div>

            <div id="build-road-view" class="item-wrapper" v-if="action instanceof BuildRoad">
                <img src="doc/images/Road48.png">
                <span>{{action.player.user.name}} built a road at {{action.edge.toString()}}</span>
            </div>
            
            <div id="build-town-view" class="item-wrapper" v-if="action instanceof BuildTown">
                <img src="doc/images/Town48.png">
                <span>{{action.player.user.name}} built a town at {{action.node.toString()}}</span>
            </div>
            
            <div id="buy-development-card-view" class="item-wrapper" v-if="action instanceof MoveRobber">
                <img src="doc/images/MoveRobber48.png">
                <span>{{action.player.user.name}} moved the robber to {{action.coord.toString()}}</span>
            </div>
            
            <div id="play-development-card-view" class="item-wrapper" v-if="action instanceof PlayDevelopmentCard">
                <img src="doc/images/PlayDevelopmentCard48.png">
                <span>{{action.player.user.name}} played a {{action.developmentCard.name}}</span>
            </div>

            <div id="roll-dice-view" class="item-wrapper" v-if="action instanceof RollDice">
                <img src="doc/images/RollDice48.png">
                <span>{{action.player.user.name}} rolled a {{action.dice.total}}</span>
            </div>

            <div id="buy-development-card-view" class="item-wrapper" v-if="action instanceof BuyDevelopmentCard">
                <img src="doc/images/BuyDevelopmentCard48.png">
                <span>{{action.player.user.name}} bought a development card</span>
            </div>
            
            <div id="rob-player-view" class="item-wrapper" v-if="action instanceof RobPlayer">
                <img src="doc/images/RobPlayer48.png">
                <span>{{action.player.user.name}} robbed {{action.opponent.user.name}} and stole a {{action.resourceType}}</span>
            </div>
            
            <div id="loose-resources-view" class="item-wrapper" v-if="action instanceof LooseResources">
                <img src="doc/images/LooseResources48.png">
                <span>{{action.player.user.name}} lost</span>
            </div>
            
            <div id="trade-player-view" class="item-wrapper" v-if="action instanceof TradePlayer">
                <img src="doc/images/TradePlayer48.png">
                <span>{{action.player.user.name}} trades $offered for $wanted</span>
            </div>
            
            <div id="trade-player-view" class="item-wrapper" v-if="action instanceof CounterOffer">
                <img src="doc/images/CounterOffer48.png">
                <span>{{action.player.user.name}} counter-offers $offered for $wanted</span>
            </div>
            
            <div id="trade-player-view" class="item-wrapper" v-if="action instanceof AcceptOffer">
                <img src="doc/images/AcceptOffer48.png">
                <span>{{action.player.user.name}} accepted</span>
            </div>
            
            <div id="trade-player-view" class="item-wrapper" v-if="action instanceof RejectOffer">
                <img src="doc/images/RejectOffer48.png">
                <span>{{action.player.user.name}} rejected</span>
            </div>
            
            <div id="trade-player-view" class="item-wrapper" v-if="action instanceof OfferTrade">
                <img src="doc/images/OfferTrade48.png">
                <span>{{action.player.user.name}} offered $offered for $wanted</span>
            </div>
            
            <div id="trade-bank-view" class="item-wrapper" v-if="action instanceof TradeBank">
                <img src="doc/images/TradeBank48.png">
                <span>{{action.player.user.name}} banked $offered for $wanted</span>
            </div>
            
        </li>
    </ol>
</template>

<script>
    export default {
        name: 'action-log',
        props: {
            actions: {
                type: Array
            }
        },
    }
</script>

<style scoped>
ol {
    color: white;
}
li {
    list-style: none;
}
.item-wrapper {
    display: table;
}
.item-wrapper span {
    display: table-cell;
    vertical-align: middle;
    padding-left: 0.25em;
}
img {
    height: 24px;
}
</style>