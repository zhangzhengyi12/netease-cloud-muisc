<template>
  <div class="singer">
        <div class="blur" ref="b"> </div>
    <loading class="loading" v-if="showLoading"/>
    <div class="info" v-if="singer">
      <div class="title">歌手</div>
      <div class="content">
        <img class="avatar" :src="singer.img1v1Url" alt="">
        <div class="more">
          <span class="name">{{singer.name}}</span>
          <span class="alias" v-if="singer.alias[0]">{{singer.alias[0]}}</span>
          <div class="count">
            <span class="songs">
              <i class="i_music_40 icon"></i>
              <span class="title">单曲数: </span>
              <span class="text">{{singer.musicSize}}</span>
            </span>
            <span class="cds">
              <i class="i_cd icon"></i>
              <span class="title">专辑数: </span>
              <span class="text">{{singer.albumSize}}</span>
            </span>
            <span class="mvs">
              <i class="i_video icon"></i>
              <span class="title">MV数: </span>
              <span class="text">{{singer.mvSize}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="view" v-if="singer">
      <ul class="link-group">
        <li class="link" v-for="(i,index) of initViews" @click="toggleView(index)" :key="index" :class="{active:index === activeView}">{{i}}</li>
        <div class="border"></div>
      </ul>
        <v-bar class="views">
          <!-- step1 hot50 -->
          <transition name="fade" mode="out-in">
          <song-list-view class="songsView" v-if="activeView === 0" :tracks="hotSongs" key="songs"></song-list-view>
          <div class="cdView" v-if="activeView ===1" key="album">
            <v-music-item
            v-for="(album,index) of albums"
            :key="index"
            :data="album"
            :index='index'
            class="album"
            @click="selectAlbum(album)"
            />
          </div>
          <div class="desView" v-if="activeView === 2" key="des">
            <h1 class="title">{{singer.name}}简介</h1>
            <p class="text">&nbsp;&nbsp;&nbsp;&nbsp;{{singerDesc}}</p>
            <div class="intr" v-for="(item,index) of singerIntroduction"
            :key="index">
              <h3 class="title">{{item.ti}}</h3>
              <p class="text">&nbsp;&nbsp;&nbsp;&nbsp;{{item.txt}}</p>
            </div>
          </div>
          <div class="simiView" v-if="activeView === 3" key="simi">
            <music-item
              v-for="(singer,index) of simiSinger"
              :key="index"
              :data="simiArtistsDataToMusicItemAdapter(singer)"
              :index='index'
              class="singer"
              @click="selectSimiSinger(singer)"
            />
          </div>
          </transition>
        </v-bar>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { loadingMixin, musicItemMixin } from '@/mixins/mixins.ts'
import { getSingerDetail, getSingerAlbums, getSingerDesc, getSimiSinger } from 'api/singer.ts'
import VMusicItem from 'base/1v1-music-item/1v1-music-item.vue'
import { Prop, Watch } from 'vue-property-decorator'
import { initSingerDetailViews } from 'common/js/initData'
import SongListView from 'components/song-list-view/song-list-view.vue'
import VBar from 'v-bar'
import { ucs2 } from 'punycode'

const DEF_ALBUM_LIMIT = 50
@Component({
  name: 'singerDetail',
  mixins: [loadingMixin, musicItemMixin],
  components: { VBar, SongListView, VMusicItem }
})
export default class App extends Vue {
  @Prop() id: number
  initViews = initSingerDetailViews
  activeView = 0
  singer = null
  hotSongs: any = []
  albums: any = []
  showLoading = true
  singerDesc: string = ''
  simiSinger: any = []
  singerIntroduction: any = []
  mounted() {
    this.getSingerDetailData(this.id)
    this.getSingerAlbumsData(this.id, DEF_ALBUM_LIMIT)
    this.getSingerDescData(this.id)
    this.getSimiSingerData(this.id)
  }
  getSingerDetailData(id: number) {
    getSingerDetail(id).then(
      (res: any) => {
        if (res.body.code === 200) {
          this.singer = res.body.artist
          this.hotSongs = this.hotSongDataToSongListViewAdapter(res.body.hotSongs)
        }
        this.showLoading = false
        if (res) {
          this.afterUpdateReset(res.body.artist.picUrl)
        }
      },
      (err: any) => {}
    )
  }
  afterUpdateReset(url: string) {
    ;(this.$refs.b as HTMLElement).style.backgroundImage = `url(${url})`
  }
  toggleView(i: number) {
    this.activeView = i
  }
  hotSongDataToSongListViewAdapter(hotsongs: Array<any>) {
    let _hotsongs = hotsongs.slice()
    _hotsongs.forEach(item => {
      item.artists = item.ar
      item.album = item.al
      item.alias = []
      item.duration = item.dt
      item.album.blurPicUrl = item.al.picUrl
    })
    return _hotsongs
  }
  hotalbumDataToMusicItemAdapter(album: any) {}
  getSingerAlbumsData(id: number, limit: number) {
    getSingerAlbums(id, limit).then(
      (res: any) => {
        if (res.body.code === 200) {
          this.albums = res.body.hotAlbums
        }
      },
      (err: any) => {
        this.$message('获取歌手专辑错误')
      }
    )
  }
  getSingerDescData(id: number) {
    getSingerDesc(id).then((res: any) => {
      if (res.body.code === 200) {
        this.singerDesc = res.body.briefDesc
        this.singerIntroduction = res.body.introduction
      }
    })
  }
  getSimiSingerData(id: number) {
    getSimiSinger(id).then((res: any) => {
      if (res.body.code === 200) {
        this.simiSinger = res.body.artists
      }
    })
  }
  simiArtistsDataToMusicItemAdapter(item: any) {
    item.picUrl = item.img1v1Url
    return item
  }
  selectAlbum(a: any) {
    this.$router.push({ name: 'albumDetail', params: { id: a.id } })
  }
  selectSimiSinger(s: any) {
    this.$router.push({ name: 'singerDetail', params: { id: s.id } })
  }
  reInitData() {
    this.initViews = initSingerDetailViews
    this.activeView = 0
    this.singer = null
    this.hotSongs = []
    this.albums = []
    this.showLoading = true
    ;(this.$refs.b as HTMLElement).style.backgroundImage = `url()`
  }
  @Watch('id')
  onIdChange(nId: number, oId: number) {
    if (!nId) return
    if (nId !== oId) {
      this.getSingerDetailData(nId)
      this.getSingerAlbumsData(nId, DEF_ALBUM_LIMIT)
      this.getSingerDescData(nId)
      this.getSimiSingerData(nId)
      this.reInitData()
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'

.singer
  position relative
  width 100%
  height calc(100% - 2rem)
  .loading 
    margin-top 4rem
  .blur
    blurStyle()
  .info
    padding-top 1rem
    width 94%
    z-index 1
    position relative
    margin 0 auto
    height 13rem
    .title
      font-size .7rem
      color $color-font-grey-title
      text-align left
    .content
      margin-top 1rem
      display flex
      align-items flex-start
      .avatar
        width 11rem
      .more
        display flex
        flex-direction column
        justify-content flex-start
        height 100%
        margin-left 1rem
        .name
          display flex
          margin-top .5rem
        .alias
          color $color-font-grey-title
          margin-top .5rem
          font-size .8rem
          display flex
        .count
          display flex
          flex-direction column
          margin-top 3rem
          > *
            display flex
            font-size .7rem
            .icon
              color $color-font-grey-title
            .text
              color $color-font-grey-title
            > *
              margin .6rem .3rem 0 0
.view
  position relative 
  z-index 2
  height calc(100% - 16rem)
  margin 0 auto
  width 95%
  padding-bottom 1rem
  .views
    height 100%
    .cdView
      display flex
      flex-wrap wrap
      padding-right 1rem
      padding-bottom 2rem
      position: relative
      padding-right: 24px !important
      padding-bottom: 36px !important
      .album
        width 20%
        @media (max-width 800px) {
          width 25%
        }
        @media (min-width 1100px) {
          width 16.666666666666666%
        }
        @media (min-width 1400px) {
          width 12.5%
        }
        @media (min-width 1700px) {
          width 10%
        }
    .songsView
      position: relative
      padding-right: 24px !important
      padding-bottom: 36px !important
    .simiView
      display flex
      flex-wrap wrap
      padding-right 1rem
      padding-bottom 2rem
      position: relative
      padding-right: 24px !important
      padding-bottom: 36px !important
      .singer
        width 20%
        @media (max-width 800px) {
          width 25%
        }
        @media (min-width 1100px) {
          width 16.666666666666666%
        }
        @media (min-width 1400px) {
          width 12.5%
        }
        @media (min-width 1700px) {
          width 10%
        }
    .desView
      text-align left
      color #333
      padding-right 1rem
      position: relative
      padding-right: 24px !important
      padding-bottom: 36px !important
      .title
        margin 1rem 0
      .text
        font-size .7rem
        line-height 1rem
        margin-left .5rem
  .link-group
    display flex
    margin 0 auto
    justify-content flex-start
    margin-top 0.5rem
    font-size 0.82rem
    position relative
    box-sizing content-box
    .border
      position absolute
      height 1px
      width 100%
      bottom 0px
      background $color-border-grey
    .link
      padding 0.6rem
      cursor pointer
      color $color-font-black-h2
      box-sizing content-box
      &.active
        color $color-font-red
        border-bottom 2px solid $color-font-red

.fade-leave-to
  opacity 0
  transform translateX(-80px)
.fade-enter
  opacity 0
  transform translateX(80px)
.fade-enter-active
  transition all .5s
.fade-leave-active
  transition all .3s

</style>
