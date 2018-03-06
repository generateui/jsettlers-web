<template>
    <svg width="48px" height="48px" id="dices" viewBox="0 0 38 38">
        <g>
            <rect fill="white" stroke="black" stroke-width="4" x="3" y="3" width="32" height="32" rx="8" ry="8"></rect>
            <circle v-if="showLeftTop()" fill="Black" stroke="black" stroke-width="1" r="2" cx="11" cy="12" ></circle>
            <circle v-if="showLeftCenter()" fill="Black" stroke="black" stroke-width="1" r="2" cx="11" cy="19"></circle>
            <circle v-if="showLeftBottom()" fill="Black" stroke="black" stroke-width="1" r="2" cx="11" cy="26"></circle>
            <circle v-if="showRightTop()" fill="Black" stroke="black" stroke-width="1" r="2" cx="27" cy="12"></circle>
            <circle v-if="showRightCenter()" fill="Black" stroke="black" stroke-width="1" r="2" cx="27" cy="19"></circle>
            <circle v-if="showRightBottom()" fill="Black" stroke="black" stroke-width="1" r="2" cx="27" cy="26"></circle>
            <circle v-if="showCenter()" fill="Black" stroke="black" stroke-width="1" r="2" cx="19" cy="19"></circle>
        </g>
    </svg>
</template>

<script>
    export default {
        name: 'die-view',
        props: {
            die: {
                type: Number
            }
        },
        methods: {
            showLeftTop: function() {
                const n = this.die;
                return n === 2 || n === 3 || n === 4 || n === 5 || n === 6;
            },
            showLeftCenter: function() {
                const n = this.die;
                return n === 6;
            },
            showLeftBottom: function() {
                const n = this.die;
                return n === 4 || n === 5 || n === 6;
            },
            showCenter: function() {
                const n = this.die;
                return n === 1 || n === 3 || n === 5;
            },
            showRightTop: function() {
                const n = this.die;
                return n === 4 || n === 5 || n === 6;
            },
            showRightCenter: function() {
                const n = this.die;
                return n === 6;
            },
            showRightBottom: function() {
                const n = this.die;
                return n === 2 || n === 3 || n === 4 || n === 5 || n === 6;
            },
        }
    }
</script>

<style scoped>
</style>