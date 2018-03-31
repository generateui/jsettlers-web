<template>
    <div id="wrapper">
        <div class="column" v-for="resourceType in game.bank.resources.types" v-if="!isUnknown(key)" :key="key">
            <img :src="`doc/images/${resourceType.toPascalCase()}Card.png`" />
            <div>{{game.bank.resources.of(resourceType).length}}</div>
        </div>
        <div class="column">
            <img src="doc/images/DevelopmentCard.png" />
            <div>{{game.bank.developmentCards.length}}</div>
        </div>
        <div v-if="update"></div>
    </div>
</template>

<script>
    var proto = require("../src/generated/data_pb");
    export default {
        name: 'bank-view',
        props: {
            game: {
                type: Object
            },
        },
        data() {
            return {
                update: false
            }
        },
        methods: {
            isUnknown: function(resourceType) {
                return proto.ResourceType[resourceType] === proto.ResourceType.UNKNOWN;
            }
        },
        mounted() {
            this.removeActionAddedHandler = this.game.actions.added((action) => {
                this.update = !this.update;
            });
        },
        unmount() {
            this.removeActionAddedHandler();
        }
    }
</script>

<style scoped>
#wrapper {
    display: inline-flex;
}
.column {
    margin: 0.25em;
}
.column img {
    height: 50px;
    width: 31px;
}
.column div {
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    display: block;
}
</style>