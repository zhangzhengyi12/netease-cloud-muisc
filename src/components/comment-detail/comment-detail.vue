<template>
  <div class="comment-detail">
    <div class="content">
      <div class="title">
          评论&nbsp;&nbsp;
          <span class="count">({{total}})</span>
        </div>
      <div class="message">
        <img :src="blurPic" alt="">
        <div class="content">
          <h1 class="f">{{fTitle}}</h1>
          <h2 class="t">{{tTitle}}</h2>
        </div>
      </div>
      <loading v-if="showLoading"/>
      <div class="com">
        <div class="hot" v-if="hotComments.length !== 0">
          <h1 class="hot-title">热门评论</h1>
          <comment :comments="hotComments"/>
        </div>
         <div class="all" v-if="allComments.length !== 0">
           <div class="last">
          最新评论&nbsp;&nbsp;
          <span class="count">({{total}})</span>
        </div>
          <comment :comments="allComments"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { getSongListComment, getAlbumComment } from 'api/comment.ts'
import Loading from 'base/loading/loading.vue'
import Comment from 'components/comment/comment.vue'

const typeMap = {
  songList: '0',
  hoststation: '1',
  album: '2'
}
@Component({
  name: 'commentDetail',
  components: {
    Comment,
    Loading
  }
})
export default class App extends Vue {
  @Prop() type: string
  @Prop() blurPic: string
  @Prop() fTitle: string
  @Prop() tTitle: string
  @Prop() id: number
  hotComments: any = []
  allComments: any = []
  total: number = 0
  showLoading = true
  mounted() {
    this.getComment()
  }
  getComment() {
    let req: any
    if (this.type === typeMap.songList) {
      req = getSongListComment(this.id)
    } else if (this.type === typeMap.album) {
      req = getAlbumComment(this.id)
    }
    req.then((res: any) => {
      if (res.body.code === 200) {
        this.hotComments = res.body.hotComments
        this.allComments = res.body.comments
        this.total = res.body.total
        this.showLoading = false
      }
    })
  }
  reInitData() {
    this.hotComments = []
    this.allComments = []
    this.total = 0
    this.showLoading = true
  }
  @Watch('id')
  onIdChange() {
    console.log('change')
    this.reInitData()
    this.getComment()
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.comment-detail
  .content
    width 94%
    margin 0 auto
    padding .5rem 0
    .title
      display flex
      font-size .8rem
      align-items center
      .count
        font-size .6rem
        color $color-font-grey-title
    .message
      display flex
      align-items center
      margin-top 1rem
      img
        width 4rem
      .content
        display flex
        flex-direction column
        align-items flex-start
        justify-content space-around
        padding-left 1rem
        .f
          font-size 1rem
        .t
          font-size .6rem
          color $color-font-grey-title
          margin-top .8rem
    .com
      margin-top 1rem
      padding-bottom 2rem
      .hot-title
          font-size .8rem
          display flex
          border-bottom 1px solid $color-border-grey
          padding-bottom .6rem
      .last
        font-size .8rem
        display flex
        margin-top 1rem
        border-bottom 1px solid $color-border-grey
        padding-bottom .6rem
</style>
