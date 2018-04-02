<template>
    <div id="wrapper">
        <div id="vertical-menu-1">
            <h2>Behaviors:</h2>
            <h3>{{pickedBehavior.constructor.name}}</h3>
            <ul class="toggle-button">
                <li v-for="behavior in behaviors" v-bind:key="behavior.constructor.name">
                    <input 
                        type="radio" 
                        name="boardbehaviorPicker" 
                        :id="`behavior-${behavior.constructor.name}`">
                    <label 
                        v-bind:for="`behavior-${behavior.constructor.name}`"
                        v-on:click="click(behavior)">
                        {{behavior.constructor.name}}
                    </label>
                </li>
            </ul>
        </div>
        <div id="vertical-menu-2">
            <hex-type-picker
                v-if="showHexTypePicker"
                v-on:hexTypeChanged="hexTypeChanged">
            </hex-type-picker>

            <chit-type-picker 
                v-if="pickedBehavior===setChit" 
                v-on:chitTypeChanged="chitTypeChanged">
            </chit-type-picker>

            <player-picker
                v-if="showPlayerPicker"
                v-on:playerChanged="playerChanged">
            </player-picker>

            <port-type-picker
                v-if="showPortTypePicker" 
                v-on:portTypeChanged="portTypeChanged">
            </port-type-picker>
            <show-hex-info v-if="showShowHexInfo" :hex="hex"></show-hex-info>
        </div>
        <div ref="board-renderer" id="board-renderer"></div>
    </div>
</template>

<script>
import { jsettlers as pb } from "../../src/generated/data";
import ChitTypePicker from './ChitTypePicker.vue'
import HexTypePicker from './HexTypePicker.vue'
import PlayerPicker from './PlayerPicker.vue'
import PortTypePicker from './PortTypePicker.vue'
import ShowHexInfo from './ShowHexInfo.vue'
import * as bb from "../../src/ui/boardBehavior.js";
import {Standard4pDesign, From2DBoard} from "../../src/board.js";
import {BoardRenderer} from "../../src/ui/webgl/boardRenderer.js";
import {Game} from "../../src/game.js";

const setHex = new bb.SetHex();
const setChit = new bb.SetChit();
const setPort = new bb.SetPort();
const buildTown = new bb.BuildTown();
const buildCity = new bb.BuildCity();
const buildRoad = new bb.BuildRoad();
const showHexInfo = new bb.ShowHexInfo();
var boardRenderer = null;

export default {
    name: 'tech-demo',
    components: {
        ChitTypePicker, HexTypePicker, PlayerPicker, PortTypePicker, ShowHexInfo
    },
    data() {
        return {
            setChit: setChit,
            behaviors: [
                new bb.NoBehavior(),
                new bb.EmphasizeHoveredObject(),
                setHex,
                setChit,
                new bb.CompositeBehavior(new bb.EmphasizeHoveredObject(), new bb.ShowAllEdges()),
                new bb.ShowAllNodes(),
                new bb.ShowNodesOfClickedHex(),
                new bb.ShowAllEdges(),
                new bb.ShowEdgesOfClickedHex(),
                new bb.ShowEdgesOfClickedNode(),
                setPort,
                new bb.MoveRobber(),
                buildTown,
                buildCity,
                buildRoad,
                showHexInfo,
            ],
            pickedBehavior: new bb.NoBehavior(),
            hex: null,
        }
    },
    computed: {
        showHexTypePicker() {
            return this.pickedBehavior === setHex;
        },
        showPlayerPicker() {
            const b = this.pickedBehavior;
            return b === buildRoad || b === buildTown || b === buildCity;
        },
        showPortTypePicker() {
            return this.pickedBehavior === setPort;
        },
        showShowHexInfo() {
            return this.pickedBehavior === showHexInfo;
        }
    },
    methods: {
        click(behavior) {
            this.pickedBehavior = behavior;
            boardRenderer.behavior = behavior;
        },
        chitTypeChanged(chitType) {
            setChit.chitType = chitType;
        },
        hexTypeChanged(hexType) {
            setHex.hexType = hexType;
        },
        playerChanged(player) {
            buildTown.player = player;
            buildCity.player = player;
            buildRoad.player = player;
        },
        portTypeChanged(portType) {
            setPort.portType = portType;
        }
    },
    mounted() {
        const boardDesign = new Standard4pDesign();
        // boardDesign.generateBoardForPlay();
        var brEl = this.$refs["board-renderer"];
        boardRenderer = new BoardRenderer(brEl, boardDesign, setHex);
        this.removeHexChangedHandler = showHexInfo.hexChanged((oldHex, newHex) => {
            this.hex = newHex;
        });
    },
    destroyed() {
        boardRenderer.dispose();
        this.removeHexChangedHandler();
    }
}
</script>

<style scoped>
#wrapper {
    display: grid;
    grid-template-columns: 15% 15% 70%;
    grid-template-rows: 100%;
    height: 100%;
    width: 100%;
}
#vertical-menu-1 {
    background-color: rgba(33, 150, 243, 0.75);
    grid-row-start: 1;
    grid-column-start: 1;
    padding-left: 1em;
}
#vertical-menu-2 {
    background-color: rgba(33, 150, 243, 0.5);
    grid-row-start: 1;
    grid-column-start: 2;
}
#board-renderer {
    background-color: #000;
    grid-row-start: 1;
    grid-column-start: 3;
}
</style>

<style>
.toggle-button li > input[type='radio'] {
    display: none;
}
.toggle-button li > label {
    text-align: right;
    clear: both;
    float: left;
    cursor: pointer;
    border: 2px solid transparent;
}
.toggle-button li > label > img {
    vertical-align: middle;
    margin-right: 0.5em;
}
.toggle-button li > input[type='radio']:checked+label {
    border: 2px solid black;
    background-color: #C4C4C4;
}
.toggle-button li > input[type='radio']+label:hover {
    border: 2px solid grey;
    background-color: #C4C4C4;
}
.widget-header {
    font-size: large;
    font-weight: 600;
}
.toggle-button > li {
    list-style-type:none;
    padding: 0;
}
.toggle-button > li > label > img {
    height: 24px;
    width: 24px;
}
</style>