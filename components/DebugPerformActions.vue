<template>
    <ul id="perform-action">
        <li>
            <ul>
                <li>
                    <img src="doc/images/Town48.png" style="height:24px; width: 24px;">
                    <select v-model="selectedPlayer">
                        <option v-for="player in game.players" v-bind:value="player" v-bind:key="player.id">{{player.user.name}}</option>
                    </select>
                    <button @click="buildTown()">build town</button>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    var proto = require("../data_pb");
    import * as bb from "../src/ui/boardBehavior.js";
    import {Receiver} from "../src/receiver.js";
    import {HostAtClient} from "../src/host.js";

    export default {
        name: 'debug-perform-actions',
        props: {
            game: {
                type: Object
            }
        },
        data() {
            return {
                receiver: null,
                host: null,
                selectedPlayer: null,
            }
        },
        methods: {
            buildTown: function() {
                const player = this.$data.selectedPlayer;
                const clicked = function(node) {
                    var actionIds = new proto.ActionIds();
                    actionIds.setPlayerid(this.$data.selectedPlayer.id);
                    var action = new proto.GameAction();
                    var bt = new proto.BuildTown();
                    bt.setNode(node.data);
                    bt.setActionids(actionIds);
                    action.setBuildtown(bt);
                    this.$data.host.send(action);
                    const noBehavior = new bb.NoBehavior();
                    this.$emit('behaviorChanged', noBehavior);
                }.bind(this);
                const behavior = new bb.BuildTown2(player, clicked);
                this.$emit('behaviorChanged', behavior);
                // set behavior
                // register clicked node
                // unset behavior
                // fire action
            }
        },
        mounted: function() {
            const receiver = new Receiver();
            receiver.game = this.$props.game;
            this.$data.host = new HostAtClient(receiver);
            this.$data.receiver = receiver;
        }
    }
</script>

<style scoped>

</style>