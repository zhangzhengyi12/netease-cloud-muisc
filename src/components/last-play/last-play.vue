<template>

  <v-bar class="last-play" autoHide="3000">
    <div class="content">
      <div class="title">最近播放</div>
      <div class="last-view">
        <song-list-view :tracks="playHistory" :clear="true" @clear="clearPlayHistory" />
      </div>
    </div>
  </v-bar>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation } from 'vuex-class'
import SongListView from 'components/song-list-view/song-list-view'
import VBar from 'v-bar'
@Component({
  name: 'lastPlay',
  components: { SongListView, VBar }
})
export default class App extends Vue {
  @Getter('playHistory') playHistory: any
  @Mutation('SET_PLAY_HISTORY') setPlayHistory: any
  clearPlayHistory() {
    this.$confirm('您确定要清除历史播放记录吗?', '最近播放', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '清除播放记录成功!'
      })
      this.setPlayHistory([])
    })
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
.last-play
  height calc(100vh - 1.5rem - 62px)
  .content
    width 94%
    margin 0 auto
    padding-top 1rem
    .title
      text-align left
      font-size 0.7rem
      color $color-font-black
</style>