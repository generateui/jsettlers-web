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
                <popper trigger="hover" :options="{placement: 'right'}">
                    <div class="popper vps">
                        <div v-for="vp in player.victoryPoints" class="vp">
                            <img  :src="`doc/images/${vp.name}48.png`" class="vp-image" />
                            <span v-if="vp.victoryPoints > 1" class="vp-count">{{vp.victoryPoints}}</span>
                        </div>
                    </div>
                    <div slot="reference">
                        <img src="doc/images/VictoryPoint48.png" class="image" />
                        <span>{{player.victoryPoints.length}}</span>
                    </div>
                </popper>
            </div>
            <div id="resources">
                <!-- TODO: diff opponent & playing player -->
                <!-- <div > -->
                    <img v-for="n in player.resources.length" src="doc/images/BlankResourceCard48.png" />
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs';
    // require('vue-popperjs/dist/css/vue-popper.css');
    
    export default {
        name: 'player-info',
        components: {Popper},
        props: {
            player: {
                type: Object
            }
        }
    }
</script>

<style scoped>
h3 {
    color: white;
}
.stock-info > img {
    /* font-size: 10px; */
    width: 2em;
    height: 2em;
}
.image {
    height: 32px;
    width: 32px;
}
.vp-image {
    width: 32px;
    height: auto;
    grid-column-start: 1;
    grid-row-start: 1;
}
.vp-count {
    background: rgba(255,255,255,0.6);
    grid-column-start: 1;
    grid-row-start: 1;
    font-size: 14px;
    font-weight: 900;
    border-radius: 50%;
    margin-top: 8px;
    margin-left: 8px;
    height: 18px;
    width: 18px;
}
.vps {
    display: inline-flex;
    background-color: black;
}
.vp {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
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