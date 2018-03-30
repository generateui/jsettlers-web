<template>
  <ul class="toggle-button">
    <li v-for="(pt, key) in portTypes" v-bind:key="key">
        <input type="radio" :id="`port-${pt}`" name="portTypePicker">
        <label :for="`port-${pt}`" @click="click(pt)">
            <img :src="'doc/images/' + key.toLowerCase() + 'port.png'">
            {{key.toLowerCase()}}
        </label>
    </li>
  </ul>
</template>

<script>
var proto = require("../../src/generated/data_pb");

export default {
  name: 'port-type-picker',
  data () {
    return {
      portTypes: proto.PortType,
      portType: proto.PortType[0]
    }
  },
  methods: {
      click(portType) {
          this.portType = portType;
          this.$emit('portTypeChanged', portType);
      }
  }
}
</script>

<style scoped>
</style>