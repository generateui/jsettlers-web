<template>
    <vue-markdown id="attribution">
# Attribution

Many people directly or indirectly helped making jsettlers-web.

### Jason Fugate

Creator of [Sea3D](https://github.com/saladyears/Sea3D).

* Interface was inspired from
* Hexagon tiles were extracted, slightly changed and used
* Many of the sounds are used

### Heah Po Lin

### Sergey Krivoy
Road icon used in the RoadBuilding development card. [Link](https://thenounproject.com/search/?q=road&i=4918).

    </vue-markdown>
</template>

<script>
    import VueMarkdown from 'vue-markdown';

    export default {
        name: 'attribution',
        components: {VueMarkdown},
        data() {
            return {
                source: "/test.md"
            }
        }
    }
</script>

<style scoped>
#attribution {
    margin-left: 2em;
}
</style>