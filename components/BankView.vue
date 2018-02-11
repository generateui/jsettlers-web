<template>
    <div id="wrapper">
        <div class="column" v-for="(resources, key) in bank.resources" v-if="!isUnknown(key)" :key="key">
            <img :src="`doc/images/${key.toPascalCase()}Card.png`" />
            <div>{{resources.length}}</div>
        </div>
        <div class="column">
            <img src="doc/images/DevelopmentCard.png" />
            <div>{{bank.developmentCards.length}}</div>
        </div>
    </div>
</template>

<script>
    var proto = require("../data_pb");
    export default {
        name: 'bank-view',
        props: {
            bank: {
                type: Object
            }
        },
        methods: {
            isUnknown: function(resourceType) {
                return proto.ResourceType[resourceType] === proto.ResourceType.UNKNOWN;
            }
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