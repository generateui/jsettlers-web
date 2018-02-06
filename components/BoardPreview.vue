<template>
    <div id="board-previewer-wrapper">
        <h2>{{board.name}}</h2>
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
    import {Standard4pDesign} from "../src/board.js";
    import {BoardRenderer} from "../src/ui/webgl/boardRenderer.js";
    
    var boardRenderer = null;

    export default {
        name: 'board-preview',
        props: {
            board: {
                type: Object
            }
        },
        mounted: function() {
            var boardDesign = new Standard4pDesign();
            var brEl = document.getElementById("bp-board-renderer");
            boardRenderer = new BoardRenderer(brEl, boardDesign);
        },
        watch: { 
            board: function(newBoard, oldBoard) {
                boardRenderer.setBoard(newBoard);
            }
        }
    }
</script>

<style scoped>
#bp-board-renderer {
    width: 400px;
    height: 400px;
}

</style>