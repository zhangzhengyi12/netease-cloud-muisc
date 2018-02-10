<template>

<v-bar class="container" :autoHide="3000" ref='bar' @scroll="onWheel">
  <!-- TODO:贼多bug 暂时取消 -->
  <!-- <div class="blur" :style="`background-Image:url(${currentSong.album.blurPicUrl})`"> -->
  <!-- </div> -->  <div class="close" @click="closeMainPlayer">
    <img :src="IMG_SHRINK" alt="">
  </div>
  <div class="content">
    <div class="cd">
      <c-d class="cd" :cdPicUrl='currentSong.album.blurPicUrl' :playing="playing"></c-d>
      <!-- 操控区域  only FM MODE-->
      <div class="ctrl-group" v-if="isRec">
        <div class="like wrap" @click="$emit('like')">
          <img :src="[liked ? IMG_COLLECT_Y : IMG_COLLECT_N]" alt="">
        </div>
        <div class="next wrap" @click="$emit('next')">
          <i class="icon i_next"></i>
        </div>
        <div class="trash wrap" @click="$emit('trash')">
          <img :src="IMG_CLEAR" alt="">
        </div>
      </div>
    </div>
    <div class="message">
      <div class="name">
        {{currentSong.name}}
      </div>
      <div class="more" v-if="!isRadio">
        <div class="album">
          <span class="title">专辑：</span>
          <span class="text" @click="selectAlbum(currentSong.album)">
          {{currentSong.album.name}}
          </span>
        </div>
        <div class="singer">
          <span class="title">歌手：</span>
          <span class="text">
            <artists @select="toggleSinger" :artists="currentSong.artists" artCls='art' @selectSinger="closeMainPlayer" />
          </span>
        </div>
      </div>
      <div class="more" v-if="isRadio">
         <div class="album">
          <span class="title">主播：</span>
          <span class="text">
          {{currentSong.artists[0].name}}
          </span>
        </div>
        <div class="singer" @click="toggleStationDetail">
          <span class="title">来源：</span>
          <span class="text">
            {{currentSong.radio.name}}
          </span>
        </div>
        <div class="host" @click="toggleStationDetail">
          <span class="title">电台：</span>
          <span class="text">
            {{currentSong.radio.name}}
          </span>
        </div>
      </div>
      <div class="lyric" v-if="!isRadio">
        <lyric ref="lyric" :id="currentSong.id" :playing="playing"></lyric>
      </div>
      <!-- radio模式下 显示电台的详细信息 -->
      <div class="radio" v-if="isRadio">
        <div class="top">
        <span class="time">创建时间: {{transTime(currentSong.createTime)}}</span>
        <span class="count">已播放： {{caluCountToWan(currentSong.listenerCount)}}</span>
        </div>
        <div class="bot">
          <span class="type">{{currentSong.radio.category}}</span>
          <span class="des">{{currentSong.description}}</span>
        </div>
      </div>
    </div>
    </div>
    <div class="tail" @wheel="onWheel" v-if="!isRadio">
      <div class="comment" >
         <div class="title" v-show="hotComments.length!==0">
           评论 &nbsp;
           <span class="count">
             ({{commentsCount}})
           </span>
         </div>
         <div class="hot" v-show="hotComments.length!==0">
            <h3 class="hot-title">
              精彩评论 
            </h3>
            <comment :comments="hotComments" class="hot-comment"></comment> 
        </div>
        <div class="last" v-show="allComments.length!==0">
          <div class="title">
           最新评论 &nbsp;
           <span class="count">
             ({{commentsCount}})
           </span>
         </div>
         <comment :comments="allComments" class="hot-comment"></comment> 
        </div>
        <loading v-if="hasMoreCom"></loading>
      </div>
      <div class="simi" v-if="!isRadio&&!isRec">
        <div class="title">相似歌曲</div>
        <div class="songs">
          <div v-for="(song,index) of simiSongs"
          @click="insertPlaySong(song)"
          class="song"
          :key="index">
          <span class="name">{{song.name}}</span>
          <span class="artisit">{{caluArtists(song.artists)}}</span>
          </div>
        </div>
      </div>
  </div>
