<template>
    <div id="player-assets">
        <div id="resources">
            <div id="resourceType" v-for="(resources, key) in player.resources" :key="key">
                <img v-for="resource in resources"  :src="`doc/images/${resource.name}Card.png`" />
            </div>
        </div>
        <div id="developmentCards">
            <img v-for="developmentCard in player.developmentCards" 
                :src="`doc/images/${developmentCard.name}.png`" />
        </div>
        <div id="victoryPoints"></div>
        <div id="ports"></div>
    </div>
</template>

<script>
    export default {
        name: 'player-assets',
        props: {
            player: {
                type: Object
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