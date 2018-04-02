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
                <li data-keytip="ctrl + t">
                    <img src="doc/images/Town48.png" style="height:24px; width: 24px;">
                    <button @click="buildTown()">build town</button>
                </li>
                <li>
                    <img src="doc/images/Road48.png" style="height:24px; width: 24px;">
                    <button @click="buildRoad()">build road</button>
                </li>
                <li>
                    <img src="doc/images/City48.png" style="height:24px; width: 24px;">
                    <button @click="buildCity()"  data-keytip="c">build city</button>
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
                <li>
                    <span>have opponent offer trade</span>
                    <button @click="offerSomething()">opponent offer</button>
                </li>
                <li>
                    <span>set player on turn</span>
                    <select v-model="playerOnTurn">
                        <option v-for="p in game.players" v-bind:value="p" v-bind:key="p.id">{{p.user.name}}</option>
                    </select>
                    <button @click="setPlayerOnTurn(p)">set</button>
                </li>
                <li>
                    <span>set game phase</span>
                    <select v-model="phase">
                        <option v-for="phase in game.phases" v-bind:value="phase">{{phase.name}}</option>
                    </select>
                    <button @click="setGamePhase()">set</button>
                </li>
                <li>
                    <span>start game</span>
                    <button @click="startGame()">start</button>
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
import { StartGame } from '../../src/actions/startGame';

const random = new ClientRandom();
const timer = ms => new Promise(result => setTimeout(result, ms));

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
            playerOnTurn: null,
            phase: null,
        }
    },
    methods: {
        buildTown() {
            const nodes = this.game.phase.townPossibilities(this.game, this.player);
            const behavior = new gb.PickTownNode(nodes, this.keyListener, true);
            const createAction = (player, node) => 
                new BuildTown({ player : player, node: node });
            this.behaveThenAct(behavior, createAction);
        },
        buildRoad() {
            const edges = this.game.phase.roadPossibilities(this.game, this.game.player);
            const behavior = new gb.PickRoadEdge(this.game.player, this.keyListener, true);
            const createAction = (player, edge) => 
                new BuildRoad({ player: player, edge: edge });
            this.behaveThenAct(behavior, createAction);
        },
        buildCity() {
            const behavior = new gb.PickTownForCity(this.game.player, this.keyListener, true);
            const createAction = (player, node) => new BuildCity({ player: player, node: node });
            this.behaveThenAct(behavior, createAction);
        },
        buyDevelopmentCard() {
            const createAction = (player) => new BuyDevelopmentCard({ player: player });
            this.act(createAction);
        },
        moveRobber() {
            const behavior = new gb.MoveRobber();
            const createAction = (player, coord) =>
                new MoveRobber({ player: player, coord: coord });
            this.behaveThenAct(behavior, createAction);
        },
        robPlayer() {
            const behavior = new gb.PickPlayer(this.opponents);
            const createAction = (player, opponent) => 
                new RobPlayer({ player: player, opponent: opponent });
            this.behaveThenAct(behavior, createAction);
        },
        rollDice(number) {
            const createAction = (player) => RollDice.createDataDebug(player, number);
            this.act(createAction);
        },
        setPlayerOnTurn() {
            this.game.playerOnTurn = this.playerOnTurn;
        },
        setGamePhase(phase) {
            this.game.phase = this.phase;
        },
        startGame() {
            const createAction = (player) => new StartGame({ player: player });
            this.act(createAction);
        },
        act: async function(createAction) {
            try {
                const action = createAction(this.player);
                await this.host.send(action);
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
                await this.host.send(action);
            } catch (error) {
                // add it to game errors?
                alert(error.message);
            } finally {
                this.$emit('behaviorChanged', new bb.NoBehavior());
            }
        },
        offerSomething() {
            const opponents = game.getOpponents(game.player);
            const i = random.intFromZero(opponents.length - 1);
            const opponent = opponents[i];
            const resources = opponent.resources.toArray();
            const randomIndex = random.intFromZero(resources.length - 1);
            const offered = [resources[randomIndex].type];
            const createAction = (player) =>
                new OfferTrade({
                    player: opponent,
                    offered: offered,
                    wanted: offered
                });
            this.act(createAction);
        }
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
                opponents.remove(this.game.player);
                const responses = [];
                for (var opponent of opponents) {
                    const i = random.intFromOne(3);
                    if (i === 1) {
                        const reason = random.intFromZero(4);
                        this.act(() => new RejectOffer({
                            player: opponent,
                            tradeOffer: offerTrade,
                            reason: reason
                        }));
                    } else if (i === 2) {
                        this.act(() => new AcceptOffer({
                            player: opponent, tradeOffer: offerTrade
                        }));
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
                        this.act(() => new CounterOffer({
                            player: opponent,
                            tradeOffer: offerTrade,
                            offered: offered,
                            wanted: wanted
                        }));
                    }
                }
            }
        });
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}
li {
    margin-bottom: 0.5em;
}
.dice-number {
    font-weight: bolder;
    cursor: pointer;
    margin: 0.2em 0.2em 0.2em 0.2em;
}
</style>