<template>

<div class="progress-bar">
<div class="outer" ref="road" @click.stop="onClick">
  <div class="inner" :style="`width:${leftOffset}px`">
    <span class="pointer" :style="`left:${leftOffset}px`"  @mousedown.stop="addMouseListener">
      <img :src="IMG_LOADING" v-if="loading" alt="" class="loading">
    </span>
  </div>
</div>
</div>

</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
const MIN_OFFSET = 2
@Component({
  name: 'progress-bar'
})
export default class App extends Vue {
  @Prop() percent: number
  @Getter('viewport') viewport: any
  @Prop() loading: boolean
  @Prop() instant: boolean
  percentTmp: number = 0
  leftOffset = 0
  mouseInitPos: { x: number; y: number; o: number } = { x: 0, y: 0, o: 0 }
  mouseMoveTag = false
  roadWidth = 0
  IMG_LOADING = require('@/assets/loading.svg')
  @Watch('percent')
  onPercentChangea(per: number) {
    this.reCalcOffset(per)
  }
  mounted() {
    this.$nextTick(() => {
      this.updadeRoadWidth()
    })
  }
  updadeRoadWidth() {
    if (!this.$refs.road || this.mouseMoveTag) return
    let w = (this.$refs.road as HTMLElement).clientWidth
    this.roadWidth = w
    this.reCalcOffset(this.percent)
  }
  reCalcOffset(per: number) {
    let offset = this.roadWidth * per
    if (this.mouseMoveTag) return
    // 三种情况 1 正常情况，大于三个像素开始更改 2 视口发生改变，所以是附属 3 切换歌曲的时候为0
    if (offset - this.leftOffset > MIN_OFFSET || offset - this.leftOffset < 0 || offset <= 0) {
      this.leftOffset = offset
    }
  }
  addMouseListener(e: MouseEvent) {
    // 重新获取一下进度条的宽度
    this.updadeRoadWidth()
    this.mouseInitPos = { x: e.pageX, y: e.pageY, o: this.leftOffset }
    this.mouseMoveTag = true
    window.addEventListener('mousemove', this.onMouseChange, false)
    window.addEventListener('mouseup', this.clearMouseListener, false)
  }
  clearMouseListener(e: MouseEvent) {
    this.mouseInitPos = { x: 0, y: 0, o: this.leftOffset }
    window.removeEventListener('mousemove', this.onMouseChange, false)
    window.removeEventListener('mouseup', this.clearMouseListener, false)
    this.updatePercent(this.percentTmp)
    // 延迟关闭 否则会出现outer的click事件也被触发
    setTimeout(() => {
      this.mouseMoveTag = false
    })
  }
  onMouseChange(e: any) {
    // 更新数值 一项是按钮的偏移 一项是进度 重新计算一遍
    const offset = e.pageX - this.mouseInitPos.x
    let nLeftOffset = this.mouseInitPos.o + offset
    if (nLeftOffset < 0) nLeftOffset = 0
    if (nLeftOffset > this.roadWidth) nLeftOffset = this.roadWidth
    let nPercent = nLeftOffset / this.roadWidth
    this.percentTmp = nPercent
    this.leftOffset = nLeftOffset
    // 需要立即上报
    if (this.instant) {
      this.updatePercent(nPercent)
    }
  }
  onClick(e: MouseEvent) {
    if (this.mouseMoveTag) return
    this.leftOffset = e.offsetX
    let nPercent = e.offsetX / this.roadWidth
    this.updatePercent(nPercent)
  }
  updatePercent(p: number) {
    this.$emit('percentChange', p)
  }
  @Watch('viewport')
  onResize() {
    this.updadeRoadWidth()
  }
}
</script>

<style lang='stylus'>

 @import '~common/css/variable.styl'
@import '~common/css/mixins.styl'

.progress-bar
  width 100%
  .outer
      width 100%
      height 2px 
      background rgba(200,200,200,.5)
      position relative
      cursor pointer
    .inner
      width 0
      background #de3434
      height 2px
      .pointer
        background #de3434
        cursor pointer
        position absolute
        left 0
        top -.3rem
        display inline-block
        width .2rem
        line-height 0
        height .2rem
        border-radius 50%
        border .25rem solid #fff
        box-shadow 0px 0px 0px 1px rgb(200,200,200,.5)
        .loading
          position absolute
          width 1.2rem
          height 1.2rem
          z-index 88
          top -.5rem
          left -.5rem
</style>
