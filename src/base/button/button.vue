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

<style lang='stylus' scoped>

.button
  padding .3rem .5rem
  border 1px solid rgb(190,190,190)
  background-color rgba(240,240,240,.5)
  display flex
  align-items center
  cursor pointer
  i
    font-size .8rem
    margin-right .3rem
  .text
    font-size .6rem

</style>
