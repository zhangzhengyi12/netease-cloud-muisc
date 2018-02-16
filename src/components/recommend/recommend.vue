<template>
  <div class="recommend">
    <el-carousel v-if="banners" :interval="4000" :autoplay="false" height='0px' :type="type" class="carousel" ref="carousel">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <!-- 如果图片地址还未获取，先用一张 -->
        <h3 class="background-wrapper">
          <img v-lazy="item.lazyData" alt="" class="background" ref="imgs" @load="upCarouselHeight(index)">
        </h3>
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐菜单 -->
    <div class="recommend-menu">
      <div class="item">
        <a href="" @click.stop.prevent="toggleFM">
          <i class="i_radio_36 icon"></i>
          <span class="content">
            <span class="title">
              私人FM
            </span>
            <span class="text">享受你的专属音乐推荐</span>
          </span>
        </a>
      </div>
      <div class="item">
        <a href="" @click.prevent.stop="toggleRecommedSongsDetail">
          <!-- 动态绑定日期 -->
          <i class="icon">16</i>
          <span class="content">
            <span class="title">
              每日歌曲推荐
            </span>
            <span class="text">根据你的口味生成</span>
          </span>
        </a>
      </div>
      <div class="item">
        <a href="" @click.prevent.stop="toggleRecommendRank">
          <i class="i_rank icon"></i>
          <span class="content">
            <span class="title">
              排行榜
            </span>
            <span class="text">最热音乐榜</span>
          </span>
        </a>
      </div>
    </div>

    <!-- 热门歌单 -->
    <tip-title :iconCls="'i_recommend'" :title="'推荐歌单'" v-if="songlist"></tip-title>
    <div class="hot-songlist" :gutter="10" v-if="songlist">
      <music-item v-for="(item,index) of songlist" class="songlist" :data="item" :key="index" :index="index" @click="selectPlaylist(index)">
      </music-item>
    </div>
    <!-- 独家放送 -->
    <tip-title :iconCls="'i_video'" :title="'独家放送'" v-if="privates"></tip-title>
    <div class="privates" v-if="privates">
      <private-content v-for="(item,index) of privates" :key="index" :data="item" :index="index" class="private-item"></private-content>
    </div>
    <!-- 最新歌曲 -->
    <!-- TODO:API不够稳定，暂停开发 -->
    <!-- <tip-title :iconCls="'i_cd'" :title="'最新歌曲'"></tip-title> -->
    <!-- <new-song-list :list="newSongs"></new-song-list> -->

    <!-- 主播电台 -->
    <div class="r-dj">
      <tip-title iconCls='i_video' v-if="mvs" title="推荐MV" />
      <div class="recommend-mvs" v-if="mvs">
        <music-item @click="$message('抱歉，因为网易的限制，mv无法获取播放地址')" v-for="(mv,index) of mvs" class="mv" :key="index" :data="mv" :index="index" countIcon="i_camera">
        </music-item>
      </div>
    </div>

    <tip-title iconCls='i_radio' title="主播电台" v-if="djs" />
    <div class="djs">
      <dj-item @click="toggleStationDetail(dj)" v-for="(dj,index) of djs" :index="index" class="dj" :key="index" :data="dj">
      </dj-item>
    </div>

    <!-- HACK处理 -->
    <div class="bottom" style="height:24px"></div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  getBanner,
  getPersonalizedSonglist,
  getPrivateContent,
  getPersonalizedNewsong,
  getPersonalizedMvs,
  getPersonalizedDjprogram
} from 'api/recommend'
import { State, Mutation, Action } from 'vuex-class'
import { Watch } from 'vue-property-decorator'
import VBar from 'v-bar'
import TipTitle from 'base/tip-title/tip-title.vue'
import PrivateContent from 'base/private-content/private-content.vue'
import NewSongList from 'base/new-song-list/new-song-list.vue'
import DjItem from 'base/dj-item/dj-item.vue'
import { configMixin, musicItemMixin } from '@/mixins/mixins'
import { getRecFm } from 'api/player.ts'

const bannerPlaceholer = require('@/assets/banner-placeholder.png')

const CODE_OK = 200

interface bannerData {
  body: {
    banners: Array<any>
    code: number
  }
}

@Component({
  name: 'recommend',
  components: {
    VBar,
    TipTitle,
    PrivateContent,
    NewSongList,
    DjItem
  },
  mixins: [musicItemMixin]
})
export default class App extends Vue {
  banners: any = null
  type = 'card'
  songlist: null | Array<{ id: number }> = null
  privates = null
  newSongs = null
  mvs = null
  djs = null

