<template>
<div class="singer">
  <div class="index">
    <div class="index-item" 
    v-for="(item,index) of indexMap"
    :key="index"
    :class="{active:index===currentIndex}"
     @click="toggleIndex(item)"
    >{{item}}
    </div>
  </div>
  <div class="singer-list">
    <music-item
    v-for="(item,index) of currentSingerlist"
    :index = "index"
    :key = "index"
    :data="singerListToMusicItemAdapter(item)"
    class="singer-item" @click="toggleSingerDetail(item)"></music-item>
  </div>
</div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getArtists } from 'api/singer.ts'
import { musicItemMixin } from '@/mixins/mixins.ts'
import { AZMap } from 'common/js/secondaryData.ts'
interface allSinger {
  [props: string]: { cate: string; list: Array<any> }
}
@Component({
  name: 'singer',
  mixins: [musicItemMixin]
})
export default class App extends Vue {
  indexMap = AZMap
  currentIndex = 0
  currentSingerlist: Array<any> = []
  allSinger: allSinger = { init: { cate: '', list: [] } }
  mounted() {
    getArtists().then(
      (res: any) => {
        this.allSinger = res
        this.currentSingerlist = res['热门'].list
      },
      (err: any) => {
        this.$message('获取歌手错误')
      }
    )
  }
  singerListToMusicItemAdapter(item: any) {
    return {
      name: item.name,
      picUrl: item.img1v1Url
    }
  }
  toggleIndex(index: string) {
    this.currentSingerlist = this.allSinger[index].list
  }
  toggleSingerDetail(s:any){
    this.$router.push({ name: 'singerDetail', params: { id: s.id } })
  }
}
</script>

<style lang='stylus'>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.singer 
  width 90%
.index
  display flex
  flex-direction row
  flex-wrap wrap
  .index-item
    padding 0 1rem
    margin-top 1rem
    font-size .7rem
    color $color-font-grey-title
    &.active
      color $color-font-red
    &:nth-child(n + 1){
      border-right 1px solid $color-border-grey
    }
    &:last-child
      border-right none
    &:hover
      color #ccc

.singer-list
  display flex
  flex-wrap wrap
  .singer-item
    width 20%
</style>
