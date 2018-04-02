<template>
    <ol id="action-log" reversed>
        <li v-for="action in actions" :key="action.id">
            <div id="build-city-view" class="item-wrapper" v-if="action instanceof BuildCity">
                <img :src="`doc/images/City${action.player.color.name}48.png`">
                <span>{{action.player.user.name}} built a city at {{action.node.toString()}}</span>
            </div>

            <div id="build-road-view" class="item-wrapper" v-if="action instanceof BuildRoad">
                <img :src="`doc/images/Road${action.player.color.name}48.png`">
                <span>{{action.player.user.name}} built a road at {{action.edge.toString()}}</span>
            </div>
            
            <div id="build-town-view" class="item-wrapper" v-if="action instanceof BuildTown">
                <img :src="`doc/images/Town${action.player.color.name}48.png`">
                <span>{{action.player.user.name}} built a town at {{action.node.toString()}}</span>
            </div>
            
            <div id="buy-development-card-view" class="item-wrapper" v-if="action instanceof MoveRobber">
                <img src="doc/images/MoveRobber48.png">
                <span>{{action.player.user.name}} moved the robber to {{action.coord.toString()}}</span>
            </div>
            
            <div id="play-development-card-view" class="item-wrapper" v-if="action instanceof PlayDevelopmentCard">
                <div class="development-card" v-if="action.developmentCard instanceof YearOfPlenty">
                    <img src="doc/images/PlayDevelopmentCard48.png">
                    <span>{{action.player.user.name}} played a </span>
                    <img src="doc/images/YearOfPlentyLogo48.png">
                    <span>{{action.developmentCard.name}} and got</span>
                    <resource-list-view :size="24" :resources="action.developmentCard.resourceList"></resource-list-view>
                </div>
                <div class="development-card" v-if="action.developmentCard instanceof Soldier">
                    <img src="doc/images/PlayDevelopmentCard48.png">
                    <span>{{action.player.user.name}} played a </span>
                    <img src="doc/images/SoldierLogo48.png">
                    <span>{{action.developmentCard.name}}</span>
                </div>
                <div class="development-card" v-if="action.developmentCard instanceof Monopoly">
                    <img src="doc/images/PlayDevelopmentCard48.png">
                    <span>{{action.player.user.name}} played a </span>
                    <img src="doc/images/MonopolyLogo48.png">
                    <span>{{action.developmentCard.name}} and got</span>
                    <resource-list-view :size="24" :resources="action.developmentCard.stolen"></resource-list-view>
                </div>
                <div class="development-card" v-if="action.developmentCard instanceof VictoryPoint">
                    <img src="doc/images/PlayDevelopmentCard48.png">
                    <span>{{action.player.user.name}} played a </span>
                    <img src="doc/images/VictoryPointLogo48.png">
                    <span>{{action.developmentCard.name}} and gained one victory point</span>
                </div>
                <div class="development-card" v-if="action.developmentCard instanceof RoadBuilding">
                    <img src="doc/images/PlayDevelopmentCard48.png">
                    <span>{{action.player.user.name}} played a </span>
                    <img src="doc/images/RoadBuildingLogo48.png">
                    <span>{{action.developmentCard.name}} and got two free roads</span>
                </div>
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
                <span v-if="action.opponent !== null">{{action.player.user.name}} robbed {{action.opponent.user.name}} and stole a </span>
                <resource-list-view :size="24" :resources="action.resources"></resource-list-view>
                <span v-if="action.opponent === null">{{action.player.user.name}} robbed no one. How refreshing!</span>
            </div>
            
            <div id="loose-resources-view" class="item-wrapper" v-if="action instanceof LooseResources">
                <img src="doc/images/LooseResources48.png">
                <span>{{action.player.user.name}} lost</span>
                <resource-list-view :size="24" :resources="action.resources"></resource-list-view>
            </div>
            
            <div id="trade-player-view" class="item-wrapper" v-if="action instanceof TradePlayer">
                <img src="doc/images/TradePlayer48.png">
                <span>{{action.player.user.name}} trades </span>
                <resource-list-view :size="24" :resources="action.offered"></resource-list-view>
                <span>for</span>
                <resource-list-view :size="24" :resources="action.wanted"></resource-list-view>
                <span>with {{action.opponent.user.name}}</span>
            </div>
            
            <div id="trade-player-view" class="item-wrapper" v-if="action instanceof CounterOffer">
                <img src="doc/images/CounterOffer48.png">
                <span>{{action.player.user.name}} counter-offers </span>
                <resource-list-view :size="24" :resources="action.offered"></resource-list-view>
                <span>for</span>
                <resource-list-view :size="24" :resources="action.wanted"></resource-list-view>
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
                <span>{{action.player.user.name}} offered</span>
                <resource-list-view :size="24" :resources="action.offered"></resource-list-view>
                <span>for</span>
                <resource-list-view :size="24" :resources="action.wanted"></resource-list-view>
            </div>
            
            <div id="trade-bank-view" class="item-wrapper" v-if="action instanceof TradeBank">
                <img src="doc/images/TradeBank48.png">
                <span>{{action.player.user.name}} banked </span>
                <resource-list-view :size="24" :resources="action.offered"></resource-list-view>
                <span>for</span>
                <resource-list-view :size="24" :resources="action.wanted"></resource-list-view>
            </div>

            <div id="end-turn-view" class="item-wrapper" v-if="action instanceof EndTurn">
                <img src="doc/images/EndTurn48.png">
                <span>{{action.player.user.name}} ended his turn</span>
            </div>

            <div id="claim-victory-view" class="item-wrapper" v-if="action instanceof ClaimVictory">
                <img id="claim-victory-image" src="doc/images/ClaimVictory48.png">
                <span>{{action.player.user.name}} has won the game!</span>
            </div>

        </li>
    </ol>
</template>

<script>
import ResourceListView from "./ResourceListView.vue";

export default {
    name: 'action-log',
    components: { ResourceListView },
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
    display: flex;
    flex-direction: column-reverse;
}
li {
    list-style: none;
    flex: 0 0 auto;
}
.item-wrapper {
    display: table;
}
.item-wrapper span {
    display: table-cell;
    vertical-align: middle;
    padding-left: 0.25em;
}
.development-card {
    display: inline;
    align-items: center;
}
.development-card img {
    filter: invert(100%);
    margin-left: 0.25em;
    margin-right: 0.25em;
    display: inline-block;
}
img {
    height: 24px;
}
#claim-victory-image {
    filter: invert(100%);
}
</style>