<template>
    <div id="show-hex-info">
        <span class="coord-3d">Coord3D:</span>
        <span v-if="hex !== null" class="coord-3d">{{hex.coord.toString()}}</span>
    </div>
</template>

<script>
    export default {
        name: 'welcome',
        props: {
            hex: {
                type: Object
            }
        }
    }
</script>

<style scoped>
#show-hex-info {
    margin: 1em;
}
.coord-3d {
    font-size: 24px;
}
</style>