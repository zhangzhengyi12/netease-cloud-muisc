<template>
  <div id="app">
    <m-header @back="routerBack"></m-header>
    <div class="content-box">
      <options-bar class="options" v-if="refreshBarTag" @openMenu="toggleDisMenu"></options-bar>
      <keep-alive>
        <router-view class="appview" v-if="refreshViewTag" />
      </keep-alive>
    </div>
    <!-- <Login :show="true" @login="login"></Login> -->
    <right-in-window class="window" :display="disRightWindow">
      <account @nowLogin="openLoginWindow" @loginOut="userLoginOut" />
    </right-in-window>
    <login @login="login" @close="disLoginWindow = false" v-if="disLoginWindow" />
    <player></player>
    <div class="mask" v-if="activeMask" @click="closeAll"></div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import MHeader from 'components/header/header.vue'
import OptionsBar from 'components/options-bar/options-bar.vue'
import initOptions from 'common/js/initData.ts'
import Account from 'components/account/account.vue'
import Player from 'components/player/player.vue'
import { userLogin, zhijie } from 'api/login.ts'
import Login from 'components/login/login.vue'
import throttle from 'common/js/util'
import { State, Action, Mutation } from 'vuex-class'
import RightInWindow from 'components/right-in-window/right-in-window.vue'
import { Loading } from '../node_modules/_element-ui@2.0.11@element-ui'

@Component({
  name: 'App',
  components: {
    MHeader,
    OptionsBar,
    Account,
    Player,
    RightInWindow,
    Login
  }
})
export default class App extends Vue {
  @State('userLoginState') loginState: any
  @Action('changeUserLoginState') changeloginState: any
  @Mutation('SET_CLIENT_VIEWPORT') setViewport: any
  disRightWindow: boolean = false
  disLoginWindow: boolean = false
  activeMask: boolean = false
  refreshBarTag: boolean = true
  refreshViewTag: boolean = true
  mounted() {
    window.onresize = throttle(this.checkUpdateViewport, 50)
    // zhijie()
  }
  checkUpdateViewport() {
    const view = {
      width: document.body.clientWidth,
      height: window.innerHeight
    }
    this.setViewport(view)
  }
  routerBack(){
    this.$router.back()
  }
  login(message: object) {
    this.disLoginWindow = false
    this.activeMask = true
    userLogin(message).then(
      (res: any) => {
        if (res.body.code === 200) {
          this.changeloginState({
            isLogin: true,
            userState: res.body
          })
          this.$message('登录成功')
          this.$nextTick(() => {
            this.loginChangeRefresh()
          })
        } else {
          this.$message('登录失败，请重试')
        }
        this.activeMask = false
      },
      (err: any) => {
        this.activeMask = false
        this.$message('登录失败，请重试')
      }
    )
  }
  closeAll() {
    this.disRightWindow = false
    this.disLoginWindow = false
    this.activeMask = false
  }
  userLoginOut() {
    this.changeloginState({
      isLogin: false,
      userState: {}
    })
    this.loginChangeRefresh()
    this.closeAll()
  }
  toggleDisMenu() {
    this.disRightWindow = !this.disRightWindow
    if (this.disRightWindow) {
      this.activeMask = true
    }
  }
  openLoginWindow() {
    this.disLoginWindow = true
    this.disRightWindow = false
  }
  loginChangeRefresh() {
    this.refreshViewTag = false
    this.refreshViewTag = true
    this.refreshBarTag = false
    this.refreshBarTag = true
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  .content-box
    display flex
    .appview
      width 100%
body
  background-color rgb(250, 250, 250)
  .window
    top 1.8rem
    bottom 60px
    right 0
    width 300px
    background-color rgb(250, 250, 250)
    position fixed
    z-index 100
    box-shadow -2px 0px 5px #aaa
  .mask
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background #fff
    opacity 0.3
    z-index 1
</style>
