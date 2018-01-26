<template>
  <div class="songlist" @click="$emit('click')">
      <div class="content">
        <div class="count" v-if="this.data.playCount"><i :class="[this.countIcon ? this.countIcon : 'i_music_40']" style="margin-right:3px;"></i>{{ caluCount }}</div>
        <img v-lazy="this.data.picUrl" :alt="this.data.name" ref="img"/>
        <span class="name" v-if="this.data.name">{{this.data.name}}</span>
        <span class="avatar" v-if="this.data.artistName">{{ this.data.artistName }}</span>
      </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
interface Data {
  name: string
  countIcon?: string
  picUrl: string
  artistName?: string
  playCount?: number
}
@Component({
  name: 'music-item'
})
export default class App extends Vue {
  @Prop() index: number
  @Prop() data: Data
  @Prop() countIcon: string
  get caluCount(): string {
    if (!this.data.playCount) {
      return ''
    }
    let result = ''
    if (this.data.playCount < 10000) {
      return String(this.data.playCount)
    }
    result = `${Math.floor(this.data.playCount / 10000)}万`
    return result
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
.songlist
  margin-top 1.5rem
  transition  filter .5s
  cursor pointer
  &:hover
    filter: brightness(120%);
  .count
    position absolute
    top 0
    right 0
    color #FFF
    font-size .6rem
    background linear-gradient( left ,transparent,rgba(100,100,100,.5))
    padding .2rem
  .content
    display flex
    flex-direction column
    overflow hidden
    width 88%
    margin 0 auto
    text-align left 
    position relative
    .name
      font-size .8rem
      display inline-block
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      margin .3rem 0
    .avatar
      font-size .6rem
      display inline-block
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      color $color-font-grey-title
    img
      max-width 100%
      border 1px solid rgba(200,200,200,.5)
</style>
