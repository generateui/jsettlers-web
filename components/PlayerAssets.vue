<template>
    <div id="player-assets">
        <monopoly-dialog v-if="showMonopolyDialog" v-on:close="closeMonopolyDialog"></monopoly-dialog>
        <year-of-plenty-dialog v-if="showYearOfPlentyDialog" v-on:close="closeYearOfPlentyDialog"></year-of-plenty-dialog>
        <div id="resources">
            <div id="resourceType" v-for="(resources, key) in player.resources" :key="key">
                <img v-for="resource in resources"  :src="`doc/images/${resource.name}Card.png`" />
            </div>
        </div>
        <div id="developmentCards">
            <img v-for="developmentCard in player.developmentCards" 
                :src="`doc/images/${developmentCard.name}.png`"
                @dblclick="playDevelopmentCard(developmentCard)" />
        </div>
        <div id="victoryPoints"></div>
        <div id="ports"></div>
    </div>
</template>

<script>
    import MonopolyDialog from './MonopolyDialog.vue';
    import YearOfPlentyDialog from './YearOfPlentyDialog.vue';
    import { Monopoly } from '../src/developmentCard.js';

    export default {
        name: 'player-assets',
        components: {MonopolyDialog, YearOfPlentyDialog},
        props: {
            player: {
                type: Object
            },
            host: {
                type: Object
            }
        },
        data() {
            return {
                showMonopolyDialog: false,
                showYearOfPlentyDialog: false,
            }
        },
        methods: {
            playDevelopmentCard(developmentCard) {
                const typeName = developmentCard.constructor.name;
                if (typeName === "Monopoly") {
                    this.$data.showMonopolyDialog = true;
                } else if (typeName === "YearOfPlenty") {
                    this.$data.showYearOfPlentyDialog = true;
                }
            },
            closeMonopolyDialog() {
                this.$data.showMonopolyDialog = false;
            },
            closeYearOfPlentyDialog() {
                this.$data.showYearOfPlentyDialog = false;
            }
        }
    }
</script>

<style scoped>
#player-assets {
    display: inline-flex;
    background-color: black;
    padding-left: 67px;
}
#resources {

}
#resourceType {
    padding-left: 100px;
    display: inline-flex;
}
#resourceType img {
    margin-left: -96px;
    height: 101px;
    width: 63px;
}
#developmentCards {
    /* margin-left: 37px; */
    right: 0;
    margin: 0;
    padding: 0;
    height: 101px;
    position: absolute;
}
    #developmentCards img {
        /* margin-left: -90px; */
        height: 101px;
        width: 63px;
    }
    #developmentCards img:hover {
        transform: translate(0, -1em);
    }
</style>