<template>

<div class="tip-title">
  <div class="content">
  <i :class="iconCls" class="icon"></i>
  <span class="title">{{title}}</span>
  </div>
  <span class="more">更多 ></span>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component({
  name: 'App'
})
export default class App extends Vue {
  @Prop() iconCls: string
  @Prop() title: string
}
</script>

<style lang='stylus'>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'

.tip-title
  width 100%
  border-bottom 1px solid rgba(200,200,200,.5)
  padding-bottom .5rem
  margin-top 1.2rem
  display flex
  flex-direction row
  justify-content space-between
  font-size .8rem
  color $color-font-black-h2
  .icon
    color $color-theme-red
    font-size 1rem
  .more
    color $color-font-grey-title
    font-size .65rem
    &:hover
      color #ccc

</style>
