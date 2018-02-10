<template>
  <div class="search">
    <div class="top">  
     <div class="bar">
      <input type="text"  class="s" @keydown.enter="goSearch(value)" v-model="value" placeholder="搜索音乐、歌手、歌词、用户">
      <img :src="IMG_DEL" alt="" v-if="value!==''" @click="clearValue()" class="del">
      <span class="icon i_search"></span>
    </div>
    <div class="advice-list" v-if="value&&!activeSearchResult">
      <h1 class="advice title">搜索"{{value}}"</h1>
      <div v-for="(type,index) of advices.order" :key="index" v-if="advices.order">
        <div v-for="(advice,index) of advices[type]" @click="goSearch(advice.name)" v-if="type!=='mvs'" :key="index" class="advice">
          <span class="icon" :class="calcIconCls(type)"></span>
          {{advice.name}}
        </div>
      </div>
    </div>
  </div>
    <div class="body" v-if="!activeSearchResult">
      <div class="hot-search">
        <h1 class="title">热门搜索</h1>
        <span v-for="(key,index) of hotSearch" @click="goSearch(key)" class="key" :key="index">{{key}}</span>
      </div>

        <div class="history">
          <h1 class="title">搜索历史<img :src="IMG_CLEAR" alt="" @click="clearHistory"></h1>
          <v-bar class="his-view" autoHide='1000'>
          <ul class="list">
            <li v-for="(v,index) of history" class="item" :key="index">
              <span class="text">{{v}}</span>
              <img :src="IMG_DEL" alt="" @click="delHistoryForIndex(index)" class="del">
            </li>
          </ul>
          </v-bar> 
        </div>
    </div>

    <div class="result" v-if="activeSearchResult">
      <ul class="link-group">
         <li class="link" v-for="(i,index) of initViews" @click="toggleView(index)" :key="index" :class="{active:index === activeView}">{{i}}</li>
         <div class="border"></div>
      </ul>
      <v-bar class="result-view" autoHide="3000">
        <transition name="fade" mode="out-in">
          <div class="songs" v-if="activeView===0" key="0">
            <loading class="loading" v-if="hasSongs===resultState.wait"/>
            <span class="tips" v-if="hasSongs === resultState.noResult">没有找到相关的歌曲</span>
            <song-view class="song" @click="toggleInsertPlay(index)"
            v-for="(song,index) of result_songs"
            v-if="hasSongs === resultState.hasResult "
            :simpleHeader='true'
            :key="index" :track="song"/>
          </div>
          <div class="singers" v-if="activeView === 1" key="1">
            <loading class="loading" v-if="hasSingers===resultState.wait"/>
            <span class="tips" v-if="hasSingers === resultState.noResult">没有找到相关歌手</span>
            <div class="singer" @click="toggleSingerDetail(singer)" v-for="(singer,index) of result_singers" v-if="hasSingers===resultState.hasResult" :key="index">
              <img class="avatar" :src="singer.img1v1Url" alt="">
              <span class="name">{{singer.name}}</span>
              <span class="alias" v-if="singer.alias&&singer.alias[0]">( {{singer.alias[0]}} )</span>
            </div>
          </div>
          <div class="albums" v-if="activeView === 2" key="2">
            <loading class="loading" v-if="hasAlbum===resultState.wait"/>
            <span class="tips" v-if="hasAlbum === resultState.noResult">没有找到相关专辑</span>
            <div class="album" @click="toggleAlbumDetail(album)" v-for="(album,index) of result_albums" :key="index">
              <div class="header">
                <img class="avatar" :src="album.blurPicUrl" alt="">
                <span class="name">{{album.name}}</span>
              </div>
              <div class="tail">
                <span class="s-name">{{album.artist.name}}</span>
                <span class="s-alias" v-if="album.artist.alias&&album.artist.alias[0]"> ( {{album.artist.alias[0]}} )</span>
              </div>
            </div>
          </div>
          <div class="songlists" v-if="activeView === 3" key="3">
            <loading class="loading" v-if="hasSonglists===resultState.wait"/>
            <span class="tips" v-if="hasSonglists === resultState.noResult">没有找到相关歌单</span>
            <div class="songlist" @click="toggleSonglistDetail(songlist)" v-for="(songlist,index) of result_songlists" :key="index" v-if="hasSonglists === resultState.hasResult">
              <div class="header">
                <img :src="songlist.coverImgUrl" alt="" class="avatar">
                <span class="name">{{songlist.name}}</span>
              </div>
              <div class="body">
                <span class="t-count">{{songlist.trackCount}} 首</span>
                <span class="p-count">播放 {{caluCount(songlist.playCount)}}</span>
              </div>
            </div>
          </div>
          <div class="stations" v-if="activeView === 4" key="4">
            <loading class="loading" v-if="hasStations===resultState.wait"/>
            <span class="tips" v-if="hasStations === resultState.noResult">没有找到相关歌单</span>
            <div class="station" @click="toggleStationDetail(station)" v-for="(station,index) of  result_stations" v-if="hasStations === resultState.hasResult" :key="index">
              <img :src="station.picUrl" alt="" class="avatar">
              <span class="name">{{station.name}}</span>
            </div>
          </div>
        </transition>
      </v-bar>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import VBar from 'v-bar'
