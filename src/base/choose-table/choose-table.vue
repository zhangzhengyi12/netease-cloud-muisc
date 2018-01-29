<template>

<div class="choose-table">
  <click-anima>
    <div class="mini-table" @click="toggleDisCom">
    {{tag}}
    <i class="i_down"></i>
    </div>
  </click-anima>
  <transition name="fade-in">
  <v-bar id="wrapper" @whell.stop vBar="v-bar" v-if="needDisCom">
    <!-- 最大选项 -->
    <div class="compon-table">
      <div class="all">
      <choose-item class="all-choose" :data='{value:"全部",isHot:"false"}'  :isActive="'全部' === tag"></choose-item>
      </div>
      <div v-for="(cate,index) of table" class="cate" :key="index">
        <div class="title">
          <i :class="chooseIcon(cate.title)" class="icon"></i>
          {{'   '+ cate.title}}
        </div>
        <div class="body">
          <choose-item
          v-for="(item,index) of cate.list"
          :key="index"
          :data="item"
          :isActive="item.value === tag"
          @select="onSelect"
          ></choose-item>
        </div>
      </div>
    </div>
  </v-bar>
  </transition>
  <!-- 遮罩层 -->
  <div class="mask" v-if="needDisCom" @click="toggleDisCom"></div>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ClickAnima from 'base/click-anima/click-anima.vue'
import ChooseItem from 'base/choose-item/choose-item.vue'
import VBar from 'v-bar'

interface chooseItem {
  value: string
  isHot: boolean
  isActive: boolean
}

interface chooseList {
  title: string
  list: Array<chooseItem>
}
@Component({
  name: 'chooseTable',
  components: {
    ClickAnima,
    ChooseItem,
    VBar
  }
})
export default class App extends Vue {
  @Prop() table: Array<chooseItem>
  @Prop() tag: string
  value: string = '全部歌单'
  needDisCom: boolean = false
  mounted() {}
  chooseIcon(title: string) {
    switch (title) {
      case '语种':
        return 'i_global'
      case '风格':
        return 'i_piano_music'
      case '场景':
        return 'i_cup'
      case '情感':
        return 'i_smile'
      case '主题':
        return 'i_theme'
    }
  }
  onSelect(value: string) {
    this.tag = value
    this.$emit('toggleTag', this.tag)
    this.needDisCom = false
  }
  toggleDisCom() {
    this.needDisCom = !this.needDisCom
  }
}
</script>

<style lang='stylus'>

@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'


.choose-table
  flex-shrink 0
  .mini-table
    font-size .6rem
    padding .2rem .4rem
    commonBorder()
    background #fff
    margin-top 1.2rem
  .compon-table
    position absolute
    z-index 999
    background #fff
    width 100%
    display flex
    flex-direction column
    .all
      border-bottom 1px solid #ccc
      .all-choose
        width 10rem
        margin 1rem 0 1rem 1rem
    .cate
      display flex
      flex-direction row
      flex-wrap nowrap
      align-items flex-start
      margin-top 1rem
      .title
        width 15%
        text-align center
        font-size .7rem
        color $color-font-red
        display flex
        flex-shrink 0
        align-items center
        min-width 3.5rem
        justify-content center
        .icon
          font-size 1.2rem
          margin-right .5rem
      .body
        width 85%
        display  flex
        flex-wrap wrap
        justify-content flex-start
        align-content flex-start
#wrapper
  width 60%
  max-width 550px
  height 300px
  min-width 250px
  margin-top 1rem
  border 1px solid #ccc
  position absolute
  z-index 99
  .v-bar.bar--vertical
    margin-right 1px !important
    z-index 9999
    margin-right 20px
  .bar--wrapper
    padding-right 0 !impor

.mask
  mask()

.fade-in-enter,.fade-in-leave-to
  transform translate(0,-20px)
  opacity 0
.fade-in-enter-active,.fade-in-leave-active
  transition all .4s

</style>
