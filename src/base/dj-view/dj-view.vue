<template>

<div class="dj" @click="$emit('click')">
  <div class="body">
    <span class="index">{{index}}</span>
    <img class="cover" :src="data.coverUrl" alt="">
    <span class="name">{{data.name}}</span>
    <span class="play-count">播放: {{calcCountTrans(data.listenerCount)}}</span>
    <span class="like">赞 {{data.likedCount}}</span>
  </div>
  <div class="tail">
    <span class="date">
         {{transTime}}
    </span>
    <span class="time">
      {{caluTime(data.duration)}}
    </span>
  </div>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { timeAndArtisitMixin } from '@/mixins/mixins'
@Component({
  name: 'djView',
  mixins: [timeAndArtisitMixin]
})
export default class App extends Vue {
  @Prop() data: any
  @Prop() index: number
  calcCountTrans(count: number) {
    if (count <= 99999) {
      return count.toString()
    }
    return `${Math.floor(count / 10000)}万`
  }
  get transTime(): string | undefined {
    if (this.data) {
      return (new Date(this.data.createTime) as Date).Format('yyyy-MM-dd')
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
.dj
  display flex
  padding .5rem 0
  align-items center
  .body
    display flex
    align-items center
    width 65%
    .index
      width 2rem
      display flex
      justify-content center
      font-size .65rem
    .cover
      width 2.5rem
    .name
      width 40%
      padding 0 .5rem
      text-align left 
      flex-grow 100
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      font-size .8rem
    .play-count
      flex-shrink 0
      font-size .7rem
      margin-left .5rem
      color $color-font-grey-title
    .like
      flex-shrink 0
      margin-left .5rem
      font-size .7rem
      color $color-font-grey-title
  .tail
    width 35%
    display flex
    justify-content flex-end
    font-size .7rem
    .date
      font-size .7rem
      margin-right .5rem
      color $color-font-grey-title
    .time
      margin-right .5rem
      color $color-font-grey-title

</style>
