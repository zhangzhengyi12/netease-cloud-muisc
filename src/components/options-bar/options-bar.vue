<template>

<div class="bar" :class="{mini:isMini}">

  <span class="toggle-bar" @click="toggleBar">
  <option-item :iconCls="'i_menu'"></option-item>
  </span>

 <div v-for="(list,index) in publicList" :key="index" class="list base-list">
   <h5 v-show="list.title&&!isMini" class="title" >{{ list.title }}</h5>
   <ul v-show="!list.title || !isMini"> 
     <!-- 在mini模式下 二级列表的检查将不会通过 所以不会展示 -->
     <li v-for="(item,index) of list.list" :key="index">
       <option-item :name="item.name_zh" :id="item.id" :iconCls="item.iconCls"
        :isActive="currActive(item.id)"
        :isMini="isMini" @click="onSelectItem" ></option-item>
     </li>
   </ul>
 </div>

 <span class="Arraw" v-show="isMini" @click="toggleBar">
   <option-item :iconCls="'i_right'"></option-item>
 </span>

<!-- 如果用户没有登陆就用替代的资源 -->
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
import Component from 'vue-class-component'
import initData from 'common/js/initOptionDefaultData.ts'
import OptionItem from 'base/Option/Option.vue'
import { State } from 'vuex-class'
import throttle from 'common/js/util.ts'

const ToggleWidthMin:number = 600

@Component({
  name: 'options-bar',
  components: {
    OptionItem
  }
})
export default class App extends Vue {
  isMini = false
  activeID = 1
  publicList = initData
  stateItor = openCloseState()
  @State('userLoginState') loginState: any

  mounted() {
    // 立即触发一次
    this.checkClientWidth(null)
    window.onresize = throttle(this.checkClientWidth,50)
  }

  toggleBar(e: any): void {
    this.isMini = this.stateItor.next().value
  }
  onSelectItem(item: { name: string; id: number }) {
    this.activeID = item.id
  }
  currActive(id: number) {
    return id === this.activeID
  }
  checkClientWidth(e:any){
    const width = document.body.clientWidth
    if(width < ToggleWidthMin){
      this.isMini = true
    }else{
      this.isMini = false
    }
  }
}

function* openCloseState() {
  while (true) {
    yield true
    yield false
  }
}
</script>

<style lang='stylus'>
@import '~common/css/variable.styl'
.bar
  width 14rem
  padding 0.5rem 0
  text-align left
  background $color-background-grey
  position relative
  height 100vh - 15rem
  border-right 1px solid #ccc
  transition  width .3s cubic-bezier(0,1,.34,.95)
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
  border-top 1px solid #ccc
  bottom 0
  display flex
  flex-direction row
  justify-content space-around
  align-items center
  font-size 0.7rem
  color $color-font-black
  &.mini
    .avatar
      img
        margin .5rem 0
    flex-direction column
    height 7.1rem
    justify-content center
    .icon 
      margin .5rem 0
      &.icon-end
        margin .5rem 0
  .user-name
    margin-left -.3rem
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
