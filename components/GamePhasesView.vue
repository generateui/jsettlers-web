<template>
    <div id="game-phases">
        <div id="wrapper">
            <div v-for="phase in game.phases">
                <div v-if="phase instanceof InitialPlacement" v-bind:class="{ selected: game.phase === phase }">
                    <img src="doc/images/InitialPlacement48.png" />
                </div>
                <div v-if="phase instanceof PlayTurns" v-bind:class="{ selected: game.phase === phase }">
                    <img src="doc/images/PlayTurns48.png" />
                </div>
                <div v-if="phase instanceof Finished" v-bind:class="{ selected: game.phase === phase }">
                    <img src="doc/images/Finished48.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'game-phases-view',
        props: {
            game: {
                type: Object
            }
        }
    }
</script>

<style scoped>
#wrapper {
    display: inline-flex;
}
img {
    border: 2px solid black;
    border-radius: 8px;
    margin-left: 0.25em;
    margin-right: 0.25em;
}
.selected {
    border: 2px solid white;
    border-radius: 8px;
}
</style>