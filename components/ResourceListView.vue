<template>
    <div id="resource-list">
        <div v-for="resourceType in resources.types" :key="resourceType">
            <img src="doc/images/WheatCard.png" />
            <img v-for="resource in resources.of(resourceType)" :key="resource.id"
                :src="`doc/images/${resource.name}`" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'resource-list-view',
        props: {
            resources: {
                type: Object
            },
            size: {
                type: Number
            }
        }
    }
</script>

<style scoped>
</style>