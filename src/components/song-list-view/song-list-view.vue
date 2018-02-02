<template>

<div class="list-view">
      <div class="top-bar">
      <div class="play-all" @click="playAll">
        <i class="i_play icon"></i>
        <span class="text">播放全部({{tracks.length}})</span>
      </div>
    </div>
  <song-view class="track"
  v-for="(track,index) of tracks" 
  :key="index" 
  :index="index"
  :track="track"
  @click="togglePlay"></song-view>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import SongView from 'base/song-view/song-view.vue'
import { Action, Mutation, Getter } from 'vuex-class'

const playMode: {
  [prop: string]: number
} = {
  sequence: 0,
  loop: 1,
  random: 2
}

@Component({
  name: 'songListView',
  components: {
    SongView
  }
})
export default class App extends Vue {
  @Prop() tracks: tracks
  @Action('selectPlay') selectPlay: any
  @Action('randomPlay') randomPlay: any
  @Getter('playMode') playMode: any
  @Mutation('SET_PLAY_TYPE') setType: any
  togglePlay(index: number): void {
    this.selectPlay({ list: this.tracks, index })
    this.setType(false)
  }
  playAll() {
    console.log(this.playMode);
    if (this.playMode === playMode.random) {
      this.randomPlay({ list: this.tracks })
    } else {
      this.selectPlay({ list: this.tracks, index: 0 })
    }
  }
}
</script>

<style lang='stylus' scoped>

@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'

.list-view
  margin-top 1rem
  padding-bottom 3rem
  .track
    cursor pointer
    &:nth-child(odd)
      background-color rgb(244,244,244)
    &:hover
      background-color rgb(244,244,244)
.top-bar
      display flex
      margin .7rem 0
      .play-all
        display flex
        align-items center
        cursor pointer
        margin-left 1rem
        & > *
          margin-right .3rem
        .icon
          display inline-block
          color $color-theme-red
          font-size .3rem
          width .8rem
          height .8rem
          border-radius 50%
          border 1px solid $color-theme-red
          line-height .8rem
        .text
          font-size .8rem
</style>
