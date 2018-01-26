<template>

<div class="song-list-detail" ref="detail">
  <div class="blur" ref="blur"></div>
  <transition name="mask">
    <div class="mask-back" v-if="tryGetData"><loading class="loading"></loading></div>
  </transition>
  <div class="content" v-if="this.songlistData">
    <div class="title">歌单</div>
    <div class="song-list-message">
      <MusicItem :data="songlistDataToMusicItemAdapter(songlistData)" class="cover"></MusicItem>
      <div class="content">
        <h3 class="name">{{songlistData.name}}</h3>
        <div class="creator">
          <img :src="songlistData.creator.avatarUrl" alt="">
          <span class="creater">{{songlistData.creator.nickname}}</span>
          <span class="date">{{transTime}} 创建</span>
        </div>
        <div class="button-group">
        <my-button :text="`评论(${songlistData.commentCount})`" iconCls="i_sound"></my-button>
        </div>
      </div>
    </div>
    <div class="top-bar">
      <div class="play-all">
        <i class="i_play icon"></i>
        <span class="text">播放全部({{songlistData.trackCount}})</span>
      </div>
    </div>
    <song-list-view v-if="songlistData" :tracks="songlistData.tracks"></song-list-view>
  </div>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { getSonglistDetail } from 'api/song-list.ts'
import Loading from 'base/loading/loading.vue'
import MusicItem from 'base/music-item/music-item.vue'
import MyButton from 'base/button/button.vue'
import SongListView from 'components/song-list-view/song-list-view.vue'

interface Date {
  Format(date: any): string
}

const CODE_OK = 200
@Component({
  name: 'songlistDetail',
  components: {
    Loading,
    MusicItem,
    MyButton,
    SongListView
  }
})
export default class App extends Vue {
  @Prop() id: number
  tryGetData: boolean = true
  songlistData: null | {
    createTime: number
  } = null
  tryGetEventId: number = 0
  mounted() {
    this.getSonglistDetailData(this.id)
    // 为歌单详情组件撑起一个高度
    ;this.beforeUpdateInit()
  }
  @Watch('$route')
  onchangeRoute() {
    this.getSonglistDetailData(this.id)
    // 暂时取消掉detail组件的高度
    this.beforeUpdateInit()
  }
  getSonglistDetailData(id: number) {
    const currid = Math.random()
    this.tryGetEventId = currid
    this.tryGetData = true
    getSonglistDetail(id).then(
      (res: any) => {
        if (res.body.code === CODE_OK) {
          // 避免网络较慢而高频点击出现的回溯现象
          if (currid !== this.tryGetEventId) return
          const backUrl: string = res.body.result.coverImgUrl
          this.songlistData = res.body.result
          this.afterUpdateReset(backUrl)
        }
      },
      (err: any) => {
        this.$message('获取歌单错误')
      }
    )
  }
  songlistDataToMusicItemAdapter(item: any) {
    return {
      picUrl: item.coverImgUrl,
      playCount: item.playCount
    }
  }
  get transTime(): string | undefined {
    if (this.songlistData) {
      return (new Date(this.songlistData.createTime) as Date).Format('yyyy-MM-dd')
    }
  }
  afterUpdateReset(url: string) {
    this.tryGetData = false
    ;(this.$refs.blur as HTMLElement).style.backgroundImage = `url(${url})`
    ;(this.$refs.detail as HTMLElement).style.height = ''
  }
  beforeUpdateInit() {
    ;(this.$refs.detail as HTMLElement).style.height = '81vh'
  }
}
</script>

<style lang='stylus'>

@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'

.song-list-detail
  width 100%
  // 为了暂时让detail页面消失滚动，固定高度，提前设置Hidden
  overflow hidden
  margin 0 auto
  position relative
  background-color rgb(250,250,250)
  padding-top 1rem
  .blur
    position absolute
    top 0
    width 100%
    filter blur(80px)
    background line-gradient(transparent, #fff)
    background-size 100% 5rem
    background-repeat no-repeat
    height 10rem
    z-index 0
  .loading
    margin-top 40vh !important
    z-index 2
  .mask-back
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background #fff
    z-index 10
  .content
    width 94%
    margin 0 auto
    .title
      font-size .7rem
      color $color-font-grey-title
      text-align left
    .top-bar
      display flex
      margin-top 1.2rem
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
    .song-list-message
      display flex
      flex-direction row
      justify-content flex-start
      margin-top 1rem
      .cover
        width 35%
        max-width 12rem
        margin-top 0rem
        margin-right .6rem
        & > *
          width 100%
      .content
        display flex
        flex-direction column
        justify-content flex-start
        align-items flex-start
        .name
          margin-top .2re
        .creator
          display flex
          margin-top .8rem
          flex-direction row
          align-items center
          z-index 1
          img
            width 1.6rem
            border-radius 50%
            margin-right .6rem
          .creater
            font-size .7rem
            margin-right .6rem
          .date
            font-size .6rem
            color $color-font-grey-title
        .button-group
          margin-top .7rem
          z-index 1

.mask-leave-to
  opacity 0
.mask-enter-active, .mask-leave-active {
  transition: opacity .3s;
}
</style>
