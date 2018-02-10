<template>
  <div class="rank">
    <div class="content">
      <div class="top">
        <h1 class="title">榜单</h1>
        <div class="ranks">
         <div class="rank" v-for="(rank,index) of ranks" :key="index" @click="toggleRankDetail(rank,index)">
           {{rank}}
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { ranks } from 'common/js/initData.ts'
@Component({
  name: 'App'
})
export default class App extends Vue {
  ranks = ranks
  toggleRankDetail(rank: any,index:any) {

    this.$router.push({ name: 'rankDetail', params: { name:rank,id:index } })
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.rank
  .content
    padding-top 1rem
    width 94%
    .top
      .title
        display flex
        font-size .8rem
      .ranks
        display flex
        flex-wrap wrap
        margin-top 1rem
        .rank
          height 20%
          padding .5rem 1rem
          background #ccc
          color #fff
          font-size .8rem
          margin .3rem
          cursor pointer
        
</style>
