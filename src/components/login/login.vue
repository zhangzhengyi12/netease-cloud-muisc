<template>

  <div class="login">
    <div class="content">
      <img class="close" :src="IMG_CLOSE" alt="" @click="$emit('close')">
      <div class="body">
        <img :src="IMG_PHONE" class="phone" alt="">
        <form @submit.stop.prevent="submit">
          <p class="phone l-item">
            <img class="icon" :src="IMG_PHONE2" alt="">
            <input type="text" name="phoneNumber" v-model="phoneNumber" placeholder="请输入手机号">
          </p>
          <p class="password l-item">
            <img :src="IMG_PASSWORD" class="icon" alt="">
            <input type="password" name="password" v-model="password" placeholder="请输入密码">
          </p>
          <span class="err-tips">{{errMsg}}</span>
          <input type="submit" class="login-btn" value="登录" />
        </form>
      </div>
    </div>
    <div class="mask" @click="$emit('close')"></div>
  </div>

</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'login'
})
export default class App extends Vue {
  IMG_CLOSE = require('@/assets/close.svg')
  IMG_PHONE = require('@/assets/phone.svg')
  IMG_PHONE2 = require('@/assets/phone2.svg')
  IMG_PASSWORD = require('@/assets/password.svg')
  errMsg = ''
  password = ''
  phoneNumber = ''
  submit() {
    if (this.checkNull()) return
    if (!this.checkMobile()) {
      this.errMsg = '请输入11位数组的手机号'
      return
    }else{
      this.errMsg = ''
    }
    this.$emit('login', { phone: this.phoneNumber, password: this.password })
  }
  checkNull() {
    return !this.password || !this.phoneNumber
  }
  checkMobile() {
    if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phoneNumber)) {
      return false
    }
    return true
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.login
  width 300px
  height 450px
  position fixed
  top 4rem
  left 50%
  margin-left -150px
  background-color rgb(250, 250, 250)
  box-shadow 2px 2px 4px #aaa, -2px -2px 4px #aaa
  z-index 99999
  .mask
    position fixed
    top 0
    bottom  0
    left  0
    right 0
    background #fff
    opacity .3
    z-index 1
  .content
    z-index 2
    position relative
    .close
      width 1rem
      position absolute
      top 0.5rem
      right 0.5rem
      cursor pointer
    .body
      width 80%
      margin 0 auto
      padding-top 3rem
      align-items center
      display flex
      flex-direction column
      justify-content center
      > .phone
        width 5rem
        margin-bottom 1rem
      .l-item
        width calc(100% - 1rem)
        display flex
        align-items center
        background #fff
        padding 0.5rem 0.5rem
        commonBorder()
        .icon
          width 1rem
          margin-right 0.5rem
        input
          flex-grow 10
          border none
          outline none
          font-size 0.9rem
      .password
        border-top none
      .err-tips
        color $color-theme-red
        display inline-block
        font-size 0.7rem
        width 100%
        text-align left
      .login-btn
        color #fff
        background-color #d83f3f
        border none
        width 100%
        padding 0.6rem 0
        margin-top 1rem
        font-size 0.7rem
        cursor pointer
</style>