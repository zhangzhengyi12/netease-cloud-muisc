<template>
  <div id="app">
    <m-header></m-header>
    <div class="content-box">
    <router-view/>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import MHeader from 'components/header/header.vue'
@Component({
  name: 'App',
   components: {
   MHeader
  }
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
