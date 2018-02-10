<template>
  <div class="login" @click.stop>
    <div class="title">账号</div>
    <div class="recommend-login" v-if="!loginState.isLogin">
      <p class="desc">登录网易云音乐<br/>手机电脑多端同步，320k高音质无限下载</p>
      <button class="now-login" @click="$emit('nowLogin')">立即登录</button>
    </div>
    <div class="user" v-if="loginState.isLogin">
      <div class="body">
        <div class="avatar">
          <img :src="loginState.userState.profile.avatarUrl" alt=""> {{loginState.userState.profile.nickname}}
        </div>
        <span class="sign-in" @click="signIn">签到</span>
      </div>
    </div>
    <div class="server block">
      <a href="http://music.163.com/#/member" class="vip item" target="_blank">
        <div class="header">
          <img :src="IMG_VIP" alt=""> VIP会员
        </div>
        <img :src="IMG_RIGHT" alt="">
      </a>
      <a href="http://music.163.com/store/product" class="shop item " target="_blank">
        <div class="header">'
          <img :src="IMG_SHOP" alt=""> 积分商城
        </div>
        <img :src="IMG_RIGHT" alt="">
      </a>
    </div>
    <div class="info block">
      <div class="about item">
        <div class="header">
          <img :src="IMG_INFO" alt=""> 关于网易云音乐
        </div>
        <img :src="IMG_RIGHT" alt="">
      </div>
    </div>
    <div class="power-off block" v-if="loginState.isLogin">
      <div class="item login-out" @click="loginOut">
        <div class="header">
          <img :src="IMG_POWER" alt=""> 退出登录
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'
import { Prop } from 'vue-property-decorator'
import { signIn } from 'api/login.ts'
@Component({
  name: 'account',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
})
export default class App extends Vue {
  @Getter('loginState') loginState: any
  IMG_INFO = require('@/assets/info.svg')
  IMG_SHOP = require('@/assets/shop.svg')
  IMG_VIP = require('@/assets/vip.svg')
  IMG_RIGHT = require('@/assets/right.svg')
  IMG_POWER = require('@/assets/power.svg')
  login = {
    phone: '',
    password: ''
  }
  onLogin(e: object) {
    this.$emit('login', this.login)
  }
  signIn() {
    signIn().then(
      (res: any) => {
        if (res.body.code === 200) {
          this.$message('签到成功，获得 3 点 经验值')
        } else if (res.body.code === -2) {
          this.$message('你已经签到过了！')
        }
      },
      (err: any) => {
        this.$message('签到失败')
      }
    )
  }
  loginOut() {
    this.$confirm('您确定要退出登录吗?', '退出', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '退出登录成功!'
      })
      this.$emit('loginOut')
    })
  }
}
</script>

<style lang='stylus'>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
// .login
// pos-center(18rem, 28em, 5rem)
// border 1px solid #eee
// position absolute
// z-index 1000
// .close
// color #aaa
// position absolute
// right 0
// padding 0.5rem
// &:hover
// color #888
// .button
// background red;
// border none;
// color #fff
// width 80%
.login
  width 100%
  height 100%
  .title
    text-align left
    padding 0.5rem 1rem
    font-size 0.7rem
    border-bottom 1px solid $color-border-grey
  .user
    padding 1rem 0
    border-bottom 1px solid $color-border-grey
    .body
      width 80%
      margin 0 auto
      display flex
      margin 0 auto
      align-items center
      justify-content space-between
      .avatar
        display flex
        align-items center
        font-size 0.8rem
        img
          width 2rem
          height 2rem
          border-radius 50%
          margin-right 0.5rem
      .sign-in
        font-size 0.7rem
        padding 0.1rem 0.3rem
        cursor pointer
        border 1px solid #ccc
  .recommend-login
    display flex
    padding 1.6rem 0
    flex-direction column
    width 100%
    align-items center
    justify-content center
    margin 0 auto
    border-bottom 1px solid $color-border-grey
    .desc
      font-size 0.7rem
      width 80%
    .now-login
      color #fff
      background-color $color-theme-red
      border none
      width 80%
      padding 0.4rem 0
      font-size 0.65rem
      margin-top 1rem
      cursor pointer
  .info
    border-bottom none !important
  .block
    padding 1.4rem 0
    border-bottom 1px solid $color-border-grey
    > .item
      width 80%
      margin 0 auto
      align-items center
      display flex
      font-size 0.7rem
      justify-content space-between
      color $color-font-black-name
      padding 0.5rem 0
      position relative
      cursor pointer
      .header
        display flex
        align-items center
      img
        margin-right 0.7rem
        width 1rem
      .arraw
        position absolute
        right 0
    .info
      padding 1.6rem 0
      border-bottom 1px solid $color-border-grey
  .power-off
    position absolute
    bottom 0
    width 100%
    padding 0.3rem 0
    border-top 1px solid $color-border-grey
</style>