  @State('viewport') viewport: any
  @State('userLoginState') loginState: any
  @Mutation('SET_REC_MODE') setRec: any
  @Action('selectFm') selectFM: any
  mounted() {
    this.getBannerData()
    this.getPrivateContentData()
    this.getPersonalizedNewSongData()
    this.getPersonalizedMvsData()
    this.getPersonalizedDjprogramData()
    if (this.loginState.isLogin) {
      this.getPersonalizedSonglistData()
    }
  }
  upCarouselHeight(index: number) {
    if (!(this.$refs.imgs as Array<HTMLElement>)[index]) return
    let h = (this.$refs.imgs as Array<HTMLElement>)[index].scrollHeight
    ;((this.$refs.carousel as Vue).$el.firstChild as HTMLElement).style['height'] = `${h}px`
  }
  getBannerData() {
    getBanner().then(
      (res: any) => {
        if (res.body.code === CODE_OK) {
          const banners = res.body.banners as Array<any>
          banners.forEach((item, index) => {
            item.lazyData = {
              src: item.picUrl,
              error: bannerPlaceholer,
              loading: bannerPlaceholer
            }
          })
          this.banners = banners
        }
      },
      (err: any) => {
        this.$message('获取banner出错')
      }
    )
  }
  caluCountToWan(count: number) {
    let result = ''
    if (count < 10000) {
      return count
    }
    result = `${Math.floor(count / 10000)}万`
    return result
  }
  getPersonalizedSonglistData(): void {
    getPersonalizedSonglist().then(
      (res: any) => {
        if (res.body.code === CODE_OK) {
          this.songlist = res.body.result.slice(0, 10)
        }
      },
      (err: any) => {
        this.$message('获取推荐歌单')
      }
    )
  }
  toggleStationDetail(dj: any) {
    this.$router.push({ name: 'stationDetail', params: { id: dj.id } })
  }
  selectPlaylist(index: number) {
    const id: string = (this.songlist as Array<{ id: number }>)[index].id.toString()
    this.$router.push({ name: 'songlistDetail', params: { id } })
  }
  getPrivateContentData(): void {
    getPrivateContent().then(
      (res: any) => {
        if (res.body.code === CODE_OK) {
          this.privates = res.body.result
        }
      },
      (err: any) => {
        this.$message('获取独家放送错误')
      }
    )
  }
  getPersonalizedNewSongData() {
    getPersonalizedNewsong().then(
      (res: any) => {
        if (res.body.code === CODE_OK) {
          this.newSongs = res.body.result
        }
      },
      (err: any) => {
        this.$message('获取推荐新歌错误')
      }
    )
  }
  getPersonalizedMvsData() {
    getPersonalizedMvs().then(
      (res: any) => {
        if (res.body.code === CODE_OK) {
          this.mvs = res.body.result
        }
      },
      (err: any) => {
        this.$message('获取推荐mv错误')
      }
    )
  }
  getPersonalizedDjprogramData() {
    getPersonalizedDjprogram().then((res: any) => {
      if (res.body.code === CODE_OK) {
        this.djs = res.body.result
      }
    })
  }
  toggleRecommedSongsDetail() {
    if (!this.loginState.isLogin) {
      this.$message('请登录！')
      return
    }
    this.$router.push({
      name: 'recommendSongsDetail'
    })
  }
  toggleRecommendRank() {
    this.$router.push('/find/rank')
  }
  toggleFM() {
    if (!this.loginState.isLogin) {
      this.$message('请登录！')
      return
    }
    getRecFm().then((res: any) => {
      this.selectFM({ list: res.body.data })
    })
    this.setRec(true)
  }

  @Watch('viewport')
  onViewportChange() {
    this.upCarouselHeight(0)
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.recommend
  width 90%
  margin 0 auto
  padding-right 0 !important
  .carousel
    margin-top 1rem
    img
      width 100%
  .hot-songlist
    display flex
    flex-wrap wrap
    justify-content space-around
    .songlist
      width 20%
      margin-top 1rem
      @media screen and (max-width: 1200px) and (min-width: 900px)
        width 25%
        &:nth-child(n + 9)
          display none
      @media screen and (max-width: 900px) and (min-width: 550px)
        width 33%
        &:last-child
          display none
      @media screen and (max-width: 550px)
        width 50%
      .content
        display flex
        flex-direction column
        overflow hidden
        width 88%
        margin 0 auto
        text-align left
        position relative
        .name
          font-size 0.8rem
          display inline-block
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          margin 0.3rem 0
        img
          max-width 100%
  .recommend-menu
    display flex
    flex-direction row
    margin-top 1rem
    .item
      width 33%
      &:nth-child(n + 2)
        border-left 1px solid $color-border-grey
      a
        display flex
        justify-content center
        @media screen and (max-width: 900px)
          flex-direction column
          justify-content center
          align-items center
        .icon
          display inline-block
          height 3rem
          width 3rem
          text-decoration none
          font-style normal
          line-height 3rem
          border-radius 50%
          font-size 1.4rem
          border 1px solid #e5a8a9
          color $color-theme-red
        .content
          display flex
          flex-direction column
          align-items flex-start
          justify-content space-around
          padding 0.5rem
          .title
            font-size 0.8rem
            color #333
          .text
            font-size 0.6rem
            @media screen and (max-width: 900px)
              display none
.privates
  display flex
  flex-direction row
  flex-wrap wrap
  justify-content space-between
  margin-top 1rem
  .private-item
    width calc(33% - 1rem)
    @media screen and (max-width: 900px)
      width calc(50% - 2rem)
      &:last-child
        display none
    @media screen and (max-width: 550px)
      width calc(100% - 2rem)
      &:last-child
        display none
.recommend-mvs
  display flex
  flex-wrap wrap
  justify-content space-around
  .mv
    width 33%
    margin-top 1rem
    &:last-child
      display none
    @media screen and (max-width: 900px)
      width 50%
      &:nth-child(n + 0)
        display block
.djs
  display flex
  flex-direction row
  flex-wrap wrap
  margin-top 0.5rem
  .dj
    width 50%
    border-bottom 1px solid $color-border-grey
    margin-bottom 0.5rem
    padding-bottom 0.5rem
</style>
