<template>

<div class="player">
<div class="mini-player">
  <div class="album-pic">
    <img :src="currentSong.album.blurPicUrl" alt="">
    <div class="open"></div>
  </div>
  <div class="control">
    <div class="button prev" @click="togglePrev">
      <img :src="IMG_PREV"  class="icon">
    </div>
    <div class="button play" @click="togglePlaying">
      <img :src="[playing?IMG_PLAY:IMG_PAUSE]" alt="" class="icon">
    </div>
    <div class="button next" @click="toggleNext">
      <img :src="IMG_NEXT" alt="" class="icon">
    </div>
  </div>
  <div class="body">
    <div class="message">
      <div class="name">
      {{currentSong.name}} <span class="artitis">- {{caluArtists(currentSong.artists)}}</span>
      </div>
      <div class="time">
       <span class="curr-time">{{caluTime(currentTime,false)}}</span> / 
       <span class="all-time">{{caluTime(currentSong.duration)}}</span>
      </div>
    </div>
  </div>
  <div class="tail"></div>
</div>
 <audio :src="getSongURL" @canplay="ready" ref="audio" @error.stop="onError" @timeupdate="updateTime"></audio>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'
import { timeAndArtisitMixin } from '@/mixins/mixins'
import { Watch } from '../../../node_modules/_vue-property-decorator@6.0.0@vue-property-decorator'

@Component({
  name: 'player',
  mixins: [timeAndArtisitMixin]
})
export default class App extends Vue {
  @Getter('currentSong') currentSong: any
  @Getter('playlist') playlist: any
  @Getter('playing') playing: boolean
  @Getter('currentIndex') currentIndex: number
  @Mutation('SET_PLAYING_STATE') setPlayState: any
  @Mutation('SET_CURRENT_INDEX') setCurrentIndex: any
  currentTime = 0
  IMG_PREV = require('@/assets/prev.svg')
  IMG_NEXT = require('@/assets/next.svg')
  IMG_PAUSE = require('@/assets/pause.svg')
  IMG_PLAY = require('@/assets/play.svg')
  mounted() {}
  get noPlaylist() {
    return this.playlist.length === 0
  }
  get getSongURL(): string {
    return `http://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`
  }
  ready() {
    if (!this.playing) return
    ;(this.$refs.audio as HTMLAudioElement).play()
  }
  updateTime(e: any) {
    this.currentTime = e.target.currentTime
  }
  togglePlaying() {
    this.setPlayState(!this.playing)
  }
  togglePrev() {
    let i = this.currentIndex - 1
    if (i < 0) i = this.playlist.length - 1
    this.setCurrentIndex(i)
  }
  toggleNext() {
    let i = this.currentIndex + 1
    if (i > this.playlist.length - 1) i = 0
    this.setCurrentIndex(i)
  }
  onError() {
    this.$message('抱歉，这首歌暂时无法播放，播放下一首')
    this.toggleNext()
  }
  @Watch('playing')
  onPlayingChange(newPlaying: boolean) {
    const audio = this.$refs.audio as HTMLAudioElement
    // this.currentLyric && this.currentLyric.togglePlay() // 切换歌词
    this.$nextTick(() => {
      newPlaying ? audio.play() : audio.pause()
    })
  }
}
</script>

<style lang='stylus' scoped>

 require('@/assets/pause.svg')
 @import '~common/css/variable.styl'

.mini-player
  height 60px
  position fixed
  width 100%
  bottom 0
  z-index 999
  display flex
  align-items center
  background #fff
  .album-pic
    flex-grow  0
    height 60px
    display flex
    align-items center
    width 60px
    overflow hidden
    img
      width 100%
      border 1px solid rgb(200,200,200,.5)
  .control
    display flex
    margin-left .5rem
    flex-grow 0
    .button
      text-align center
      display flex
      justify-content center
      align-items center
      border none
      margin-left .5rem
      cursor pointer
      & > .icon
        width 2rem
        filter: brightness(112%);
      &.play
        .icon
          width 2.3rem
  .body
    display flex
    flex-grow 10
    align-items center
    padding 0 .7rem
    .message
      display flex
      width 100%
      justify-content space-between
      .name
        font-size .6rem
        color rgb(100,100,100)
        .artitis
          color $color-font-grey-artisit
      .time 
        font-size .5rem
        .curr-time
          color rgb(100,100,100)
        .all-time
          color $color-font-grey-artisit
  .tail
    width 4rem
</style>
