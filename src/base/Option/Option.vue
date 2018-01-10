<template>
<div class="item"  :class="{mini : isMini, new : isNew, active: isActive}">
<i :class="iconCls" class="icon"></i>
<span v-show="!mini">{{name}}</span>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'option',
  props: {
    name: {
      type: String,
      default: ''
    },
    iconCls: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isMini: {
      type: Boolean,
      default: false
    },
    isNew: {
      type: Boolean,
      default: false
    }
  }
})
export default class App extends Vue {}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'

.item
  font-size .8rem
  color $color-font-black
  padding .5rem 0
  cursor pointer
  &:hover
    background-color $color-bar-pick
  .icon 
    font-size 1rem
    margin 0 .5rem
</style>
