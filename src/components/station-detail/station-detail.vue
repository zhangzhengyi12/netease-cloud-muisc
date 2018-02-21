<template>
  <div class="station" ref="detail">
    <div class="blur" ref="blur"></div>
    <transition name="mask">
      <div class="mask-back" v-if="tryGetData">
        <loading class="loading"></loading>
      </div>
    </transition>
    <div class="content" v-if="djDetail">
      <div class="title">电台</div>
      <div class="song-list-message">
        <MusicItem :data="songlistDataToMusicItemAdapter(djDetail)" class="cover"></MusicItem>
        <div class="content">
          <h3 class="name">{{djDetail.name}}</h3>
          <div class="creator">
            <img :src="djDetail.dj.avatarUrl" alt="">
            <span class="creater">{{djDetail.dj.nickname}}</span>
          </div>
          <div class="button-group">
            <my-button :text="`订阅(${djDetail.subCount})`" iconCls="i_sound"></my-button>
          </div>
        </div>
      </div>
      <div class="top-bar">
        <div class="play-all">
          <i class="i_play icon"></i>
          <span class="text">播放全部({{djDetail.programCount}})</span>
        </div>
      </div>
      <div class="programs">
        <dj-view v-for="(program,index) of programs" :key="index" :data="program" :index="programs.length - 1 - index" class="program" @click="togglePlay(index)"></dj-view>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Loading from 'base/loading/loading.vue'
import MyButton from 'base/button/button.vue'
import MusicItem from 'base/music-item/music-item.vue'
import { Prop, Watch } from 'vue-property-decorator'
import { getDjPrograms, getDjDetail } from 'api/host-station.ts'
import DjView from 'base/dj-view/dj-view.vue'
import { Action, Mutation } from 'vuex-class'

const CODE_OK = 200
@Component({
  name: 'stationDetail',
  components: {
    Loading,
    MyButton,
    MusicItem,
    DjView
  }
})
export default class App extends Vue {
  @Prop() id: number
  @Action('selectPlay') selectPlay: any
  @Mutation('SET_PLAY_TYPE') setPlayType: any
  djDetail: any = null
  programs: any = []
  tryGetData = true
  mounted() {
    this.getDjDetailData()
    this.getDjProgramsData()
    this.beforeUpdateInit()
  }
  getDjDetailData() {
    getDjDetail(this.id).then(
      (res: any) => {
        if (res.body.code === CODE_OK) {
          this.djDetail = res.body.djRadio
          this.afterUpdateReset(res.body.djRadio.picUrl)
        }
      },
      (err: any) => {
        this.$message('获取电台详情错误')
      }
    )
  }
  getDjProgramsData() {
    getDjPrograms(this.id).then((res: any) => {
      if (res.body.code === CODE_OK) {
        if (res.body.programs.length === 0) {
          this.$router.back()
          this.$message('抱歉，无法获取电台数据')
        }
        this.programs = res.body.programs
        this.progreamDataToPlayAdapter()
      }
    })
  }
  songlistDataToMusicItemAdapter(item: any) {
    return {
      picUrl: item.picUrl
    }
  }
  afterUpdateReset(url: string) {
    this.$nextTick(() => {
      this.tryGetData = false
    })
    ;(this.$refs.blur as HTMLElement).style.backgroundImage = `url(${url})`
    ;(this.$refs.detail as HTMLElement).style.height = ''
  }
  beforeUpdateInit() {
    this.tryGetData = true
    ;(this.$refs.detail as HTMLElement).style.height = '81vh'
  }
  togglePlay(index: number): void {
    this.setPlayType(true)
    this.selectPlay({ list: this.programs, index })
  }
  progreamDataToPlayAdapter() {
    this.programs.forEach((item: any) => {
      item.blurPicUrl = item.blurCoverUrl
      item.artists = item.mainSong.artists
      item.alias = []
      item.album = item.mainSong.album
      item.id = item.mainSong.id
    })
  }
  @Watch('id')
  onIdChange() {
    this.beforeUpdateInit()
    this.getDjDetailData()
    this.getDjProgramsData()
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.station
  width 100%
  // 为了暂时让detail页面消失滚动，固定高度，提前设置Hidden
  overflow hidden
  margin 0 auto
  position relative
  background-color rgb(250, 250, 250)
  padding-top 1rem
  padding-bottom 3rem
  height 100%
  .blur
    blurStyle()
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
      font-size 0.7rem
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
    .song-list-message
      display flex
      flex-direction row
      justify-content flex-start
      margin-top 1rem
      .cover
        width 35%
        max-width 12rem
        margin-top 0rem
        margin-right 0.6rem
        & > *
          width 100%
      .content
        display flex
        flex-direction column
        justify-content flex-start
        align-items flex-start
        .name
          margin-top 0.2re
        .creator
          display flex
          margin-top 0.8rem
          flex-direction row
          align-items center
          z-index 1
          img
            width 1.6rem
            border-radius 50%
            margin-right 0.6rem
          .creater
            font-size 0.7rem
            margin-right 0.6rem
          .date
            font-size 0.6rem
            color $color-font-grey-title
        .button-group
          margin-top 0.7rem
          z-index 1
.programs
  margin-top 1rem
  .program
    cursor pointer
    &:nth-child(odd)
      background-color rgb(244, 244, 244)
    &:hover
      background-color rgb(244, 244, 244)
.mask-leave-to
  opacity 0
.mask-enter-active, .mask-leave-active
  transition opacity 0.3s
</style>
