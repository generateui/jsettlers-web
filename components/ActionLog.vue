<template>
    <ol id="action-log">
        <li v-for="action in actions">
            <build-town-view v-if="action.constructor.name === 'BuildTown'" v-bind:buildTown="action"></build-town-view>
        </li>
    </ol>
</template>

<script>
    import BuildTownView from "./actions/BuildTownView.vue";

    import BuildTown from "../src/actions/buildTown.js";

    export default {
        name: 'action-log',
        components: {BuildTownView},
        props: {
            actions: {
                type: Array
            }
        },
        methods: {
            isBuildTown: function(action) {
                return typeof(action) === BuildTown;
            }
        }
    }
</script>

<style scoped>
ol {
    color: white;
}
</style>