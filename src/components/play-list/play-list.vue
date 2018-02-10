<template>

  <div class="playlist">
    <div class="header-bar">
      <div class="title">播放列表</div>
      <div class="tail">
        <div class="clear" @click="clearPlaylist">
          <img :src="IMG_CLEAR" alt="">
          <span class="text">清空</span>
        </div>
        <div class="close" @click="$emit('close')">
          <img :src="IMG_CLOSE" alt="">
        </div>
      </div>
    </div>
    <v-bar id="view">
      <div class="list-view">
        <div v-for="(track,index) of playlist" class="track" :key="index">
          <song-view :key="index" :index="index" :track="track" :type='1' :highLight="index === currentIndex" @click="togglePlay(index)">
          </song-view>
          <img :src="IMG_CLOSE" class="delete" @click.stop="del(index)" alt="删除歌曲">
        </div>
      </div>
    </v-bar>
  </div>

</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import VBar from 'v-bar'
import { Getter, Mutation, Action } from 'vuex-class'
import SongView from 'base/song-view/song-view.vue'
@Component({
  name: 'playList',
  components: {
    VBar,
    SongView
  }
})
export default class App extends Vue {
  @Getter('playlist') playlist: any
  @Getter('currentIndex') currentIndex: number
  @Mutation('SET_PLAYING_STATE') setPlayState: any
  @Mutation('SET_CURRENT_INDEX') setCurrentIndex: any
  @Action('deleteSong') deleteSong: any
  @Action('clearPlayList') clearList: any
  IMG_CLEAR = require('@/assets/clear.svg')
  IMG_CLOSE = require('@/assets/close.svg')
  togglePlay(index: number) {
    this.setCurrentIndex(index)
    this.setPlayState(true)
  }
  del(index: number) {
    this.deleteSong(this.playlist[index])
  }
  clearPlaylist() {
    this.$confirm('您确定要清除播放列表吗?', '播放列表', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '清除播放列表成功!'
      })
      this.clearList()
    })
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/mixins.styl'
@import '~common/css/variable.styl'
.playlist
  width 400px
  background #fff
  commonBorder()
  .header-bar
    display flex
    justify-content flex-start
    border-bottom 1px solid $color-border-grey
    .title
      font-size 0.8rem
      height 2rem
      width 50%
      justify-content flex-start
      margin-left 1.5rem
      display flex
      align-items center
      color rgb(100, 100, 100)
  .tail
    width 50%
    display flex
    justify-content space-around
    align-items center
    .clear
      display flex
      align-items center
      cursor pointer
      & > img
        width 1rem
      .text
        font-size 0.6rem
        color rgb(100, 100, 100)
    .close
      font-size 0.8rem
      color rgb(100, 100, 100)
      cursor pointer
      img
        width 1rem
.list-view
  .track
    position relative
    cursor pointer
    &:nth-child(odd)
      background-color rgb(244, 244, 244)
    &:hover
      background-color rgb(244, 244, 244)
      .delete
        display inline-block
        width 1rem
        position absolute
        right 0px
        top 50%
        margin-top -0.5rem
        cursor pointer
        &:hover
          filter brightness(80%)
    .delete
      display none
#view
  margin 0 auto
  width 100%
  height 400px
</style>
