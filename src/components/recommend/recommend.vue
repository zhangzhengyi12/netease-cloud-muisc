<template>
 <div class="recommend">
  <el-carousel v-if="banners" :interval="4000" :autoplay="false" height='0px'  :type="type" class="carousel" ref="carousel">
    <el-carousel-item v-for="(item,index) in banners" :key="index">
      <!-- 如果图片地址还未获取，先用一张 -->
      <h3 class="background-wrapper">
        <img :src="item.picUrl" alt="" class="background" ref="imgs" @load="upCarouselHeight(index)">
      </h3>
    </el-carousel-item>
  </el-carousel>
 </div> 
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import getBanner from 'api/banner.ts'
import { State } from 'vuex-class'
import { Watch } from 'vue-property-decorator'

const CODE_OK = 200

@Component({
  name: 'recommend'
})
export default class App extends Vue {
  banners = null
  type = 'card'

  @State('viewport') viewport: any
  mounted() {
    this.getBannerData()
  }
  upCarouselHeight(index: number) {
    let h = (this.$refs.imgs as Array<HTMLElement>)[index].offsetHeight
    ;((this.$refs.carousel as Vue).$el.firstChild as HTMLElement).style['height'] = `${h}px`
  }
  getBannerData() {
    getBanner().then(
      (res: any) => {
        if ((res.body.code = CODE_OK)) {
          this.banners = res.body.banners
        }
      },
      (err: any) => {
        this.$message('获取banner出错')
      }
    )
  }

  @Watch('viewport')
  onViewportChange() {
    this.upCarouselHeight(0)
  }
}
</script>

<style lang='stylus'>


.carousel
  margin-top 1rem


.background
  width 100%



</style>
