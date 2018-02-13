<template>
    <div id="wrapper">
        <div id="background-wrapper"  v-bind:style="{ borderColor: player.color.css, backgroundColor: player.color.toCssRgba(0.25) }">
            <div id="player-name">{{player.user.name}}</div>
            <div id="towns" class="stock-info">
                <img src="doc/images/Town48.png" />
                <span>{{player.stock.towns}}</span>
            </div>
            <div id="cities" class="stock-info">
                <img src="doc/images/City48.png" />
                <span>{{player.stock.cities}}</span>
            </div>
            <div id="roads" class="stock-info">
                <img src="doc/images/Road48.png" />
                <span>{{player.stock.roads}}</span>
            </div>
            <div id="developmentCards" class="stock-info">
                <img src="doc/images/DevelopmentCard48.png" />
                <span>{{player.developmentCards.length}}</span>
            </div>
            <div id="victoryPoints" class="stock-info">
                <img src="doc/images/VictoryPoint48.png" />
                <span>{{player.victoryPoints.length}}</span>
            </div>
            <div id="resources">
                <!-- TODO: diff opponent & playing player -->
                <div v-for="resource in player.resources">
                    <img src="doc/images/BlankResourceCard48.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'player-info',
        props: {
            player: {
                type: Object
            }
        }
    }
</script>

<style scoped>
.stock-info > img {
    /* font-size: 10px; */
    width: 2em;
    height: 2em;
}
.stock-info span {
    vertical-align: super;
}

#wrapper {
    height: 100px;
    padding: 0;
    background-color: white;
}
#background-wrapper {
    height: 100%;
    width: 100%;
    border: 4px solid;
    padding: 4px;
    /* padding: 0.25em; */
    display: grid;
    grid-template-columns: auto 4em 4em;
    grid-template-rows: 33% 33% 33%;
    box-sizing: border-box;
}
#player-name {
    font-size: 16px;
    font-weight: bold;
}
#towns {
    grid-column-start: 2;
    grid-row-start: 1;
}
#roads {
    grid-column-start: 2;
    grid-row-start: 2;
}
#cities {
    grid-column-start: 2;
    grid-row-start: 3;
}
#developmentCards {
    grid-column-start: 3;
    grid-row-start: 1;
}
#resources {
    grid-column-start: 1;
    grid-row-start: 2;
    grid-row-end: 3;
    display: inline-flex;
    padding-left: 3em;
}
#resources :nth-child(4n)  {
    margin-right: 1em;
}
#resources img {
    margin-left: -3em;
    width: 4em;
    height: 4em;
}
#victoryPoints {
    grid-column-start: 3;
    grid-row-start: 3;
}
</style>