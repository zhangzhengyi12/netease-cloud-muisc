<template>
  <div class="item" :class="{mini : isMini, new : isNew, active: isActive}" @click="onClick">
    <span ref="scaleTarget" class="scale">
      <i :class="iconCls" class="icon"></i>
      <span v-show="!isMini" class="name">{{nameZh}}</span>
    </span>
  </div>

</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
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
  }
})
export default class App extends Vue {
  scaleAnima(): void {
    // console.log(this.$refs.scaleTarget as HTMLElement)
    ;(this.$refs.scaleTarget as HTMLElement).style.transform = `scale(.95,.95)`
    setTimeout(() => {
      ;(this.$refs.scaleTarget as HTMLElement).style.transform = ``
    }, 200)
  }
  @Prop() name: string
  id: number
  onClick(e: any) {
    this.scaleAnima()
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
