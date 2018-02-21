<template>

  <div class="list-view">
    <div class="top-bar">
      <div class="play-all" @click="playAll">
        <i class="i_play icon"></i>
        <span class="text">播放全部({{tracks.length}})</span>
      </div>
      <div class="clear" @click="$emit('clear')" v-if="clear">
        <img :src="IMG_CLEAR" alt="">
        <span class="text">清除全部</span>
      </div>
    </div>
    <song-view class="track" @selectAlbum="toggleAlbum" @selectSinger="toggleSinger" v-for="(track,index) of tracks" :key="index" :index="index" :track="track" @click="togglePlay"></song-view>
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
  @Prop() clear: boolean
  @Action('selectPlay') selectPlay: any
  @Action('randomPlay') randomPlay: any
  @Getter('playMode') playMode: any
  @Mutation('SET_PLAY_TYPE') setType: any
  IMG_CLEAR = require('@/assets/clear.svg')
  togglePlay(index: number): void {
    this.selectPlay({ list: this.tracks, index })
    this.setType(false)
  }
  playAll() {
    if (this.playMode === playMode.random) {
      this.randomPlay({ list: this.tracks })
    } else {
      this.selectPlay({ list: this.tracks, index: 0 })
    }
  }
  toggleAlbum(id: number) {
    let sid = id.toString()
    this.$router.push({ name: 'albumDetail', params: { id: sid } })
  }
  toggleSinger(id: number) {
    if (id === 0) {
      this.$message('抱歉，暂时没有收录这位歌手')
      return
    }
    let sid = id.toString()
    this.$router.push({ name: 'singerDetail', params: { id: sid } })
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.list-view
  margin-top 1rem
  padding-bottom 3rem
  position relative
  .track
    cursor pointer
    background-color transparent
    &:nth-child(odd)
      background-color rgb(244, 244, 244)
    &:hover
      background-color rgb(244, 244, 244)
.top-bar
  display flex
  margin 0.7rem 0
  position relative
  background-color transparent
  .play-all
    display flex
    align-items center
    cursor pointer
    margin-left 1rem
    & > *
      margin-right 0.3rem
    .icon
      display inline-block
      color $color-theme-red
      font-size 0.3rem
      width 0.8rem
      height 0.8rem
      border-radius 50%
      border 1px solid $color-theme-red
      line-height 0.8rem
    .text
      font-size 0.8rem
  .clear
    display flex
    align-items center
    cursor pointer
    margin-left 1rem
    border-left 1px solid $color-border-grey
    padding-left 1rem
    img
      width 1rem
      margin-right .5rem
    .text
      font-size 0.8rem
</style>
