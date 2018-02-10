<template>

<v-bar id='view' class="lyric-wrapper" :autoHide="3000" ref="bar" @wheel.stop>
  <div  ref='sb'>
    <p ref="lyricLine"
    class="text"
    v-if="currentLyric"
    :class="{'current': currentLineNum === pindex}"
    v-for="(line,pindex) in currentLyric.lines"
    :key="pindex"
    >{{ line.txt }}
    <!-- 翻译歌词 -->
    <span class="text t-text"
    style="display:block"
    :class="{'current': currentLineNum === index}"
     v-for="(line,index) in currentTLyric.lines"
     :key="index"
     v-if="currentTLyric && index === pindex"
     >{{line.txt}}</span>
    </p>
    
  </div>
</v-bar >
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import Lyric from 'lyric-parser'
import { Prop, Watch } from 'vue-property-decorator'
import { getLyric } from 'api/player.ts'
import VBar from 'v-bar'

const DEF_LYRIC = '[00:00.000]暂无歌词\n'
const DEF_SCROLL_OFFSET = 200

@Component({
  name: 'lyric',
  components: {
    VBar
  }
})
export default class App extends Vue {
  @Prop() id: number
  @Prop() playing: boolean
  currentLyric: any = {}
  currentTLyric: any = {}
  currentLineNum: number = 0
  playingLyric: string = ''
  mounted() {
    this.getLyricData()
  }
  getLyricData() {
    getLyric(this.id).then((res: any) => {
      let lyricText = DEF_LYRIC
      if (res.body.lrc && res.body.lrc.lyric) {
        lyricText = res.body.lrc.lyric
      }
      this.currentLyric = new Lyric(lyricText, this.handeLyric)
      if (res.body.tlyric && res.body.tlyric.lyric) {
        this.currentTLyric = new Lyric(res.body.tlyric.lyric, this.handeLyric)
      }
    })
  }
  handeLyric({ lineNum, txt }: { lineNum: number; txt: string }) {
    if (!this.$refs.lyricLine) return
    this.currentLineNum = lineNum
    let lineEnm = (this.$refs.lyricLine as Array<HTMLElement>)[lineNum]
    let offtop = 0
    offtop = lineEnm.offsetTop
    ;(this.$refs.bar as { scrollTo: (x: number, y: number) => void }).scrollTo(0, offtop)
    this.playingLyric = txt
  }
  setSeek(seek: number) {
    this.currentLyric.seek(seek * 1000)
  }
  @Watch('playing')
  onPlayChange(nP: boolean) {
    if (nP) {
      this.currentLyric.togglePlay && this.currentLyric.togglePlay()
    } else {
      this.currentLyric.stop && this.currentLyric.stop()
    }
  }
  @Watch('id')
  onIDchange(id: number) {
    this.currentLyric.stop && this.currentLyric.stop()
    this.currentLyric = {}
    this.currentTLyric = {}
    this.getLyricData()
    ;(this.$refs.bar as { scrollTo: (x: number, y: number) => void }).scrollTo(0, 0)
  }
}
</script>

<style lang='stylus' scoped>
#view
  margin-top 1rem
  height 250px
  width 380px
  .text
    color rgb(40,40,40)
    font-size .9rem
    margin-top 1rem
    text-align left
  .current
    color #fff
</style>
