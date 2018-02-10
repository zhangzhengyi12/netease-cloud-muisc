<template>
  <span class="button" @click="$emit('click')">
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
  border 1px solid rgb(160,160,160)
  background-color rgba(240,240,240,.5)
  display flex
  align-items center
  cursor pointer
  color #333
  &:hover
    color #000
  i
    font-size .8rem
    margin-right .3rem
    color #666
  .text
    font-size .6rem

</style>
