<template>
    <ul id="perform-action">
        <li>
            <ul>
                <li>
                    <img src="doc/images/Town48.png" style="height:24px; width: 24px;">
                    <select v-model="player">
                        <option v-for="p in game.players" v-bind:value="p" v-bind:key="p.id">{{p.user.name}}</option>
                    </select>
                    <button @click="buildTown()">build town</button>
                </li>
                <li>
                    <img src="doc/images/Road48.png" style="height:24px; width: 24px;">
                    <select v-model="player">
                        <option v-for="p in game.players" v-bind:value="p" v-bind:key="p.id">{{p.user.name}}</option>
                    </select>
                    <button @click="buildRoad()">build road</button>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    import * as bb from "../src/ui/boardBehavior.js";
    import {Receiver} from "../src/receiver.js";
    import {HostAtClient} from "../src/host.js";
    import {BuildTown} from "../src/actions/buildTown.js";
    import {BuildRoad} from "../src/actions/buildRoad.js";

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
                player: null,
            }
        },
        methods: {
            buildTown: async function() {
                const behavior = new bb.BuildTown2(this.$data.player);
                const createActionData = (player, node) => BuildTown.createData(player, node);
                this.act(behavior, createActionData);
            },
            buildRoad: function() {
                const behavior = new bb.BuildRoad2(this.$data.player);
                const createAction = (player, edge) => BuildRoad.createData(this.$data.player, edge);
                this.act(behavior, createAction);
            },
            act: async function(behavior, createAction) {
                // Set the board to the new behavior
                this.$emit('behaviorChanged', behavior);
                try {
                    // await the behavior for completion (e.g. a click on the board on some renderer)
                    const result = await behavior.promise;
                    // create some data
                    const action = createAction(this.$data.player, result);
                    // send the data
                    await this.$data.host.send(action);
                } catch (error) {
                    // add it to game errors?
                    alert(error.message);
                } finally {
                    this.$emit('behaviorChanged', new bb.NoBehavior());
                }
            }
        },
        mounted: function() {
            const receiver = new Receiver();
            const game = this.$props.game;
            receiver.game = game;
            this.$data.host = new HostAtClient(receiver, game);
            this.$data.receiver = receiver;
        }
    }
</script>

<style scoped>

</style>