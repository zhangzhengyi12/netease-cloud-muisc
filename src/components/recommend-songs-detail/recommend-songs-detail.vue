<template>

<div class="rec-songs">
  <div class="content">
    <div class="top">
      <div class="avatar">
        <span class="month">{{12}}</span>
      </div>
      <div class="message">
        <h1 class="title">每日歌曲推荐</h1>
        <span class="desc">根据你的音乐口味生成，每天6：00更新</span>
      </div>
    </div>
    <song-list-view class="songs-view" :tracks="songs" v-if="songs.length !== 0" />
    <loading v-if="disLoading"/>
  </div>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getRecommendSongs } from 'api/recommend.ts'
import { Pagination } from '../../../node_modules/_element-ui@2.0.11@element-ui'
import SongListView from 'components/song-list-view/song-list-view.vue'
import loading from 'base/loading/loading.vue'
@Component({
  name: 'recommendSongsDetail',
  components: { SongListView, loading }
})
export default class App extends Vue {
  songs = []
  disLoading = true
  get calcMonth() {
    return new Date().Format('dd')
  }
  mounted() {
    this.getRecommendSongsData()
  }
  getRecommendSongsData() {
    getRecommendSongs().then((res: any) => {
      if (res.body.code === 200) {
        this.songs = res.body.recommend
        this.disLoading = false
      }
    })
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'

.rec-songs
  .content
    width 94%
    margin-top 2rem
    margin 0 auto
    .top
      margin-top 1rem
      display flex
      align-items center
      .avatar
        width 5rem
        height 5rem
        display flex
        justify-content center
        align-items center
        commonBorder()
        .month
          font-size 2rem
          color $color-theme-red
      .message
        display flex
        justify-content flex-start
        flex-direction column
        align-items flex-start
        margin-left 1rem
        .title
          font-size 1.2rem
          color #444
        .desc
          margin-top 1rem
          font-size .8rem
          color #888
.songs-view
  margin-top 2rem !important
</style>
