<template>

<div class="cd">
  <div class="wrapper" :class="{rotate:playing}" >
    <img :src="IMG_CD" alt="">
    <div class="content">
      <img :src="cdPicUrl" alt="">
    </div>
  </div>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
@Component({
  name:'cd'
})

export default class App extends Vue{
  @Prop() playing:boolean
  @Prop() cdPicUrl:string
  IMG_CD = require('@/assets/cd.svg')
}
</script>

<style lang='stylus' scoped>

.cd
  .wrapper
    position relative
    &.rotate
      animation: rotate 20s linear infinite;
    img
      width 300px
    .content
      img
        position absolute
        top 50%
        margin-top -80px
        left 50%
        margin-left -80px
        width 160px
        border-radius 50%

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.alert-enter, .alert-leave-to {
  opacity: 0;
}

.alert-enter-active, .alert-leave-active {
  transition: all 0.4s;
}
</style>