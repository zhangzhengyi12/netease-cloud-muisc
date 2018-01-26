<template>

  <div class="bar" :class="{mini:isMini}">

    <span class="toggle-bar" @click="toggleBar">
      <option-item :iconCls="'i_menu'"></option-item>
    </span>

    <v-bar class="wrapper" :class="{mini:isMini}" :autoHide="3000">
      <div id="content">
        <div v-for="(list,index) in publicList" :key="index" class="list base-list">
          <h5 v-show="list.title&&!isMini" class="title">{{ list.title }}</h5>
          <ul v-show="!list.title || !isMini">
            <!-- 在mini模式下 二级列表的检查将不会通过 所以不会展示 -->
            <li v-for="(item,index) of list.list" :key="index">
              <option-item :nameZh="item.name_zh" :name="item.name"  :id="item.id" :iconCls="item.iconCls" :isActive="currActive(item.id)" :isMini="isMini" @click="onSelectItem"></option-item>
            </li>
          </ul>
        </div>
        <span class="Arraw" v-show="isMini" @click="toggleBar">
          <option-item :iconCls="'i_right'"></option-item>
        </span>

        <!-- 如果用户没有登陆就用替代的资源 -->

        <!-- 歌单的渲染 ，未登录则放弃渲染 -->

        <div class="play-list" v-show="userPlaylist && !isMini">
          <div v-for="(group,index) of userPlaylist" :key="index">
            <h5 class="title">{{group.title}}</h5>
            <ul>
              <li v-for="(item,index) of  group.list" :key="index">
                <option-item :nameZh="item.name" :id="item.id" :iconCls="'i_music_18'" :isActive="currActive(item.id)" :isMini="isMini" @click="onSelectItem"></option-item>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </v-bar>
    <div class="user" :class="{mini:isMini}">
      <span class="avatar">
        <img :src="[loginState.isLogin ? loginState.userState.profile.avatarUrl : '']" alt="">
      </span>
      <span class="user-name" v-show="!isMini">{{ loginState.isLogin ? loginState.userState.profile.nickname : '未登陆'}}</span>
      <i class="i_mail icon"></i>
      <i class="i_recommend icon-end icon"></i>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import VBar from 'v-bar'
import Component from 'vue-class-component'
import { InitOptions } from 'common/js/initData'
import OptionItem from 'base/Option/Option.vue'
import { State } from 'vuex-class'
import { getUserPlaylist } from 'api/option-bar'
import normalizePlayList from 'common/js/playList'
import { Watch } from 'vue-property-decorator'

// TODO: 可能需要一个强制性的Mini 做一些脱离文档流的动作
const MINI_WIDTH: number = 650
const OK_CODE: number = 200
const BASE_ID_LIMIT: number = 100

@Component({
  name: 'options-bar',
  components: {
    OptionItem,
    VBar
  }
})
export default class App extends Vue {
  isMini: boolean = false
  activeID: number = 1
  publicList = InitOptions
  userPlaylist: any = null
  @State('userLoginState') loginState: any
  @State('viewport') viewport: any

  mounted() {
    this.checkNeedMini()
    // 如果用户已经登录，那么获取用户的歌单
    if (this.loginState.isLogin) {
      this.getPlaylist()
    }
  }

  toggleBar(e: any): void {
    // 根据不同IDType 来调动路由进行页面组件的展示
    this.isMini = !this.isMini
  }
  onSelectItem(item: { name: string; id: number }) {
    this.activeID = item.id
    // 如果是基本组件，就直接pushname
    if (item.id < BASE_ID_LIMIT) {
      this.toggleBaseComponent(item.name)
    } else {
      this.toggleSonglist(String(item.id))
    }
  }
  currActive(id: number) {
    return id === this.activeID
  }
  toggleBaseComponent(name: string) {
    this.$router.push(`/${name}`)
  }
  toggleSonglist(id: string) {
    id = id.toString()
    this.$router.push({ name: 'songlistDetail', params: { id } })
  }
  getPlaylist() {
    const userID = this.loginState.userState.profile.userId
    getUserPlaylist(userID).then(
      (res: any) => {
        if (res.body.code === OK_CODE) {
          this.userPlaylist = normalizePlayList(res.body.playlist)
        }
      },
      (err: any) => {
        this.$message('获取歌单出错，请稍后再试')
      }
    )
  }
  checkNeedMini() {
    if (this.viewport.width < MINI_WIDTH) {
      this.isMini = true
    } else {
      this.isMini = false
    }
  }
  @Watch('viewport')
  onViewPortChange(val: any) {
    this.checkNeedMini()
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
.wrapper
  width 12rem
  height calc(100vh - 50px - 1.8rem - 3.3rem - 3rem)
  &.mini
    width 3rem
    #content
      padding-right 24px !important
  .bar--vertical
    margin-right 0 !important
    .bar--vertical-internal
      transition all 0.1s
  #content
    padding-right 0 !important
    .bottom-h
      height 5rem
.bar
  // width 12rem
  flex-shrink 0
  flex-grow 1
  align-self flex-start
  padding 0.5rem 0 0 0
  text-align left
  background $color-background-grey
  position relative
  border-right 1px solid #ccc
  .Arraw
    // width 2rem
  // transition width 0.3s cubic-bezier(0, 1, 0.34, 0.95)
  &.mini
    width 2rem
  .title
    color $color-font-grey
    font-size 0.6rem
    margin 0.6rem
  .list
    margin-top 1rem
.user
  position absolute
  height 3.3rem
  width 100%
  border-right 1px solid #ccc
  background $color-background-grey
  z-index 10
  border-top 1px solid #ccc
  bottom -3.3rem
  display flex
  flex-direction row
  justify-content space-around
  align-items center
  font-size 0.7rem
  color $color-font-black
  &.mini
    .avatar
      img
        margin 0.5rem 0
    flex-direction column
    height 7.1rem
    justify-content center
    .icon
      margin 0.5rem 0
      &.icon-end
        margin 0.5rem 0
  .user-name
    margin-left -0.3rem
  .icon
    font-size 0.9rem
    &.icon-end
      margin-right 1rem
  .avatar
    img
      max-width 1.6rem
      border-radius 50%
      margin 0 0.3rem
</style>
