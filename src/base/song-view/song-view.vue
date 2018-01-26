<template>
<div class="song-view" @click="$emit('click',index)">
  <div class="header">
    <span class="index">{{ index < 10 ? `0${index}` : index}}</span>
    <i class="i_not_collection"></i>
    <span class="name">
      {{ track.name }}
      <span class="alias" v-if="track.alias[0]">({{track.alias[0]}})</span>
      </span>
    <i class="i_video mv" v-if="track.mvid !== 0"></i>
  </div>
  <div class="body">
    <span class="artists">{{caluArtists(track.artists)}}</span>
  </div>
  <div class="tail">
    <span class="album">{{track.album.name}}</span>
    <div class="tail-bar">
    <span class="time">{{caluTime(track.duration)}}</span>
    <span class="sq" v-if="track.fee">
      <span class="text">SQ</span>
      </span>
    </div>
  </div>
</div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { timeAndArtisitMixin } from '@/mixins/mixins'
import ClickAnima from 'base/click-anima/click-anima.vue'
interface art {
  name: string
  id: number
}
interface album {
  name: string
  id: number
}
interface track {
  name: string
  id: number
  duration: number
  artists: Array<art>
  mvid: number
}

@Component({
  name: 'songView',
  mixins: [timeAndArtisitMixin],
  components: {
    ClickAnima
  }
})
export default class App extends Vue {
  @Prop() track: track
  @Prop() index: number
}
</script>

<style lang='stylus'>

@import '~common/css/variable.styl'

.song-view
  display flex
  align-items center
  width 100%
  height 2.1rem
  font-size .73rem
  font-weight 100
  .header
    width 38%
    display flex
    justify-content flex-start
    color $color-font-black-name
    padding-right 2%
    & > *
      margin-left 1rem
    .index
      color $color-font-black
      font-size .7rem
    .mv
      color $color-theme-red
      font-weight 800
      margin-left .2rem
    .name
      display inline-block
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      padding .1rem 0
      text-align left
      .alias
        color $color-font-grey-artisit
  .body
    width 20%
    text-align left 
    .artists
      max-width 70%
      display inline-block
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      padding .1rem 0
      font-size .68rem
      color $color-font-grey-artisit
      &:hover
        color $color-font-grey-title
  .tail
    width 40%
    display flex 
    justify-content flex-start
    align-items center
    .tail-bar
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      width 50%
      min-width 6rem
      margin-left 10%
      .sq
        width 45%
        display flex
        justify-content flex-end
        align-items center
        .text
          color rgb(254,103,46)
          font-size .4rem
          font-weight 600
          padding  0 .1rem
          border 1px solid rgb(250,160,120)
          margin-right .7rem
      .time
        width 55%
        color $color-font-grey-artisit
        text-align right
        font-size .68rem
        &:hover
           color $color-font-grey-title
    .album
      width 50%
      text-align left 
      display inline-block
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      padding .1rem 0
      font-size .68rem
      color $color-font-grey-artisit
      &:hover
        color $color-font-grey-title

</style>
