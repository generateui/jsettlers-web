<template>
    <ul id="perform-action">
        <li>
            <div>
                <span>perform action for player: </span>
                <select v-model="player">
                    <option v-for="p in game.players" v-bind:value="p" v-bind:key="p.id">{{p.user.name}}</option>
                </select>
            </div>
        </li>
        <li>
            <ul>
                <li>
                    <img src="doc/images/Town48.png" style="height:24px; width: 24px;">
                    <button @click="buildTown()">build town</button>
                </li>
                <li>
                    <img src="doc/images/Road48.png" style="height:24px; width: 24px;">
                    <button @click="buildRoad()">build road</button>
                </li>
                <li>
                    <img src="doc/images/City48.png" style="height:24px; width: 24px;">
                    <button @click="buildCity()">build city</button>
                </li>
                <li>
                    <img src="doc/images/DevelopmentCard48.png" style="height:24px; width: 24px;">
                    <button @click="buyDevelopmentCard()">buy devcard</button>
                </li>
                <li>
                    <img src="doc/images/Robber48.png" style="height:24px; width: 24px;">
                    <button @click="moveRobber()">move robber</button>
                </li>
                <li>
                    <img src="doc/images/RobPlayer48.png" style="height:24px; width: 24px;">
                    <select multiple v-model="opponents">
                        <option v-for="p in game.players" v-bind:value="p" v-bind:key="p.id">{{p.user.name}}</option>
                    </select>
                    <button @click="robPlayer()">rob player</button>
                </li>
                <li>
                    <img src="doc/images/RollDice48.png" style="height:24px; width: 24px;">
                    <span>roll dice</span>
                    <span class="dice-number" @click="rollDice(2)">2</span>
                    <span class="dice-number" @click="rollDice(3)">3</span>
                    <span class="dice-number" @click="rollDice(4)">4</span>
                    <span class="dice-number" @click="rollDice(5)">5</span>
                    <span class="dice-number" @click="rollDice(6)">6</span>
                    <span class="dice-number" @click="rollDice(7)">7</span>
                    <span class="dice-number" @click="rollDice(8)">8</span>
                    <span class="dice-number" @click="rollDice(9)">9</span>
                    <span class="dice-number" @click="rollDice(10)">10</span>
                    <span class="dice-number" @click="rollDice(11)">11</span>
                    <span class="dice-number" @click="rollDice(12)">12</span>
                </li>
                <li>
                    <input type="checkbox" id="check-auto-respond" v-bind:checked="autoRespond">
                    <label for="check-auto-respond">respond to trade offers randomly</label>
                </li>
                <li>
                    <monopoly-dialog v-if="show" v-on:close="closeMonopolyDialog"></monopoly-dialog>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    import * as bb from "../../src/ui/boardBehavior.js";
    import * as gb from "../../src/ui/gameBehavior.js";
    import {HostAtClient} from "../../src/host.js";
    import {BuildTown} from "../../src/actions/buildTown.js";
    import {BuildRoad} from "../../src/actions/buildRoad.js";
    import {BuildCity} from "../../src/actions/buildCity.js";
    import {BuyDevelopmentCard} from "../../src/actions/buyDevelopmentCard.js";
    import {KeyListener} from "../../src/ui/keyListener.js";
    import {ClientRandom} from "../../src/random";
    import { RejectOffer } from '../../src/actions/rejectOffer';
    import { CounterOffer } from '../../src/actions/counterOffer';
    import { AcceptOffer } from '../../src/actions/acceptOffer';
    import { OfferTrade } from '../../src/actions/offerTrade';
    import { MoveRobber } from '../../src/actions/moveRobber';
    import { RobPlayer } from '../../src/actions/robPlayer';
    import { RollDice } from '../../src/actions/rollDice';

    const random = new ClientRandom();

    export default {
        name: 'debug-perform-actions',
        props: {
            game: {
                type: Object
            },
            host: {
                type: Object
            },
            keyListener: {
                type: Object
            }
        },
        data() {
            return {
                player: null,
                autoRespond: true,
                opponents: [],
            }
        },
        methods: {
            buildTown: async function() {
                const behavior = new gb.BuildTown(this.game.player, this.keyListener, true);
                const createActionData = (player, node) => BuildTown.createData(player, node);
                this.behaveThenAct(behavior, createActionData);
            },
            buildRoad: function() {
                const behavior = new gb.BuildRoad(this.game.player, this.keyListener, true);
                const createAction = (player, edge) => BuildRoad.createData(player, edge);
                this.behaveThenAct(behavior, createAction);
            },
            buildCity: function() {
                const behavior = new gb.BuildCity(this.game.player, this.keyListener, true);
                const createAction = (player, node) => BuildCity.createData(player, node);
                this.behaveThenAct(behavior, createAction);
            },
            buyDevelopmentCard: function() {
                const createAction = (player) => BuyDevelopmentCard.createData(player, null);
                this.act(createAction);
            },
            playDevelopmentCard: function() {

            },
            moveRobber: function() {
                const behavior = new gb.MoveRobber();
                const createAction = (player, coord) => MoveRobber.createData(player, coord);
                this.behaveThenAct(behavior, createAction);
            },
            robPlayer: function() {
                const behavior = new gb.PickPlayer(this.opponents);
                const createAction = (player, opponent) => RobPlayer.createData(player, opponent);
                this.behaveThenAct(behavior, createAction);
            },
            rollDice(number) {
                const createAction = (player) => RollDice.createDataDebug(player, number);
                this.act(createAction);
            },
            act: async function(createAction) {
                try {
                    const action = createAction(this.$data.player);
                    await this.$props.host.send(action);
                } catch (error) {
                    alert(error.message);
                }
            },
            behaveThenAct: async function(behavior, createAction) {
                // Set the board to the new behavior
                this.$emit('behaviorChanged', behavior);
                try {
                    // await the behavior for completion (e.g. a click on the board on some renderer)
                    const result = await behavior.promise;
                    // create some data
                    const action = createAction(this.player, result);
                    // send the data
                    await this.$props.host.send(action);
                } catch (error) {
                    // add it to game errors?
                    alert(error.message);
                } finally {
                    this.$emit('behaviorChanged', new bb.NoBehavior());
                }
            },
        },
        mounted: function() {
            const that = this;
            this.keyListener.specific("r", () => {
                that.buildRoad();
            });
            this.keyListener.specific("t", () => {
                that.buildTown();
            });
            this.game.actions.added((action) => {
                if (!this.autoRespond) {
                    return;
                }
                if (action instanceof OfferTrade) {
                    const offerTrade = action;
                    const opponents = this.game.getOpponents(offerTrade.player);
                    const responses = [];
                    for (var opponent of opponents) {
                        const i = random.intFromOne(3);
                        if (i === 1) {
                            const reason = random.intFromZero(4);
                            this.act(() => RejectOffer.createData(opponent, offerTrade, reason));
                        } else if (i === 2) {
                            this.act(() => AcceptOffer.createData(opponent, offerTrade));
                        } else if (i === 3) {
                            const offerAmount = random.intFromOne(3);
                            const wantAmount = random.intFromOne(3);
                            const offered = [];
                            const wanted = [];
                            const resources = opponent.resources.toArray();
                            for (var x = 0; x < offerAmount; x++) {
                                const randomIndex = random.intFromZero(resources.length - 1);
                                offered.push(resources[randomIndex].type);
                            }
                            for (var x = 0; x < wantAmount; x++) {
                                const randomIndex = random.intFromZero(resources.length - 1);
                                wanted.push(resources[randomIndex].type);
                            }
                            this.act(() => CounterOffer.createData(opponent, offerTrade, offered, wanted));
                        }
                    }
                }
            });
        }
    }
</script>

<style scoped>
.dice-number {
    font-weight: bolder;
    cursor: pointer;
    margin: 0.2em 0.2em 0.2em 0.2em;
}
</style>