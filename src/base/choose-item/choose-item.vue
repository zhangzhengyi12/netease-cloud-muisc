<template>

<click-anima class="choose-item" @click="onClick" :class="{active:isActive}">
  <span class="value">{{data.value}}</span>
  <span class="hot" v-if="data.isHot">HOT</span>
  <i class="icon i_yes" v-if="isActive"></i>
</click-anima>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ClickAnima from 'base/click-anima/click-anima.vue'

interface chooseItem {
  value: string
  isHot: boolean
}

@Component({
  name:'App',
  components:{
    ClickAnima
  }
})

export default class App extends Vue{
  @Prop() data:chooseItem
  @Prop() isActive:boolean
  onClick(){
    this.$emit('select',this.data.value)
  }
}
</script>

<style lang='stylus'>

@import '~common/css/variable.styl'

.choose-item
  display flex
  align-items center
  justify-content center
  width 4.3rem
  height 1.5rem
  font-size .75rem
  color $color-font-grey-title
  border 1px solid rgba(200,200,200,.5)
  margin-right .5rem
  position relative
  margin-bottom .5rem
  cursor pointer
  &:hover
    background-color rgb(240,240,240)
  &.active
    border 1px solid $color-font-red
    background: linear-gradient(-45deg, $color-font-red 12px, #fff 0);
    .icon
      position absolute
      color #fff
      bottom 0
      right 1px
      font-size .5rem
  .hot
    font-size .4rem
    font-weight 600
    position absolute
    top 0
    right 0
    color $color-font-red
</style>