import { hotSearch, searchType, initSearchViews } from 'common/js/initData'
import { Mutation, Getter, Action } from 'vuex-class'
import { Watch } from 'vue-property-decorator'
import { getAdviceData, getSearchResultData } from 'api/search.ts'
import { debounce } from 'common/js/util.ts'
import Loading from 'base/loading/loading.vue'
import SongView from 'base/song-view/song-view.vue'
import { exists } from 'fs'

const resultState = {
  wait: 1,
  init: 0,
  noResult: 2,
  hasResult: 3
}
@Component({
  name: 'search',
  components: {
    VBar,
    Loading,
    SongView
  }
})
export default class App extends Vue {
  @Getter('searchHistory') history: any
  @Mutation('ADD_SEARCH_HISTORY') addSearchHistory: any
  @Mutation('CLEAR_SEARCH_HISTORY') clearSearchHistory: any
  @Mutation('DEL_SEARCH_HISTORY_FOR_INDEX') delHistoryForIndex: any
  @Action('insertPlay') insertPlay: any
  IMG_DEL = require('@/assets/close.svg')
  IMG_CLEAR = require('@/assets/clear.svg')
  hotSearch = hotSearch
  value: string = ''
  debGetAdvice: any
  debGetSearchResult: any
  advices: any = {}
  waitResult: boolean = false
  currentResultKeyWord: string = ''
  initViews = initSearchViews
  result_songs: any = []
  result_albums = []
  result_singers = []
  result_songlists = []
  result_stations = []

