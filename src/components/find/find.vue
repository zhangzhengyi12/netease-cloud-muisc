<template>
  <div class="find">
    <h3 class="title">发现音乐</h3>
    <ul class="link-group">
      <li class="link" v-for="(link,index) of baseMenuData" :key="index" @click="toggleRouter(link.componentName,index)" :class="{active: activeId === index}">{{ link.title }}</li>
      <!-- border 为了重叠 破坏一下结构   -->
      <div class="border"></div>
    </ul>
    <v-bar id="view" ref='vbar' autoHide="3000">
      <transition name='fade' mode="out-in">
        <keep-alive>
          <router-view class="content"></router-view>
        </keep-alive>
      </transition>
    </v-bar>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { routers } from 'common/js/initData'
import { Watch } from 'vue-property-decorator'
import VBar from 'v-bar'

interface Vbar extends Vue {
  toggleHide(): void
  hide(): void
}
@Component({
  name: 'find',
  components: {
    VBar
  }
})
export default class App extends Vue {
  activeId = -1
  baseMenuData = routers

  mounted() {
    this.initActiveRoute()
  }
  toggleRouter(name: string, index: number) {
    this.$router.push({
      name
    })
    this.activeId = index
    // 重新激活一下滚动组件
    ;(this.$refs.vbar as Vbar).hide()
  }
  initActiveRoute() {
    this.baseMenuData.forEach((el: any, index: any) => {
      if (el.componentName === this.$router.app.$route.name) {
        this.activeId = index
      }
    })
  }
  @Watch('$route')
  onRouteChange(route: any) {
    let index = this.baseMenuData.findIndex((item: any) => {
      return item.componentName === route.name
    })
    this.activeId = index
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.find
  padding 1rem 1.5rem
  .title
    font-size 0.6rem
    text-align left
    color $color-font-grey-title
  .link-group
    display flex
    justify-content flex-start
    margin-top 0.5rem
    font-size 0.82rem
    position relative
    box-sizing content-box
    .border
      position absolute
      height 1px
      width 100%
      bottom 0px
      background $color-border-grey
    .link
      padding 0.6rem
      cursor pointer
      color $color-font-black-h2
      box-sizing content-box
      &.active
        color $color-font-red
        border-bottom 2px solid $color-font-red
#view
  viewStyle()
  .content
    position relative
    padding-right 24px !important
    padding-bottom 24px !important
.fade-leave-to
  opacity 0
  transform translateX(-80px)
.fade-enter
  opacity 0
  transform translateX(80px)
.fade-enter-active
  transition all 0.5s
.fade-leave-active
  transition all 0.3s
</style>
