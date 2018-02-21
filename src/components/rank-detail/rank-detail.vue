<template>
  <div class="station" ref="detail">
    <div class="blur" v-if="rank" :style="`background-image:url(${rank.coverImgUrl})`" ref="blur"></div>
  <loading v-if="disLoading"/>
  <div class="content" v-if="rank">
    <div class="title">排行榜</div>
    <div class="song-list-message">
      <MusicItem class="cover" :data="songlistDataToMusicItemAdapter(rank)"></MusicItem>
      <div class="content">
        <h3 class="name">{{rank.name}}</h3>
        <div class="creator">
          <img :src="rank.creator.avatarUrl" alt="">
          <span class="creater">{{rank.creator.nickname}}</span>
           <div class="date">
          最近更新：{{calcTime(rank.trackUpdateTime)}}
        </div>
        </div>
  
        <div class="desc">
          {{rank.description}}
        </div>
      </div>
    </div>
    <div class="rank-view">
      <song-list-view :tracks="tracks"></song-list-view>
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
import SongListView from 'components/song-list-view/song-list-view.vue'
import { getToplist } from 'api/rank.ts'
@Component({
  name: 'rankDetail',
  components: { MyButton, MusicItem, Loading, SongListView }
})
export default class App extends Vue {
  @Prop() id: any
  rank: any = null
  tracks: any = []
  disLoading = true
  mounted() {
    this.getToplistData(this.id)
  }
  getToplistData(idx: any) {
    getToplist(idx).then((res: any) => {
      if (res.body.code === 200) {
        this.rank = res.body.playlist
        this.tracks = this.rankSongsDataToSongListViewAdapter(res.body.playlist.tracks)
        this.disLoading = false
      }
    }).catch((e:any)=>{
      console.log(e)
    })
  }
  songlistDataToMusicItemAdapter(item: any) {
    return {
      picUrl: item.coverImgUrl,
      playCount: item.playCount
    }
  }
  calcTime(t: number) {
    return new Date(t).Format('yyyy-MM-dd')
  }
  rankSongsDataToSongListViewAdapter(songs: Array<any>) {
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
  reinitData() {
    this.rank = null
    this.tracks = []
    this.disLoading = true
  }
  @Watch('id')
  onIdChange(nId: number) {
    this.reinitData()
    this.getToplistData(nId)
  }
}
</script>

<style lang='stylus' scoped>
.station
  width 100%
  // 为了暂时让detail页面消失滚动，固定高度，提前设置Hidden
  overflow hidden
  margin 0 auto
  position relative
  background-color rgb(250,250,250)
  padding-top 1rem
  padding-bottom 3rem
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
          margin-top .2rem
        .desc
          font-size .7rem
          margin-top 1rem
          text-align left
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
</style>
