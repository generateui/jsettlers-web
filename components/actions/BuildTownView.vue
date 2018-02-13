<template>
    <div id="build-town-view">
        <img src="doc/images/Town48.png">
        <span>{{buildTown.player.user.name}} built a town at {{buildTown.node.toString()}}</span>
    </div>
</template>

<script>
    export default {
        name: 'build-town-view',
        props: {
            buildTown: {
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