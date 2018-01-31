<template>
  <div class="host-station">
    <div class="cate-list">
      <cate
      v-for="(cate,index) of catelist"
      :key="index"
      :name="cate.name"
      :picUrl="cate.pic84x84IdUrl"
      @click="selectCate(cate)"
      class="cate"></cate>
    </div>
    <tip-title title="电台推荐" iconCls="i_music"></tip-title>
    <div class="recommend-djs">
      <loading v-if="recommendDjs.length ===0" style="margin:3rem auto"/>
    <music-item v-for="(item,index) of recommendDjs"
    @click="selectDj(item)"
    class="dj"
    :data="item"
    :key="index"
    :index="index"
    >
    </music-item>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getDjCatelist, getDjRecommend, getCateRecommend } from 'api/host-station'
import { configMixin, musicItemMixin } from '@/mixins/mixins'
import Cate from 'base/cate/cate.vue'
import TipTitle from 'base/tip-title/tip-title.vue'
import Loading from 'base/loading/loading.vue'
@Component({
  name: 'hostStation',
  mixins: [configMixin, musicItemMixin],
  components: {
    Cate,
    TipTitle,
    Loading
  }
})
export default class hostStation extends Vue {
  catelist = []
  recommendDjs = []
  mounted() {
    this.getDjCatelistData()
    this.getDjRecommendData()
  }
  getDjCatelistData() {
    getDjCatelist().then(
      (res: any) => {
        if (res.body.code === this.CODE_OK) {
          this.catelist = res.body.categories
        }
      },
      (err: any) => {}
    )
  }
  getDjRecommendData() {
    getDjRecommend().then(
      (res: any) => {
        if (res.body.code === this.CODE_OK) {
          this.recommendDjs = res.body.djRadios
        }
      },
      (err: any) => {
        this.$message('获取电台推荐失败')
      }
    )
  }
  getCateRecommendData(type: number) {
    getCateRecommend(type).then(
      (res: any) => {
        if ((res.body.code = 200)) {
          this.recommendDjs = res.body.djRadios
        }
      },
      (err: any) => {}
    )
  }
  selectCate(cate: any) {
    this.recommendDjs = []
    this.getCateRecommendData(cate.id)
  }
  selectDj(item: any) {
    let id: any = item.id
    this.$router.push({ name: 'stationDetail', params: { id } })
  }
}
</script>

<style lang='stylus' scoped>
.host-station
  width 90%
  margin 0 auto
.cate-list
  display flex
  flex-direction row
  flex-wrap wrap
  .cate
    width 12.5%
    margin-top .8rem
    min-width 4rem
    cursor pointer
.recommend-djs
  display flex
  flex-wrap wrap
  padding-bottom 2rem
  .dj
    width 20%
    @media screen and (max-width 900px) and (min-width 550px){
      width 25%
      &:nth-child(n + 9){
        display none
      }
    }
    @media screen and (max-width 550px){
      width 33%
      &:last-child{
        display none
      }
    }
</style>
