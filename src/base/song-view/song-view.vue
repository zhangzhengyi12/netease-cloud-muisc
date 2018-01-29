<template>
<div class="song-view" @click="$emit('click',index)"  :class="{simple:isSimple,'high-light':highLight}">
  <div class="header">
    <span class="p-icon" v-if="isSimple"></span>
    <span class="index" v-if="!isSimple">{{ (index +1 < 10) ? `0${index + 1}` : index +1}}</span>
    <i class="i_not_collection collect" v-if="!isSimple"></i>
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
    <span class="album" v-if="!isSimple">{{track.album.name}}</span>
    <div class="tail-bar">
    <span class="time">{{caluTime(track.duration)}}</span>
    <span class="sq" v-if="track.fee">
      <span class="text" v-if="!isSimple">SQ</span>
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
  @Prop() type: number
  @Prop() highLight: boolean
  isSimple: boolean = false
  isHight: boolean = false
  mounted() {
    if (this.type === 1) {
      // 精简版
      this.isSimple = true
    }
  }
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
  @media (max-width 550px){
    justify-content space-between
  }
  &.simple.high-light
    .header
      color $color-font-red
      align-items center
      .p-icon
        display inline-block
        width 0
        height 0
        border-width 5px 8px 5px 8px
        border-style solid
        position absolute
        margin-left .6rem
        border-color transparent transparent transparent $color-font-red
    .body
      .artists
        color $color-font-red
    .tail
      .tail-bar
        color $color-font-red
      .time
        color $color-font-red
  .header
    width 38%
    display flex
    justify-content flex-start
    flex-grow 10
    color $color-font-black-name
    padding-right 2%
    .p-icon
      display none
    & > *
      margin-left 1rem
    .index
      color $color-font-black
      font-size .7rem
    .mv
      color $color-theme-red
      font-weight 800
      margin-left .2rem
    .collect
      @media (max-width 550px) {
        display none
      }
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
    @media (max-width 550px) {
      display none
    }
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

.simple
  display flex
  justify-content flex-start
  .header 
    width 50%
    .name
      margin-left 1.5rem
  .body
    width 20%
    flex-shrink 0
    
  .tail
    width 20%
    flex-shrink 0
    margin-right 1rem
    @media (max-width 550px) {
      display block
    }

</style>
