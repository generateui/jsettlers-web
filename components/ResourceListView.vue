<template>
    <div id="resource-list" :style="{ 'min-width': `${width + ((resourceList.length - 1) * overlappingWidth)}px`}">
        <template v-for="resourceType in resourceList.types">
            <div class="resource-wrapper" 
                v-for="resource in resourceList.of(resourceType)" 
                :style="{width: `${overlappingWidth}px`}"
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
                width: this.size * 0.65,
                overlappingWidth: this.size / 3,
            }
        },
    }
</script>

<style scoped>
#resource-list {
    display: flex;
}
.resources {
    display: flex;
}
.resource {
    height: 48px;
}
.resource-wrapper {
    flex: 1 1 0;
}
</style>