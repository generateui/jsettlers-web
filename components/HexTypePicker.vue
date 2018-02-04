<template>
  <ul>
    <li v-for="(ht, key) in hexTypes" v-bind:key="key">
        <input type="radio" :id="`hexType-${ht}`" name="hexTypePicker">
        <label 
            :for="`hexType-${ht}`"
            v-on:click="click(ht)">
            <!-- <img v-bind:src="'doc/images/' + key.toLowerCase() + '.png'"> -->
            {{key}}
        </label>
    </li>
  </ul>
</template>

<script>
var proto = require("../data_pb");

export default {
  name: 'hex-type-picker',
  data () {
    return {
      hexTypes: proto.HexType,
      hexType: proto.HexType[0],
    }
  },
  methods: {
      click(hexType) {
          this.$data.hexType = hexType;
          this.$emit('hexTypeChanged', hexType);
      }
  }
}
</script>

<style scoped>
.active {
    background-color: blueviolet;
}
</style>