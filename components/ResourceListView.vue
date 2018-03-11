<template>
    <div id="resource-list">
        <template v-for="resourceType in resourceList.types">
            <div class="resource-wrapper" 
                v-for="resource in resourceList.of(resourceType)" 
                :key="resource.id">
                <img :src="`doc/images/${resource.name}Card.png`" 
                    :style="{height: `${size}px`}" />
            </div>
        </template>
    </div>
</template>

<script>
    import { ResourceList } from "../src/resource.js";

    export default {
        name: 'resource-list-view',
        props: {
            resources: {
                type: Object
            },
            size: {
                type: Number
            }
        },
        data() {
            return {
                resourceList: new ResourceList(this.resources),
            }
        }
    }
</script>

<style scoped>
#resource-list {
    display: flex;
    min-width: 48px;
}
.resources {
    display: flex;
}
.resource {
    height: 48px;
}
.resource-wrapper {
    width: 12px;
    flex: 1 1 0;
}
</style>