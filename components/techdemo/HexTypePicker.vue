<template>
  <ul class="toggle-button">
    <li v-for="(ht, key) in hexTypes" v-bind:key="key">
        <input type="radio" :id="`hexType-${ht}`" name="hexTypePicker">
        <label 
            :for="`hexType-${ht}`"
            @click="click(ht)">
            <img :src="`doc/images/${key.toLowerCase()}24.png`">
            {{key}}
        </label>
    </li>
  </ul>
</template>

<script>
import { jsettlers as pb } from "../../src/generated/data";

export default {
    name: 'hex-type-picker',
    data () {
        return {
            hexTypes: pb.HexType,
            hexType: pb.HexType[0],
        }
    },
    methods: {
        click(hexType) {
            this.hexType = hexType;
            this.$emit('hexTypeChanged', hexType);
        }
    }
}
</script>

<style scoped>
img {
  height: 21px;
  width: 24px;
}
</style>