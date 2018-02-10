<template>

<div class="album-detail">
  <div class="blur" ref="b"></div>
  <loading class="loading" v-if="showLoading" />
  <div class="info" v-if="album" >
    <div class="title">
      专辑
    </div>
    <div class="content">
    <img class="avatar" :src="album.blurPicUrl" alt="">
    <div class="more">
       <span class="name">{{album.name}}</span>
       <div class="message">
         <span class="singer">
           歌手：
           <span class="blu" @click="toggleSinger(album.artist.id)">{{album.artist.name}}</span>
         </span>
         <span class="time">
           发布时间：
           <span class="text">{{calcTime(album.publishTime)}}</span>
         </span>
      </div>
      <div class="button-group">
        <my-button class="button" @click="toggleCommentDetail" :text="`评论(${album.info.commentCount})`" iconCls="i_sound"></my-button>
      </div>
      <div class="desc">
        <p class="text">
          {{subStr(album.description)}}
        </p>
        <!-- <span v-if="album.description" class="ctrl" @click="exDesc = !exDesc"><img :src="IMG_EX" alt=""></span> -->
      </div>
    </div>
    </div>
  </div>
  <song-list-view v-if="songs.length !== 0" class="songs-view"  :tracks="songs"/>
<div class="bot"></div>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Loading from 'base/loading/loading.vue'
import { Prop, Watch } from 'vue-property-decorator'
import MyButton from 'base/button/button.vue'
import { getAlbumDetail } from 'api/album.ts'
import SongListView from 'components/song-list-view/song-list-view.vue'
import { watch } from 'fs'
@Component({
  name: 'album-detail',
  components: {
    Loading,
    MyButton,
    SongListView
  }
})
export default class App extends Vue {
  @Prop() id: number
  album: any = null
  songs: any = []
  showLoading: boolean = true
  exDesc: boolean = false
  // IMG_EX = require('@/assets/ex.svg')
  mounted() {
    this.getAlbumDetailData(this.id)
  }
  afterUpdateReset(url: string) {
    ;(this.$refs.b as HTMLElement).style.backgroundImage = `url(${url})`
    this.showLoading = false
  }
  getAlbumDetailData(id: number) {
    getAlbumDetail(id).then(
      (res: any) => {
        if (res.body.code === 200) {
          this.album = res.body.album
          this.songs = this.albumSongsDataToSongListViewAdapter(res.body.songs)
          this.afterUpdateReset(res.body.album.blurPicUrl)
        }
      },
      (err: any) => {}
    )
  }
  toggleSinger(id: number) {
    let sid = id.toString()
    this.$router.push({ name: 'singerDetail', params: { id: sid } })
  }
  toggleCommentDetail() {
    let id = this.album.id,
      type = '2',
      blurPic = this.album.blurPicUrl,
      fTitle = this.album.name,
      tTitle = `by ${this.album.artist.name}`,
      params = {
        id,
        type,
        blurPic,
        fTitle,
        tTitle
      }
    this.$router.push({
      name: 'commentDetail',
      params
    })
  }
  calcTime(t: number) {
    return new Date(t).Format('yyyy-MM-dd')
  }
  subStr(s: string) {
    if (!s) {
      return ''
    }
    if (this.exDesc) {
      return s
    } else {
      return s.substring(0, 80) + '...'
    }
  }
  albumSongsDataToSongListViewAdapter(songs: Array<any>) {
    let _hotsongs = songs.slice()
    _hotsongs.forEach(item => {
      item.artists = item.ar
      item.album = item.al
      item.alias = []
      item.duration = item.dt
      item.album.blurPicUrl = item.al.picUrl
    })
    return _hotsongs
  }
  reInitData() {
    this.album = null
    this.songs = []
    this.showLoading = true
    this.exDesc = false
    ;(this.$refs.b as HTMLElement).style.backgroundImage = `url()`
  }
  @Watch('id')
  onIdChange(nId: number, oId: number) {
    if (nId !== oId) {
      this.getAlbumDetailData(this.id)
      this.reInitData()
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.album-detail
  position relative
  width 100%
  height calc(100% - 2rem)
  .loading 
    margin-top 4rem
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
  .bot
    height 3rem
  .songs-view
    margin 0 auto
    width 94%
  .info
    padding-top 1rem
    width 94%
    z-index 1
    position relative
    margin 0 auto
    .title
      font-size .7rem
      color $color-font-grey-title
      text-align left
    .content
      margin-top 1rem
      display flex
      align-items flex-start
      .avatar
        width 9rem
      .more
        display flex
        flex-direction column
        justify-content space-between
        align-items flex-start
        height 100%
        width 100%
        margin-left 1rem
        .name
          display flex
        .message
          color $color-font-grey-title
          margin-top 1rem
          font-size .7rem
          .blu
            cursor pointer
            color $color-font-link-blue
        .button-group
          margin-top 1rem
          display flex
          .button
            display inline-flex
        .desc
          margin-top 1rem
          padding-right 1rem
          .text
            text-align left 
            color $color-font-grey-title
            font-size .7rem
            line-height 1rem
          .ctrl
            float right
            cursor pointer
            img
              width 1rem
        
</style>