  hasSongs = resultState.init
  hasAlbum = resultState.init
  hasSingers = resultState.init
  hasSonglists = resultState.init
  hasStations = resultState.init
  activeSearchResult: boolean = false
  activeView = 0
  resultState = resultState
  mounted() {
    this.debGetAdvice = debounce(this.getAdvice, 400, false)
    this.debGetSearchResult = debounce(this.getSearchResult, 400, false)
  }
  clearValue() {
    this.value = ''
  }
  caluCount(count: number): string {
    if (!count) {
      return ''
    }
    let result = ''
    if (count < 10000) {
      return String(count)
    }
    result = `${Math.floor(count / 10000)}万`
    return result
  }
  goSearch(value: string) {
    if (!value) return
    this.value = value
    this.addSearchHistory(value)
    this.changeToLoaidingState()
    this.activeSearchResult = true
    this.getSearchResult(value)
  }
  toggleView(index: number) {
    this.activeView = index
  }
  calcIconCls(type: string) {
    if (type === 'albums') {
      return 'i_cd'
    } else if (type === 'songs') {
      return 'i_music_40'
    } else if (type === 'artists') {
      return 'i_person'
    } else if (type === 'playlists') {
      return 'i_music_32'
    } else {
      return 'i_search'
    }
  }
  toggleInsertPlay(index: number) {
    this.result_songs[index].album.blurPicUrl = this.result_songs[index].album.artist.img1v1Url
    this.insertPlay(this.result_songs[index])
  }
  toggleSingerDetail(s: any) {
    this.$router.push({ name: 'singerDetail', params: { id: s.id } })
  }
  toggleAlbumDetail(a: any) {
    this.$router.push({ name: 'albumDetail', params: { id: a.id } })
  }
  toggleSonglistDetail(s: any) {
    this.$router.push({ name: 'songlistDetail', params: { id: s.id } })
  }
  toggleStationDetail(s: any) {
    this.$router.push({ name: 'stationDetail', params: { id: s.id } })
  }
  clearHistory() {
    this.$confirm('是否清除所有搜索历史记录?', '删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      this.clearSearchHistory()
    })
  }
  getAdvice(word: any) {
    getAdviceData(word).then((res: any) => {
      if (res.body.code === 200) {
        this.advices = res.body.result
      }
    })
  }
  getSearchResult(word: string) {
    this.currentResultKeyWord = word
    getSearchResultData(word, searchType.songs).then((res: any) => {
      if (res.body.code === 200 && res.body.result.songs) {
        this.result_songs = res.body.result.songs
        this.waitResult = false
        this.hasSongs = resultState.hasResult
      } else {
        this.waitResult = false
        this.hasSongs = resultState.noResult
      }
    })
    getSearchResultData(word, searchType.albums).then((res: any) => {
      if (res.body.code === 200 && res.body.result.albums) {
        this.result_albums = res.body.result.albums
        this.hasAlbum = resultState.hasResult
      } else {
        this.hasAlbum = resultState.noResult
      }
    })
    getSearchResultData(word, searchType.singers).then((res: any) => {
      if (res.body.code === 200 && res.body.result.artists) {
        this.result_singers = res.body.result.artists
        this.hasSingers = resultState.hasResult
      } else {
        this.hasSingers = resultState.noResult
      }
    })

    getSearchResultData(word, searchType.songlists).then((res: any) => {
      if (res.body.code === 200 && res.body.result.playlists) {
        this.result_songlists = res.body.result.playlists
        this.hasSonglists = resultState.hasResult
      } else {
        this.hasSonglists = resultState.noResult
      }
    })
    getSearchResultData(word, searchType.stations).then((res: any) => {
      if (res.body.code === 200 && res.body.result.djRadios) {
        this.result_stations = res.body.result.djRadios
        this.hasStations = resultState.hasResult
      } else {
        this.hasStations = resultState.noResult
      }
    })
  }
  reinitResult() {
    this.result_songs = []
    this.result_albums = []
    this.result_singers = []
    this.result_songlists = []
    this.result_stations = []
  }
  reInitHasTag() {
    this.hasSongs = resultState.init
    this.hasAlbum = resultState.init
    this.hasSingers = resultState.init
    this.hasSonglists = resultState.init
    this.hasStations = resultState.init
  }
  changeToLoaidingState() {
    this.hasSongs = resultState.wait
    this.hasAlbum = resultState.wait
    this.hasSingers = resultState.wait
    this.hasSonglists = resultState.wait
    this.hasStations = resultState.wait
  }
  @Watch('value')
  onValueChange(nWord: string) {
    // 如果用户删除了关键词，需要重新回归初始状态，关闭结果展示组件
    if (!nWord) {
      this.activeSearchResult = false
      this.reinitResult()
      this.reInitHasTag()
      return
    }
    // 激活结果组件中，只需要重新获取一遍结果
    if (this.activeSearchResult) {
      this.debGetSearchResult(nWord)
      return
    }

    this.advices = {}
    this.debGetAdvice(nWord)
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'

.search
  width 100%
  background-color rgb(250,250,250)
  position relative
  .loading
    margin-top 5rem
  .top
    width 90%
    margin 0 auto
    position absolute
    margin-left 5%
    z-index 10
    .advice-list
      font-size .8rem
      .title
        color $color-font-link-blue
      .advice
        background #fff
        commonBorder()
        height 2rem
        display flex
        align-items center
        padding 0 .5rem
        border-top none
        cursor pointer
        .icon
          color #aaa
          margin-right .5rem
    .bar
      margin 0 auto
      display flex
      align-items center
      margin-top 1rem
      padding .3rem .5rem
      background #fff
      commonBorder()
      color #ccc
      .s
        flex-grow 100
        height 1.5rem
        outline none
        font-size .85rem
        color #666
      .del
        width 1rem
        margin-right .5rem
        cursor pointer
      .icon
        color #999
        cursor pointer
  .body
    width 90%
    margin 4.5rem auto 0 auto
    display flex
    justify-content space-between
    .hot-search
      width 45%
      text-align left 
      .title
        padding-bottom .5rem
        margin-bottom .5rem
        color rgb(100,100,100)
        font-size .9rem
        text-align left 
        border-bottom 1px solid $color-border-grey
      .key
        font-size .8rem
        color rgb(50,50,50)
        height 1rem
        cursor pointer
        display inline-flex
        line-height 1rem
        align-items center
        commonBorder()
        display inline-block
        padding .3rem .5rem
        margin-top .3rem
        margin-right .3rem
        border-radius 1rem
    .history
      width 45%
      .his-view
        height calc(100vh - 11.8rem)
        width 100%
      .title
        display flex
        justify-content space-between
        align-items center
        padding-bottom .5rem
        margin-bottom .5rem
        color rgb(100,100,100)
        font-size .9rem
        text-align left 
        border-bottom 1px solid $color-border-grey
        img
          width 1rem
          cursor pointer
      .list
        .item
          display flex
          justify-content space-between
          width 100%
          align-items center
          padding .3rem 0
          cursor pointer
          color rgb(50,50,50)
          font-size .85rem
          .del
            width 1rem
            // margin-right .5rem
            cursor pointer

.result
  width 90%
  margin 4.5rem auto 0 auto
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
  .result-view
    height calc(100vh - 12.9rem)
    margin-top 1rem
    .tips
      color $color-font-grey-title
      font-size .7rem
    .songs
      position: relative
      padding-right: 24px !important
      padding-bottom: 24px !important
      .song
        padding-right .5rem
        cursor pointer
        &:nth-child(odd)
          background-color rgb(244,244,244)
        &:hover
          background-color rgb(244,244,244)
    .singers
      position: relative
      padding-right: 24px !important
      padding-bottom: 24px !important
      .singer
        height 3.4rem
        display flex
        align-items center
        padding-left .5rem
        cursor pointer
        &:nth-child(odd)
          background-color rgb(244,244,244)
        &:hover
          background-color rgb(244,244,244)
        .avatar 
          width 2.4rem
        .name
          margin-left .5rem
          font-size .77rem
        .alias
          font-size .7rem
          color $color-font-grey-title
          margin-left .5rem
    .albums
      width 100%
      position: relative
      padding-right: 24px !important
      padding-bottom: 24px !important
      .album
        display flex
        height 3.4rem
        cursor pointer
        &:nth-child(odd)
          background-color rgb(244,244,244)
        &:hover
          background-color rgb(244,244,244)
        .header
          width 70%
          display flex
          align-items center
          .avatar
            margin 0 .5rem
            width 2.3rem
          .name
            text-overflow ellipsis
            overflow hidden
            flex-grow 10
            text-align left
            white-space nowrap
            font-size .8rem
        .tail
          flex-grow 0
          display flex
          align-items center
          width 30%
          font-size .8rem
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          .s-alias
            font-size .7rem
            color $color-font-grey-title
    .stations
      width 100%
      position: relative
      padding-right: 24px !important
      padding-bottom: 24px !important
      .station
        height 3.4rem
        display flex
        align-items center
        padding-left .5rem
        cursor pointer
        &:nth-child(odd)
          background-color rgb(244,244,244)
        &:hover
          background-color rgb(244,244,244)
      .avatar
          margin 0 .5rem
          width 2.3rem
      .name
        font-size .8rem
    .songlists
      position: relative
      padding-right: 24px !important
      padding-bottom: 24px !important
      .songlist
        display flex
        align-items center
        height 3.4rem
        width 100%
        cursor pointer
        &:nth-child(odd)
          background-color rgb(244,244,244)
        &:hover
          background-color rgb(244,244,244)
        .header
          width 50%
          display flex
          align-items center
          flex-grow 10
          .avatar
            margin 0 .5rem
            width 2.3rem
          .name
            font-size .8rem
            text-overflow ellipsis
            overflow hidden
            flex-grow 10
            text-align left
            white-space nowrap
        .body
          height 100%
          display flex
          align-items center
          width 45%
          margin 0
          padding 0 .5rem 0 .7rem
          @media (max-width 700px) 
            display none
          > span
            font-size .7rem
            color $color-font-grey-title

::-webkit-input-placeholder { /* WebKit browsers */
    color:    #ccc;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #ccc;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #ccc;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #ccc;
}

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
