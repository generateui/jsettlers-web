<template id="modal-template">
    <div class="modal-mask">
        <div class="modal-container">

            <div class="modal-body">
                <div id="discard-message">
                    Select <span id="loose-count">{{game.player.resources.halfCount}}</span> resources to discard.
                </div>
                <div id="selected-message">
                    You have selected {{selectedResources.length}} resources.
                </div>
                <button id="button" @click="looseResources" :disabled="notEnoughSelected">
                    Done!
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    import { LooseResources } from '../src/actions/looseResources';
    import { ResourceList } from '../src/resource';

    export default {
        name: 'loose-resources-dialog',
        props: {
            game: {
                type: Object
            },
            selectedResources: {
                type: Array
            },
        },
        methods: {
          looseResources() {
              const resources = new ResourceList(this.selectedResources);
              const looseResources = new LooseResources({
                  player: this.game.player,
                  resources: resources
              });
              this.$emit("looseResources", looseResources);
          }
        },
        computed: {
            notEnoughSelected() {
              return this.selectedResources.length !== this.game.player.resources.halfCount;
            }
        }
    }
</script>

<style scoped>
#button {
    height: 3em;
    width: 100%;
    font-size: 20px;
    grid-column-start: 2;
    grid-row-start: 1;
    grid-row-end: 3;
}
#discard-message {
    grid-row-start: 1;
    grid-column-start: 1;
}
#selected-message {
    grid-row-start: 2;
    grid-column-start: 1;
}
#loose-count {
    font-size: 125%;
    font-weight: bold;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    pointer-events: none;
    align-items: center;
    justify-content: center;
}
.modal-container {
    display: table-cell;
    vertical-align: middle;
    height: 100px;
    /* margin: 0px auto; */
    pointer-events: all;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.modal-body {
    margin: 20px 0;
    display: grid;
    grid-template-columns: 16em 10em;
    grid-template-rows: 2em 2em;
}

</style>