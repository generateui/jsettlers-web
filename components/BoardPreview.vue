<template>
    <div id="board-previewer-wrapper">
        <div id="mode">
            <input type="radio" id="design" name="mode" value="design">
            <label for="design">design</label>

            <input type="radio" id="for-play" name="mode" value="for play">
            <label for="for-play">for play</label>
        </div>
        <div id="bp-board-renderer"></div>
    </div>
</template>

<script>
    export default {
        name: 'board-preview',
        mounted: function() {
            var boardDesign = new Standard4pDesign();
            var brEl = document.getElementById("bp-board-renderer");
            window.boardRenderer = new BoardRenderer(brEl, boardDesign);
        }
    }
</script>

<style scoped>
#bp-board-renderer {
    width: 400px;
    height: 400px;
}

</style>