<template>
    <div id="message">
        <span id="you-message">{{game.expectation.youMessage}}</span>
        <span id="opponents-message">{{game.expectation.opponentsMessage}}</span>
    </div>
</template>

<script>
    export default {
        name: 'actions-message',
        props: {
            game: {
                type: Object
            }
        },
    }
</script>

<style scoped>
#message {
    color: white;
    font-size: 16px;
    margin: 0.25em;
    padding-left: 0.5em;
}
#you-message {
    font-weight: bold;
    font-size: 125%;
}
#opponents-message {
    color: #aaaaaa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>