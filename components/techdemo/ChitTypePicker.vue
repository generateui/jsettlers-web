<template>
  <ul class="toggle-button">
    <li v-for="(ct, key) in chitTypes" :key="key">
        <input type="radio" :id="ct" name="chitTypePicker">
        <label 
            :for="ct" 
            @click="click(ct)">
            <img :src="`doc/images/${key.toLowerCase()}.png`">
            {{key}}
        </label>
    </li>
  </ul>
</template>

<script>
var proto = require("../../src/generated/data_pb");

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
          this.chitType = chitType;
          this.$emit('chitTypeChanged', chitType);
      }
  }
}
</script>

<style scoped>

</style>