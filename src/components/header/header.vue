<template>

  <div class="header">
    <i class="i_return return" @click="$emit('back')"></i>
    网易云音乐
  </div>

</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'App'
})
export default class App extends Vue {}
</script>

<style lang='stylus' scoped >
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.header
  background $color-theme-red
  position relative
  mx-height-line(1.8rem)
  z-index 10000
  color #fff
  font-size 0.7rem
  .return
    position absolute
    left 0
    padding 0 1rem
    cursor pointer
    &:hover
      background rgb(232, 16, 35)
</style>