</v-bar>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Mutation, Action } from 'vuex-class'
import { Watch, Prop } from 'vue-property-decorator'
import VBar from 'v-bar'
import CD from 'base/cd/cd.vue'
import { timeAndArtisitMixin } from '@/mixins/mixins'
import Lyric from 'base/lyric/lyric.vue'
import { getSimiSong, getSongComment, getDjComment } from 'api/player.ts'
import Comment from 'components/comment/comment.vue'
import Loading from 'base/loading/loading.vue'
import Artists from 'base/artists/artists.vue'
const NEED_MORE_PER_COM = 0.8
const DEF_COMMENT_LIMIT = 30
@Component({
  name: 'mainPlayer',
  components: {
    CD,
    Lyric,
    VBar,
    Comment,
    Loading,
    Artists
  },
  mixins: [timeAndArtisitMixin]
})
export default class App extends Vue {
  @Getter('currentSong') currentSong: any
  @Getter('loginState') loginState: any
  @Getter('playlist') playlist: any
  @Getter('playing') playing: boolean
  @Getter('playMode') playMode: number
  @Getter('isRadio') isRadio: boolean
  @Getter('currentIndex') currentIndex: number
  @Mutation('SET_PLAYING_STATE') setPlayState: any
  @Mutation('SET_CURRENT_INDEX') setCurrentIndex: any
  @Getter('isRec') isRec: boolean
  @Mutation('SET_PLAY_MODE') setPlayMode: any
  @Action('toggleRandomPlay') toggleRandomPlay: any
  @Action('toggleSequPlay') toggleSequPlay: any
  @Action('insertPlay') insertPlay: any
  @Prop() liked: boolean
  IMG_SHRINK = require('@/assets/shrink.svg')
  simiSongs: any = []
  hotComments: any = []
  allComments: any = []
  commentsCount: number = 0
  hasMoreCom: boolean = true
  currentCommentOffset = 0
  MoreLoading = false
  IMG_COLLECT_Y = require('@/assets/collect1.svg')
  IMG_COLLECT_N = require('@/assets/collect2.svg')
  IMG_NEXT = require('@/assets/next.svg')
  IMG_CLEAR = require('@/assets/clear.svg')
  mounted() {
    let id = this.currentSong.id
    if (!this.isRadio) {
      this.getSimiData(id)
      this.getCommentData(id, DEF_COMMENT_LIMIT)
    }
  }
  setSeek(seek: number) {
    let lyric: any = this.$refs.lyric
    lyric.setSeek(seek)
  }
  transTime(time: number): string | undefined {
    let date: Date = new Date(time)
    if (time && date.Format) {
      return date.Format('yyyy-MM-dd')
    }
  }
  toggleStationDetail() {
    this.$router.push({ name: 'stationDetail', params: { id: this.currentSong.radio.id } })
    this.closeMainPlayer()
  }
  selectAlbum(a: any) {
    this.$router.push({ name: 'albumDetail', params: { id: a.id } })
    this.closeMainPlayer()
  }
  getSimiData(id: number) {
    getSimiSong(id).then(
      (res: any) => {
        if (res.body.code === 200) {
          this.simiSongs = res.body.songs
        }
      },
      (err: any) => {
        this.$message('获取相似歌曲错误')
      }
    )
  }
  onWheel() {
    let bar: any = this.$refs.bar
    if (!bar.wrapperObj || this.isRadio) return
    const top = bar.wrapperObj.scrollTop
    const height = bar.wrapperObj.scrollHeight
    if (this.needLoadMore(height, top)) {
      this.loadMoreCom()
    }
  }
  caluCountToWan(count: number) {
    let result = ''
    if (count < 10000) {
      return count
    }
    result = `${Math.floor(count / 10000)}万`
    return result
  }
  needLoadMore(h: number, t: number) {
    const per = t / h
    return per > NEED_MORE_PER_COM && this.hasMoreCom && !this.MoreLoading
  }
  loadMoreCom() {
    this.currentCommentOffset++
    this.MoreLoading = true
    this.getCommentData(this.currentSong.id, DEF_COMMENT_LIMIT, this.currentCommentOffset)
  }
  getCommentData(id: number, limit: number, offset?: number) {
    let dataPromise = getSongComment(id, limit, offset)

    dataPromise.then((res: any) => {
      if (res.body.code === 200) {
        if (res.body.hotComments) {
          this.hotComments = res.body.hotComments
        }
        this.allComments = this.allComments.concat(res.body.comments)
        this.hasMoreCom = res.body.more
        this.commentsCount = res.body.total
        this.MoreLoading = false
      }
    })
  }
  toggleSinger(index: number) {
    let sid = this.currentSong.artists[index].id.toString()
    this.$router.push({ name: 'singerDetail', params: { id: sid } })
    this.closeMainPlayer()
  }
  closeMainPlayer() {
    this.$emit('close')
  }
  insertPlaySong(song: any) {
    this.insertPlay(song)
  }
  reInitData() {
    this.simiSongs = []
    this.hotComments = []
    this.allComments = []
  }
  @Watch('currentSong')
  onSongChange(nSong: any) {
    this.reInitData()
    this.getSimiData(nSong.id)
    this.getCommentData(this.currentSong.id, DEF_COMMENT_LIMIT)
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/css/variable.styl'
@import '~common/css/mixins.styl'
.container
  background rgb(210,210,210)
  width 100%
  text-align center
  .blur
    position absolute
    width 60%
    height 300px
    left 50%
    margin-left -30%
    filter blur(100px)
    z-index 0
  .close
    position absolute
    right 2rem
    top 1rem
    background rgb(220,220,220)
    display flex
    align-items center
    justify-content center
    z-index 10
    padding-right 0 !important
    padding-bottom 0 !important
    border-radius 3px
    border 1px solid #ccc
    box-shadow 1px 1px 1px #ccc
    cursor pointer
    img
      margin .3rem .5rem
      width 1rem
  .content
    margin 0 auto
    display flex
    flex-direction row
    justify-content center
    padding-top 1.5rem
    @media (max-width 750px) {
        flex-direction column
        align-items center
    }
    .cd
      z-index 1
      display flex
      flex-direction column
      .ctrl-group
        display flex
        justify-content space-around
        align-items center
        margin-top 1rem
        .wrap
          width 2rem
          height 2rem
          border-radius 50%
          border 1px solid rgba(150,150,150,.5)
          display flex
          align-items center
          justify-content center
          background #ddd
          cursor pointer
        img
          width 1.3rem
        .icon
          font-size .8rem
          color #999999
    .lyric
      // margin-left 1rem
      @media (max-width 750px) {
        display none
      }
  .message
    width 350px
    padding-left 3rem
    z-index 1
    @media (max-width 750px) 
      padding 2rem 0 0 0
    .name
      display flex
      justify-content flex-start
      color rgb(40,40,40)
      width 100%
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      @media (max-width 750px) 
        justify-content center
    .more
      display flex
      flex-direction row
      font-size .7rem
      margin-top 1rem
      @media (max-width 750px) 
        justify-content center
      & > div
        margin-right 1rem
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        width 50%
        text-align left
        flex-grow 10
        .text
          cursor pointer
          color $color-font-link-blue
    .radio
      margin-top 1rem
      padding-top 1rem
      border-top 1px solid rgba(200,200,200,.5)
      font-size .7rem
      text-align left
      .top
        .time
          margin-right 1rem
      .bot
        margin-top 1rem
        .type
          color $color-theme-red
          padding .1rem .5rem
          border 1px solid $color-theme-red
          margin-right 1rem
  .tail
    display flex
    justify-content center
    width 90%
    margin 1rem auto 0 auto
    background transparent
    .comment
      flex-grow 100
      .title
        display flex
        font-size .8rem
        padding .5rem 0
        border-bottom 1px solid #aaa
        .count
          color $color-font-grey-title
      .hot
        display flex
        flex-direction column
        margin-top 2rem
        .hot-title
          font-size .9rem
          display flex
        .hot-comment
          margin-top 1rem
    .simi
      width 300px
      margin-left 3rem
      flex-shrink 0
      @media (max-width 750px) {
        display none
      }
      .title
        border-bottom 1px solid #aaa
        font-size .8rem
        color rgb(40,40,40)
        text-align left 
        padding .5rem 0
      .songs
        display flex
        flex-direction column
        justify-content flex-start
        align-items flex-start
        cursor pointer
        .song
          display flex
          justify-content space-between
          width 100%
          padding .8rem 0
          font-size .8rem
          color rgb(40,40,40)
          &:hover
            background rgb(190,190,190)
          .artisit
            color$color-font-grey-title
            font-size .65rem
            justify-content flex-end
            align-self flex-end
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
          .name
            text-overflow ellipsis
            overflow hidden
            white-space nowrap

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.alert-enter, .alert-leave-to {
  opacity: 0;
}

.alert-enter-active, .alert-leave-active {
  transition: all 0.4s;
}
</style>
