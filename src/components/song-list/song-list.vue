<template>
  <div class="song-list"  @wheel="onWheel()" ref="songlist">

  <!-- 热门标签 -->
  <div class="choose-tag">
    <choose-table :table="allTag" :tag="tag" @toggleTag="selectTag" class="tag-table"></choose-table>
    <div class="hot-tag">
      <click-anima class="tag" v-for="(tag,index) of hotTag" @click="selectTag(tag)" :key="index">
        {{tag}}
      </click-anima>
    </div>
  </div>
  <!-- 歌单的渲染 -->
    <div class="playlists" ref="playlists">
      <music-item
      class="playlist"
      v-for="(playlist,index) of playlists"
      :key="index"
      :index="index"
      :data="playlist"
      @click="selectPlaylist(index)"
      ></music-item>
    </div>

    <div class="bottom-tips" v-if="noMoreData">没有更多数据！</div>
    <loading v-if="!noMoreData"></loading>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getHighqualityPlaylist } from 'api/song-list'
import MusicItem from 'base/music-item/music-item.vue'
import Loading from 'base/loading/loading.vue'
import ClickAnima from 'base/click-anima/click-anima.vue'
import throttle from 'common/js/util.ts'
import ChooseTable from 'base/choose-table/choose-table.vue'
import { hotTag, allTag } from 'common/js/secondaryData.ts'

const playlistPlaceholder = require('@/assets/logo.png')
const DEF_LIMIT = 30
const DEF_TAG = '全部'
const CODE_OK = 200
const NEED_MORE_PER = 0.35

interface vBar extends Vue {
  wrapperObj: { scrollTop: number; scrollHeight: number }
}

@Component({
  name: 'songList',
  components: {
    MusicItem,
    Loading,
    ClickAnima,
    ChooseTable
  }
})
export default class App extends Vue {
  currentTagMax = -1
  playlists: Array<any> = []
  tag = DEF_TAG
  hotTag = hotTag
  allTag = allTag
  noMoreData: boolean = false
  sameDataCount: number = 0
  requestLock: boolean = false
  sequenceList:any = []
  mounted() {
    this.getHighqualityPlaylistData()
  }
  getHighqualityPlaylistData(tag: string = DEF_TAG, limit: number = DEF_LIMIT) {
    if (this.requestLock) return
    // 用锁来避免因网络问题重复请求的问题
    this.requestLock = true
    getHighqualityPlaylist(tag, limit).then(
      (res: any) => {
        if (res.body.code === CODE_OK) {
          // 检测是否接口发生障碍，实际上已经不能获取更多数据,连续两次返回相同数据
          if (this.playlists.length === res.body.playlists.length) {
            this.currentTagMax = this.playlists.length
            this.noMoreData = true
            this.requestLock = true
            return
          }
          // 亦或者第一次请求即触发没有更多
          if (!res.body.more) {
            this.noMoreData = true
            this.currentTagMax = res.body.playlists.length
          }
          this.currentTagMax = Number(res.body.total)
          this.playlists = this.playlistDataToMusicItemDataAdapter(res.body.playlists)
          this.sequenceList = res.body.playlists
          this.requestLock = false
        }
      },
      (err: any) => {
        this.$message('获取歌单出错')
      }
    )
  }
  playlistDataToMusicItemDataAdapter(list: Array<{ name: string; coverImgUrl: string; creator: { nickname: string } }>) {
    list = list.slice()
    let result = list.map(item => {
      return {
        name: item.name,
        picUrl: item.coverImgUrl,
        artistName: 'by ' + item.creator.nickname
      }
    })
    return result
  }
  selectTag(tag: string) {
    this.reInitData()
    this.tag = tag
    this.getHighqualityPlaylistData(tag)
  }
  onWheel() {
    if (!(this.$parent as vBar).wrapperObj) return
    const top = (this.$parent as vBar).wrapperObj.scrollTop
    const height = (this.$parent as vBar).wrapperObj.scrollHeight
    if (this.needLoadMore(height, top)) {
      this.loadMore()
    }
  }
  reInitData() {
    this.currentTagMax = -1
    this.requestLock = false
    this.playlists = []
    this.sameDataCount = 0
    this.noMoreData = false
  }
  needLoadMore(height: number, top: number) {
    const per = top / height
    return per > NEED_MORE_PER
  }
  loadMore() {
    const cLength = this.playlists.length
    if (cLength < 1) return
    if (this.noMoreData) return
    this.getHighqualityPlaylistData(this.tag, cLength + DEF_LIMIT)
  }
  selectPlaylist(index: number) {
    const id: string = (this.sequenceList as Array<{ id: number }>)[index].id.toString()
    this.$router.push({ name: 'songlistDetail', params: { id } })
  }
}
</script>

<style lang='stylus' scoped>

@import '~common/css/variable.styl'

.song-list
  .choose-tag
    display flex
    flex-direction row
    align-items flex-start
    // align-content 
    .hot-tag
      display flex
      flex-direction row
      flex-wrap wrap
      padding-top 1rem
      cursor pointer
      .tag
        padding 0 .8rem
        font-size .6rem
        margin-top .5rem
        color $color-font-grey-title
        &:nth-child( n ){
          border-right 1px solid #ccc
        }
        &:last-child{
          border-right none
        }
  .playlists
      display flex
      flex-wrap wrap
      justify-content flex-start
      .playlist
        width 14.28571428571429%
        margin-top 1rem
        @media screen and (min-width 1600px){
          width 12.5%
        }
        @media screen and (min-width 1900px){
          width 10%
        }
        @media screen and (max-width 1200px) and (min-width 900px){
          width 20%
        }
        @media screen and (max-width 900px){
          width 25%
        }
  .bottom-tips
    font-size .8rem
    color #ccc
    margin 2rem auto
</style>
