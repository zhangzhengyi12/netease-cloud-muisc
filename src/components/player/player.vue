<template>

  <div class="player">
    <div class="mini-player">
      <div class="album-pic" v-if="currentSong" @click="toggleMainPlayer">
        <img v-if="currentSong" :src="[this.isRadio ? this.currentSong.coverUrl : this.currentSong.album.blurPicUrl]" alt="" class="pic">
        <div class="open" v-if="currentSong">
          <img :src="[disMainPlayer ? IMG_CLOSED : IMG_OPEN ]" alt="">
        </div>
      </div>
      <!-- 没有歌曲播放 -->
      <div class="place" v-if="!currentSong">
        <i class="icon i_cd"></i>
      </div>
      <div class="control">
        <div class="button prev" @click="togglePrev" v-if="!isRec">
          <img :src="IMG_PREV" class="icon">
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
          <div class="name" v-if="currentSong">
            {{currentSong.name}}
            <span class="artitis">- {{caluArtists(currentSong.artists)}}</span>
          </div>
          <div class="time" v-if="currentSong">
            <span class="curr-time">{{caluTime(currentTime,false)}}</span> /
            <span class="all-time">{{caluTime(currentSong.duration)}}</span>
          </div>
        </div>
        <progress-bar :loading='songLoading' :percent="caluPercent()" class="progress" @percentChange="changePercent"></progress-bar>
      </div>
      <div class="tail" :class="{fm:isRec}">
        <div class="collect" @click="addCollect">
          <img :src="[currentSongCollected ? IMG_COLLECT_Y : IMG_COLLECT_N]" alt="">
        </div>
        <div class="mode" @click="toggleMode" v-if="!isRec">
          <img :src="caluPlayModeCls" alt="">
        </div>
        <div class="sound">
          <img :src="IMG_SOUND" alt="" @click="toggleVolume">
          <transition name="fade">
            <div class="voice" v-if="disVolume" @click.stop>
              <span>音量</span>
              <progress-bar :instant="true" class="v-progress" @percentChange="volumeSet" :percent="volume"></progress-bar>
            </div>
          </transition>
        </div>
        <div class="list" v-if="!isRec">
          <img :src="IMG_LIST" alt="" @click="togglePlaylist">
          <transition name="fade">
            <playlist v-show="disPlaylist" @close="disPlaylist = false" class="playlist"></playlist>
          </transition>
        </div>
        <div class="del" v-if="isRec" @click="trash">
          <img :src="IMG_CLEAR" alt="">
        </div>
      </div>
    </div>
    <audio @ended="playEnd" :src="songUrl" @canplay="ready" ref="audio" @error.stop="onError" @timeupdate="updateTime"></audio>
    <transition name="amp">
      <main-player ref='main' @like="addCollect" @next="toggleNext" @trash="trash" :liked="currentSongCollected" v-if="currentSong" class="main" @close="toggleMainPlayer" v-show="disMainPlayer"></main-player>
    </transition>
  </div>

</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation, Action } from 'vuex-class'
import { timeAndArtisitMixin } from '@/mixins/mixins'
import { Watch } from 'vue-property-decorator'
import ProgressBar from 'base/progress-bar/progress-bar.vue'
import { getUserPlaylist } from 'api/option-bar.ts'
import { addCollectToPlayList, getSongUrl, getRecFm, like, fmTrash } from 'api/player.ts'
import Playlist from 'components/play-list/play-list.vue'
import MainPlayer from 'components/main-player/main-player.vue'
import { playerMixin } from '@/mixins/mixins.ts'
import { currentSong } from '../../store/getter'
const playMode: {
  [prop: string]: number
} = {
  sequence: 0,
  loop: 1,
  random: 2
}
const PlayModeNameMap: {
  [p: string]: any
} = {
  0: '列表播放',
  1: '单曲循环',
  2: '随机播放'
}

interface seek {
  $refs: {
    mainPlayer: {
      setSeek: (seek: number) => void
    }
  }
}

const DEF_VOLUM = 0.5

