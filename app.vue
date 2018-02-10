<template>
    <div id="app-wrapper">
        <div id="sidedrawer" class="mui--no-user-select">
            <div id="sidedrawer-brand" class="mui--appbar-line-height">
                    <img id="side-logo" src="https://raw.githubusercontent.com/jdmonin/JSettlers2/master/doc/graf/Logo24.png">
                <span class="mui--text-title">JSettlers-web</span>
            </div>
            <div class="mui-divider"></div>
            <ul>
                <li>
                    <strong>Play</strong>
                    <ul>
                        <li>
                            <router-link to="/play-test-game">play test game</router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Edit</strong>
                    <ul>
                    </ul>
                </li>
                <li>
                    <strong>Develop</strong>
                    <ul>
                        <li>
                            <router-link to="/tech-demo">Tech demo</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div id="content-wrapper">
            <router-view></router-view>
        </div>

    </div>

</template>

<script>
    import Welcome from './components/Welcome.vue';
    import Hello from './components/Hello.vue';
    import TechDemo from './components/TechDemo.vue';
    import VueRouter from 'vue-router';

    export default {
        name: 'app',
        components: {
            Hello, TechDemo
        }
    }
</script>

<style>

    #app-wrapper {
        height: 100%;
        display: flex;
    }
    /** Layout CSS */
    #header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 2;
        transition: left 0.2s;
    }

    #sidedrawer {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 200px;
        left: -200px;
        overflow: auto;
        z-index: 2;
        background-color: #fff;
        transition: transform 0.2s;
    }
    #content-wrapper {
        min-height: 100%;
        overflow-x: hidden;
        margin-left: 0px;
        transition: margin-left 0.2s;
        display: flex;
    }

    @media (min-width: 768px) {
        #header {
            left: 200px;
        }
        #sidedrawer {
            transform: translate(200px);
        }
        #content-wrapper {
            margin-left: 200px;
            display: flex;
            flex: 1 1 auto;
            height: 100%;
            width: 100%;
        }
        #footer {
            margin-left: 200px;
        }
        body.hide-sidedrawer #header {
            left: 0;
        }
        body.hide-sidedrawer #sidedrawer {
            transform: translate(0px);
        }
        body.hide-sidedrawer #content-wrapper {
            margin-left: 0;
        }
        body.hide-sidedrawer #footer {
            margin-left: 0;
        }
    }

    /** Toggle Side drawer */
    #sidedrawer.active {
        transform: translate(200px);
    }

    /** Header CSS */
    .sidedrawer-toggle {
        color: #fff;
        cursor: pointer;
        font-size: 20px;
        line-height: 20px;
        margin-right: 10px;
    }
    .sidedrawer-toggle:hover {
        color: #fff;
        text-decoration: none;
    }

    /** Footer CSS */
    #footer {
        background-color: #0288D1;
        color: #fff;
    }
    #footer a {
        color: #fff;
        text-decoration: underline;
    }

    /**
    * Side drawer CSS
    */
    #sidedrawer-brand {
        padding-left: 20px;
    }
    #sidedrawer ul {
        list-style: none;
    }
    #sidedrawer > ul {
        padding-left: 0px;
    }
    #sidedrawer > ul > li:first-child {
        padding-top: 15px;
    }
    #sidedrawer strong {
        display: block;
        padding: 15px 22px;
        cursor: pointer;
    }
    #sidedrawer strong:hover {
        background-color: #E0E0E0;
    }
    #sidedrawer strong + ul > li {
        padding: 6px 0px;
    }

    #side-logo {
        position: relative;
        top: 0.25em;
        padding-right: 0.25em;
    }
</style>