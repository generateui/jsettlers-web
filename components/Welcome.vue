<template>
    <div id="welcome">
        <div class="hero">
            <img src="doc/images/favicon/Logo.svg" />
            <span>JSettle.rs</span>
        </div>
        <h1>jsettlers-web</h1>
        An html5 implementation of a game to build roads, towns and cities using resources. 
        <h2>Implementation</h2>
        <p>Currently, the game is not yet finished. We're working to release a version sometime! When, I hear you ask? The answer is: when it is ready. </p>

        <p>To try out the current state of development, click around on the links on the left menu.</p>
        
    </div>
</template>

<script>
    export default {
        name: 'welcome'
    }
</script>

<style scoped>
.hero {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: flex-start;
}
.hero img {
    /* filter: drop-shadow(0px 0px 12px #fff); */
    filter: invert(100%);
}
.hero span {
    align-self: center;
    font-family: "Nanum Pen Script";
    font-size: 108px;
    text-shadow:
        -4px -4px 16px rgba(33, 150, 243, 0.75),
        4px -4px 16px rgba(33, 150, 243, 0.75),
        -4px 4px 16px rgba(33, 150, 243, 0.75),
        4px 4px 16px rgba(33, 150, 243, 0.75);  
    margin-left: 0.5em;
    font-weight: bold;
} 
#welcome {
    background-color: black;
    color: white;
    width: 100%;
    padding: 2em;
}
h1, h2, h3 {
    font-family: "Nanum Pen Script";
    font-weight: bold;
}
</style>