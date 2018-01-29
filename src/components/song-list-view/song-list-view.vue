<template>

<div class="list-view">
  <song-view class="track"
  v-for="(track,index) of tracks" 
  :key="index" 
  :index="index"
  :track="track"
  @click="togglePlay"></song-view>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import SongView from 'base/song-view/song-view.vue'
import { Action } from 'vuex-class'
@Component({
  name: 'songListView',
  components: {
    SongView
  }
})
export default class App extends Vue {
  @Prop() tracks: tracks
  @Action('selectPlay') selectPlay:any
  togglePlay(index: number): void {
    this.selectPlay({list:this.tracks, index})
  }
}
</script>

<style lang='stylus' scoped>

.list-view
  margin-top 1rem
  .track
    cursor pointer
    &:nth-child(odd)
      background-color rgb(244,244,244)
    &:hover
      background-color rgb(244,244,244)
</style>
