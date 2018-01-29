<template>

<div class="private-content">
        <i :class="caluCls" class="icon"></i>
        <img :src="this.data.picUrl" :alt="this.data.name"/>
        <span class="name">{{this.data.name}}</span>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

interface data {
  type: number
  title: string
  picUrl: string
}

interface map{
  [propsName:number]:string
}

const TYPE_ICON_MAP:map = {
  19: 'i_book',
  24: 'i_camera'
}

@Component({
  name: 'private-content'
})
export default class App extends Vue {
  @Prop() index: number
  @Prop() data: data
  get caluCls(): string {
    let key = this.data.type
    return (TYPE_ICON_MAP[key] as string)
  }
}
</script>

<style lang='stylus'>
@import '~common/css/mixins.styl'
.private-content
  display flex
  flex-direction column
  overflow hidden
  width 80%
  margin 0 auto
  text-align left 
  position relative
  cursor pointer
  transition  filter .5s
  &:hover
    filter: brightness(120%);
  .icon
    position absolute
    top .2rem 
    left .2rem
    iconRadius(1.5rem)
    font-size .8rem
    text-align center
    color #fff
    commonBorder()
  .name
    font-size .8rem
    display inline-block
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
    margin .3rem 0
  img
    max-width 100%
    commomBorder()
</style>