interface playlistData {
  body: {
    playlist: Array<any>
  }
}
@Component({
  name: 'player',
  mixins: [timeAndArtisitMixin, playerMixin],
  components: {
    ProgressBar,
    Playlist,
    MainPlayer
  }
})
export default class App extends Vue {
  @Getter('currentSong') currentSong: any
  @Getter('loginState') loginState: any
  @Getter('playlist') playlist: any
  @Getter('playing') playing: boolean
  @Getter('playMode') playMode: number
  @Getter('currentIndex') currentIndex: number
  @Getter('isRadio') isRadio: boolean
  @Getter('isRec') isRec: boolean
  @Mutation('SET_PLAYING_STATE') setPlayState: any
  @Mutation('SET_CURRENT_INDEX') setCurrentIndex: any
  @Mutation('SET_PLAY_MODE') setPlayMode: any
  @Action('toggleRandomPlay') toggleRandomPlay: any
  @Action('toggleSequPlay') toggleSequPlay: any
  @Action('selectPlay') selectPlay: any
  @Action('addFmPlaylist') addFm: any
  @Action('addSongToPlayHistory') addSongToPlayHistory: any
  currentTime: number = 0
  currentSongCollected = false
  modeFSM: any
  toggleLock: boolean = false
  volume: number = 0
  disVolume: boolean = false
  disPlaylist: boolean = false
  songLoading: boolean = false
  disMainPlayer: boolean = false
  songUrl: any = null
  IMG_PREV = require('@/assets/prev.svg')
  IMG_NEXT = require('@/assets/next.svg')
  IMG_PAUSE = require('@/assets/pause.svg')
  IMG_PLAY = require('@/assets/play.svg')
  IMG_COLLECT_Y = require('@/assets/collect1.svg')
  IMG_COLLECT_N = require('@/assets/collect2.svg')
  IMG_RANDOM = require('@/assets/random.svg')
  IMG_SEQUENCE = require('@/assets/sequence.svg')
  IMG_LOOP = require('@/assets/loop.svg')
  IMG_SOUND = require('@/assets/sound.svg')
  IMG_LIST = require('@/assets/list.svg')
  IMG_OPEN = require('@/assets/open.svg')
  IMG_CLOSED = require('@/assets/closed.svg')
  IMG_CLEAR = require('@/assets/clear.svg')
  mounted() {
    if (!this.currentSong) return
    this.modeFSM = this.playModeFSM(this.playMode)
    this.$nextTick(() => {
      this.volumeSet(DEF_VOLUM)
    })
    this.getUrl()
  }
  get noPlaylist() {
    return this.playlist.length === 0
  }
  get getSongURL(): string {
    if (this.isRadio) {
    }
    return `http://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`
  }
  caluPercent(): any {
    if (!this.currentSong) return 0
    const allTime = Number(this.currentSong.duration) / 1000
    return this.currentTime / allTime
  }
  ready() {
    if (!this.playing || !this.currentSong) return
    this.songLoading = false
    ;(this.$refs.audio as HTMLAudioElement).play()
    this.addSongToPlayHistory(this.currentSong)
  }
  updateTime(e: any) {
    if (this.toggleLock) return
    this.currentTime = e.target.currentTime
  }
  togglePlaying() {
    if (this.toggleLock || !this.currentSong) return
    this.setPlayState(!this.playing)
  }
  togglePrev() {
    if (this.toggleLock || !this.currentSong) return
    let i = this.currentIndex - 1
    if (i < 0) i = this.playlist.length - 1
    this.setCurrentIndex(i)
    this.setPlayState(true)
  }
  toggleNext() {
    if (this.toggleLock || !this.currentSong) return
    if (this.playMode === playMode.loop) {
      this.loop()
      return
    }
    let i = this.currentIndex + 1
    if (i > this.playlist.length - 1) i = 0
    this.setCurrentIndex(i)
    this.setPlayState(true)
    this.currentSongCollected = false
    // 如果目前为FM模式，并且已经是倒数第二首，继续加载更多的候选数据
    if (this.isRec && i === this.playlist.length - 2) {
      this.getFmData()
    }
  }
  toggleMode() {
    if (this.toggleLock || !this.currentSong) return
    let nMode = this.modeFSM.next().value
    console.log(nMode)
    if (nMode === playMode.random) {
      this.toggleRandomPlay()
    } else if (nMode === playMode.sequence) {
      this.toggleSequPlay()
    } else {
      this.setPlayMode(nMode)
    }
    this.$message(PlayModeNameMap[nMode])
  }
  toggleVolume() {
    this.disVolume = !this.disVolume
    setTimeout(() => {
      window.onclick = () => {
        this.disVolume = false
        window.onclick = () => {}
      }
    }, 10)
  }
  togglePlaylist() {
    this.disPlaylist = !this.disPlaylist
    setTimeout(() => {
      window.onclick = () => {
        this.disPlaylist = false
        window.onclick = () => {}
      }
    }, 30)
  }
  toggleMainPlayer() {
    this.disMainPlayer = !this.disMainPlayer
    if (!this.isRadio && this.disMainPlayer) {
      let main: any = this.$refs.main
      main.setSeek(this.currentTime)
    }
  }
  changePercent(p: number) {
    const currentTime = Number(p * (this.currentSong.duration / 1000))
    ;(this.$refs.audio as HTMLAudioElement).currentTime = currentTime
    if (!this.playing) {
      this.togglePlaying()
    }
    this.currentTime = currentTime
    if (!this.isRadio) {
      let main: any = this.$refs.main
      main.setSeek(currentTime)
    }
  }
  playEnd() {
    if (this.playMode === playMode.loop) {
      this.loop()
    } else {
      this.toggleNext()
    }
  }
  trash() {
    if (this.toggleLock || !this.currentSong || !this.loginState.isLogin) return
    fmTrash(this.currentSong.id).then((res: any) => {
      if (res.body.code === 200) {
        this.$message('成功置入垃圾桶')
      }
    })
    this.toggleNext()
  }
  loop() {
    // 循环播放
    ;(this.$refs.audio as HTMLAudioElement).currentTime = 0
    ;(this.$refs.audio as HTMLAudioElement).play()
  }
  reInitData() {
    this.currentTime = 0
  }
  volumeSet(v: number) {
    ;(this.$refs.audio as HTMLAudioElement).volume = v
    this.volume = v
  }

