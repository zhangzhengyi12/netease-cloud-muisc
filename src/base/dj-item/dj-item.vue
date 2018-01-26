<template>

<div class="dj">
  <img :src="this.data.picUrl" :alt="this.data.name"/>
  <div class="content">
    <span class="name">{{this.data.name}}</span>
    <span class="radio" v-if="this.data.program.radio.name">{{ this.data.program.radio.name }}</span>
  </div>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

interface data {
  name: string
  picUrl: string
  program: {
    radio: {
      name: string
    }
  }
}
@Component({
  name: 'dj-item'
})
export default class App extends Vue {
  @Prop() data: data
  @Prop() index: number
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
.dj
  display flex
  align-items center
  margin-top .5rem
  cursor pointer
  img
    width 20%
    border 1px solid rgba(200,200,200,.5)
    transition filter .5s
    &:hover
      filter: brightness(120%)
  .content
    display flex
    flex-direction column
    height 100%
    justify-content space-around
    width 60%
    margin-left  .6rem
    text-align left 
    .name
      font-size .8rem
      display inline-block
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      color $color-font-black-h2
    .radio
      font-size .8rem
      display inline-block
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      font-size .7rem
      color $color-font-grey-title
</style>
