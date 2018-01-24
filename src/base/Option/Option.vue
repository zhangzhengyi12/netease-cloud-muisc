<template>
  <div class="item" :class="{mini : isMini, new : isNew, active: isActive}" @click="onClick">
    <click-anima ref="scaleTarget">
      <i :class="iconCls" class="icon"></i>
      <span v-show="!isMini" class="name">{{nameZh}}</span>
    </click-anima>
  </div>

</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ClickAnima from 'base/click-anima/click-anima.vue'
@Component({
  name: 'option-item',
  props: {
    name: {
      type: String,
      default: ''
    },
    nameZh: {
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
    },
    id: {
      type: Number,
      default: 0
    }
  },
  components:{
    ClickAnima
  }
})
export default class App extends Vue {
  @Prop() name: string
  id: number
  onClick(e: any) {
    const item = {
      name: this.name,
      id: this.id
    }
    this.$emit('click', item)
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
.item
  font-size 0.75rem
  color $color-font-black
  padding 0.55rem 0
  cursor pointer
  .name
    display inline-block
    max-width 60%
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
  &:hover
    background-color $color-bar-pick
  &.active
    border-left 2px solid $color-theme-red
    background $color-bar-pick
    width calc(100% - 2px)
    background-origin border-box
    .icon
      margin-left calc(0.5rem - 2px)
  .scale
    display flex
    transition scale 0.2s
    align-items center
  .icon
    font-size 1rem
    margin 0 0.5rem
</style>