  get caluPlayModeCls(): any {
    let res = ''
    switch (this.playMode) {
      case playMode.loop:
        res = this.IMG_LOOP
        break
      case playMode.sequence:
        res = this.IMG_SEQUENCE
        break
      case playMode.random:
        res = this.IMG_RANDOM
        break
      default:
        res = this.IMG_SEQUENCE
        break
    }
    return res
  }
  *playModeFSM(Cmode: number) {
    let first,
      next = []
    for (let key of Object.keys(playMode)) {
      if (playMode[key] === Cmode) {
        first = Cmode
      } else {
        next.push(playMode[key])
      }
    }
    while (true) {
      for (let n of next) {
        yield n
      }
      yield first
    }
  }
  async addCollect() {
    if (!this.loginState.isLogin || !this.currentSong) return
    this.currentSongCollected = !this.currentSongCollected
    like(this.currentSong.id, !this.currentSongCollected).then((res: any) => {
      if (res.body.code === 200) {
      }
    })
  }
  getRadioUrl() {
    getSongUrl(this.currentSong.mainSong.id).then(
      (res: any) => {
        if ((res.body.code = 200)) {
          this.songUrl = res.body.data[0].url
        }
      },
      (err: any) => {}
    )
  }
  getUrl() {
    if (this.isRadio) {
      this.getRadioUrl()
    } else {
      this.songUrl = `http://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`
    }
  }
  getFmData() {
    getRecFm().then((res: any) => {
      if (res.body.code === 200 && res.body.data.length !== 0) {
        this.addFm({ list: res.body.data })
      }
    })
  }
  onError() {
    this.$message('抱歉，这首歌暂时无法播放，播放下一首')
    this.toggleNext()
  }
  @Watch('playing')
  onPlayingChange(newPlaying: boolean) {
    this.toggleLock = true
    const audio = this.$refs.audio as HTMLAudioElement
    this.$nextTick(() => {
      this.toggleLock = false
      newPlaying ? audio.play() && this.addSongToPlayHistory(this.currentSong) : audio.pause()
    })
  }
  @Watch('currentSong')
  onCurrengSongChange(newS: any, oS: any) {
    // 用户刚清空播放列表 || 用户在FM模式，避免修改播放列表导致的重设initBug
    if (!newS || (oS && newS.id === oS.id && this.isRec)) return
    if (!newS.id) {
      this.toggleNext()
    }
    // 如果之前的currentsong不存在，也就是索引为-1
    if (!oS || newS.id !== oS.id) {
      this.songLoading = true
      this.getUrl()
      this.reInitData()
    }
  }
  @Watch('isRec')
  onFmModeChange(isRec: boolean) {
    if (isRec) {
      this.disMainPlayer = true
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.mini-player
  height 60px
  position fixed
  width 100%
  bottom 0
  z-index 999
  display flex
  align-items center
  background #fff
  commonBorder()
  .place
    height 60px
    flex-grow 0
    height 60px
    display flex
    align-items center
    justify-content center
    width 60px
    background rgb(224, 224, 224)
    .icon
      color #fff
      font-size 2.5rem
  .album-pic
    flex-grow 0
    height 60px
    display flex
    align-items center
    width 60px
    flex-shrink 0
    overflow hidden
    position relative
    cursor pointer
    img
      width 100%
      commonBorder()
      transition filter 0.1s
    &:hover
      .pic
        filter brightness(60%)
      .open
        position absolute
        margin-top 0.2rem
        img
          width 100%
  .control
    display flex
    margin-left 0.5rem
    flex-grow 0
    .button
      text-align center
      display flex
      justify-content center
      align-items center
      border none
      margin-left 0.5rem
      cursor pointer
      & > .icon
        width 2rem
        filter brightness(112%)
      &.play
        .icon
          width 2.3rem
  .body
    display flex
    flex-grow 10
    width 3rem
    flex-shrink 0
    align-items cente
    padding 0 0.7rem
    flex-direction column
    justify-content center
    transition display 0.3s
    @media (max-width: 500px)
      display none
    .progress
      margin-top 0.6rem
    .message
      display flex
      width 100%
      justify-content space-between
      align-items center
      .name
        font-size 0.6rem
        flex-shrink 0
        color rgb(100, 100, 100)
        display inline-block
        text-overflow ellipsis
        width 70%
        padding 1px
        text-align left
        overflow hidden
        white-space nowrap
        display flex
        align-items center
        .artitis
          color $color-font-grey-artisit
          display inline-block
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
      .time
        width 4rem
        font-size 0.5rem
        flex-shrink 0
        .curr-time
          color rgb(100, 100, 100)
        .all-time
          color $color-font-grey-artisit
  .tail
    width 12rem
    margin 0 auto
    display flex
    flex-direction row
    flex-grow 1e -13
    flex-shrink 0
    justify-content center
    align-items center
    &.fm
      width 9rem
    & > div
      width 25%
      & > img
        width 1rem
        cursor pointer
    .sound
      .voice
        position absolute
        height 2rem
        width 12rem
        commonBorder()
        top -2.5rem
        padding 0 0.5rem
        background #fff
        display flex
        margin-top 0
        font-size 0.6rem
        align-items center
        margin-left -8rem
        color rgb(100, 100, 100)
        > span
          width 2rem
          margin-right 0.5rem
    .list
      .playlist
        position absolute
        bottom 3rem
        right 0.5rem
.main
  position fixed
  width 100%
  // height 100px
  bottom 60px
  background #ccc
  top 1.8rem
  z-index 998
.amp-enter, .amp-leave-to
  transform scale(0.3) translate3d(-100vw, 300vh, 500px)
  opacity 0
.amp-enter-active, .amp-leave-active
  transition all 0.3s
// 动画
.fade-enter, .fade-leave-to
  opacity 0
  transform translateY(20px)
.fade-enter-active, .fade-leave-active
  transition all 0.3s
</style>
