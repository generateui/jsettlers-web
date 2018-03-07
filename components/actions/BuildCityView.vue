<template>
    <div id="build-city-view">
        <img src="doc/images/City48.png">
        <span>{{buildCity.player.user.name}} built a city at {{buildCity.edge.toString()}}</span>
    </div>
</template>

<script>
    export default {
        name: 'build-city-view',
        props: {
            buildCity: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    img {
        height: 16px;
        width: 16px;
    }
</style>