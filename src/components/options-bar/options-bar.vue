<template>

<div class="bar">

 <div v-for="(list,index) in publicList" :key="index" class="list">
   <h5 v-if="list.tittle" class="title">{{ list.tittle }}</h5>
   <ul>
     <li v-for="(item,index) of list.list" :key="index">
       <Option :name="item.name" :iconCls="item.iconCls" ></Option>
     </li>
   </ul>
 </div>

</div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import initData from 'common/js/initOptionDefaultData.ts'
import Option from 'base/Option/Option.vue'

@Component({
  name: 'options-bar',
  components: {
    Option
  }
})
export default class App extends Vue {
  isMini = false
  activeID = 1
  publicList = initData
}
</script>

<style lang='stylus'>
@import '~common/css/variable.styl'

.bar
  width 10rem
  padding 0.5rem 0
  text-align left
  background $color-background-grey
  .title
    color $color-font-grey
    font-size .6rem
  .list
    margin-top 1rem
</style>
