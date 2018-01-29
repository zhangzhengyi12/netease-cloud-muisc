<template>
  <div id="app">
    <m-header></m-header>
    <div class="content-box">
    <options-bar class="options"></options-bar>
    <router-view class="appview"/>
    </div>
    <!-- <Login :show="true" @login="login"></Login> -->
    <player></player>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import MHeader from 'components/header/header.vue'
import OptionsBar from 'components/options-bar/options-bar.vue'
import initOptions from 'common/js/initData.ts'
import Login from 'components/login/login.vue'
import Player from 'components/player/player.vue'
import { userLogin, zhijie } from 'api/login.ts'
import throttle from 'common/js/util'
import { State, Action, Mutation } from 'vuex-class'

@Component({
  name: 'App',
  components: {
    MHeader,
    OptionsBar,
    Login,
    Player
  }
})
export default class App extends Vue {
  @State('userLoginState') loginState: any
  @Action('changeUserLoginState') changeloginState: any
  @Mutation('SET_CLIENT_VIEWPORT') setViewport: any

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
  login(message: object) {
    userLogin(message).then(
      (res: any) => {
        if (res.body.code === 200) {
          this.changeloginState({
            isLogin: true,
            userState: res.body
          })
        }
      },
      (err: any) => {
      }
    )
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
</style>
