<template>
    <ol id="action-log">
        <li v-for="action in actions" :key="action.id">
            <!-- <build-town-view v-if="action instanceof BuildTown" v-bind:buildTown="action"></build-town-view> -->
            <build-road-view v-if="action instanceof BuildRoad" v-bind:buildRoad="action"></build-road-view>
            <build-city-view v-if="action instanceof BuildCity" v-bind:buildCity="action"></build-city-view>
        </li>
    </ol>
</template>

<script>
    import BuildTownView from "./actions/BuildTownView.vue";
    import BuildRoadView from "./actions/BuildRoadView.vue";
    import BuildCityView from "./actions/BuildCityView.vue";

    export default {
        name: 'action-log',
        components: {BuildTownView, BuildRoadView, BuildCityView},
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
</style>