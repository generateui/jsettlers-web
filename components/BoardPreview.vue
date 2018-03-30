<template>
    <div id="board-previewer-wrapper">
        <div id="board-info">
            <h2>{{board.name}} <span>by henk</span></h2>
            <div id="mode">
                <span>Mode:</span>
                <input type="radio" id="design" name="mode" value="design">
                <label for="design" @click="setModeToDesign()">design</label>

                <input type="radio" id="for-play" name="mode" value="for play">
                <label for="for-play" @click="setModeToPlay()">for play</label>
                <button :disabled="!isModePlay()" @click="generate()">Generate</button>
            </div>
        </div>
        <div id="bp-board-renderer"></div>
    </div>
</template>

<script>
    import {Standard4pDesign, Board} from "../src/board.js";
    import {BoardRenderer} from "../src/ui/webgl/boardRenderer.js";
    
    var boardRenderer = null;
    var createdBoard = null;
    const MODE = {
        design: 0,
        play: 1
    };

    export default {
        name: 'board-preview',
        props: {
            board: {
                type: Object
            }
        },
        data() {
            return {
                mode: MODE.design
            }
        },
        mounted: function() {
            const id = this.$props.board.id;
            createdBoard = Board.create(id);
            var brEl = document.getElementById("bp-board-renderer");
            boardRenderer = new BoardRenderer(brEl, createdBoard);
        },
        unmount() {
            boardRenderer.dispose();
        },
        watch: { 
            board: function(newBoardDescriptor, oldBoardDescriptor) {
                const id = this.$props.board.id;
                createdBoard = Board.create(newBoardDescriptor.id);
                boardRenderer.setBoard(createdBoard);
            }
        },
        methods: {
            setModeToPlay: function() {
                this.mode = MODE.play;
                // TODO: swicth mode on board
            },
            setModeToDesign: function() {
                this.mode = MODE.design;
                // TODO: swicth mode on board
            },
            isModePlay() {
                return this.mode === MODE.play;
            },
            generate() {
                createdBoard.generateBoardForPlay();
            }
        }
    }
</script>

<style scoped>
#mode {
    display: inline-block;
}
label {
    display: inline;
    cursor: pointer;
}
h2 {
    margin: 0;
    padding: 0.25em;
}
h2 > span {
    font-size: 75%;
    padding-left: 1em;
}
#board-previewer-wrapper {
    width: 40em;
    height: 100%;
}
#bp-board-renderer {
    /* width: 400px; */
    /* height: 400px; */
    width: 100%;
    height: 100%;
}
#board-info {
    background-color: white;
    float:left;
    position: absolute;
    border: solid white 1px;
    padding: 1em;
    margin: 1em;
    width: 30em;
    display:inline-block;
}
input[type='radio']:checked+label {
    border: 2px solid black;
    background-color: #C4C4C4;
}
input[type='radio'] {
}
</style>