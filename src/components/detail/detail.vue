<template>

<div class="">
  <v-bar id="view" ref='vbar' autoHide="3000">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </v-bar>
</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import VBar from 'v-bar'
import Component from 'vue-class-component'
@Component({
  name: 'detail',
  components: { VBar }
})
export default class App extends Vue {}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'

#view
  margin 0 auto
  width 100%
  height calc(100vh - 1.5rem - 62px)
  background-color rgb(250,250,250)
</style>
