<template>
  <ul>
    <li v-for="(ct, key) in chitTypes" v-bind:key="key">
        <input type="radio" v-bind:id="ct" name="chitTypePicker">
        <label 
            :for="ct" 
            v-on:click="click(ct)">
            <img v-bind:src="'doc/images/' + key.toLowerCase() + '.png'">
            {{key}}
        </label>
    </li>
  </ul>
</template>

<script>
var proto = require("../data_pb");

export default {
  name: 'chit-type-picker',
  data () {
    return {
      chitTypes: proto.ChitType,
      chitType: proto.ChitType[0],
    }
  },
  methods: {
      click(chitType) {
        console.log(chitType);
          this.$data.chitType = chitType;
          this.$emit('chitTypeChanged', chitType);
      }
  }
}
</script>

<style scoped>

</style>