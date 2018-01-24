<template>

<span class="cate-item">
  <img :src="picUrl" :alt="name">
  <span class="name">{{name}}</span>
</span>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component({
  name:'cate'
})

export default class App extends Vue{
  @Prop() name:string
  @Prop() picUrl:string
}
</script>

<style lang='stylus'>

@import '~common/css/variable.styl'

.cate-item
  display flex
  flex-direction column
  justify-content center
  align-items center
  img
    width 1.2rem
  .name
    color $color-font-grey-title
    font-size .6rem
    margin-top .2rem

</style>
