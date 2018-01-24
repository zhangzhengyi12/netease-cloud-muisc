<template>

<div class="login" v-if="show">
  <span class="close">x</span>
  <div class="form">
    <el-radio-group  size="small">
</el-radio-group>
<div style="margin: 5rem auto "></div>
<el-form  label-width="80px">
  <el-form-item label="手机">
    <el-input v-model="login.phone"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="login.password"></el-input>
  </el-form-item>
  <el-button class="button" @click="onLogin">登陆</el-button>
</el-form>
  </div>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'login',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
})
export default class App extends Vue {
  login = {
    phone:'',
    password:''
  }
  onLogin(e:object){
    this.$emit('login',this.login)
  }
}
</script>

<style lang='stylus'>
@import '~common/css/mixins.styl'
.login
  pos-center(18rem, 28em, 5rem)
  border 1px solid #eee
  position absolute
  z-index 1000
  .close
    color #aaa
    position absolute
    right 0
    padding 0.5rem
    &:hover
      color #888
  .button
    background red;
    border none;
    color #fff
    width 80%
</style>
