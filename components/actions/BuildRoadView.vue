<template>
    <div id="build-road-view">
        <img src="doc/images/Road48.png">
        <span>{{buildRoad.player.user.name}} built a road at {{buildRoad.edge.toString()}}</span>
    </div>
</template>

<script>
    export default {
        name: 'build-road-view',
        props: {
            buildRoad: {
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