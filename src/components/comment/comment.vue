<template>

 <ul class="comments">
   <li class="comment"
   v-for="(com,index) of comments"
   :key="index"
   >
     <img class="avatar" v-lazy="com.user.avatarUrl" alt="">
     <div class="body">
       <div class="content">
         <span class="name">{{com.user.nickname}}:</span>
         <span class="text">{{com.content}}</span>
       </div>
       <div class="footer">
         <span class="date">
           {{transTime(com.time)}}
         </span>
         <span class="like">
           <img :src="IMG_LIKE" alt="">
           <span class="count">({{com.likedCount}})</span>
         </span>
       </div>
     </div>
   </li>
 </ul>

  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component({
  name: 'App'
})
export default class App extends Vue {
  @Prop() comments: any
  IMG_LIKE= require('@/assets/like.svg')
  transTime(time: number): string | undefined {
    return (new Date(time) as Date).Format('yyyy-MM-dd')
  }
}
</script>

<style lang='stylus' scoped>

@import '~common/css/variable.styl'
.comments
  .comment
    display flex
    padding .5rem 0 .3rem 0
    border-bottom 1px solid $color-border-grey
    .avatar
      width 2rem
      height 2rem
      border-radius 50%
      margin-right .5rem
    .body
      width 100%
      .content
        text-align left 
        .name
          font-size .8rem
          color $color-font-link-blue
        .text
          line-height 1.2rem
          font-size .8rem
          text-align left 
      .footer
        width 100%
        margin-top .5rem
        display flex
        justify-content space-between
        font-size .6rem
        .date
          color $color-font-grey-title
        .like
          display flex
          align-items center
          color $color-font-grey-title
          img
            width 1rem
</style>
