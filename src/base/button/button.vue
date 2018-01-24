<template>
  <span class="button">
    <i :class="iconCls"></i>
    <span class="text">{{text}}</span>
  </span>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component({
  name: 'buttom'
})
export default class App extends Vue {
  @Prop() text: string
  @Prop() iconCls: string
}
</script>

<style lang='stylus'>

.button
  padding .1rem .5rem
  border 1px solid #ccc
  background #fff
  i
    font-size .8rem
  .text
    font-size .6rem

</style>
