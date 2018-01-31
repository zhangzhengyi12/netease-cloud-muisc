declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vuebar'

declare module 'v-bar'

declare module 'vue-lazyload'

declare module 'js-pinyin'

declare interface Date {
  Format(date: any): string
}

declare interface Function {
  after(fn: any): any
}
interface artists {
  [props: number]: {
    name: string
    id: number
  }
}
interface album {
  name: string
  id: number
}
interface track {
  name: string
  id: number
  duration: number
  artists: artists
  mvid: number
}
declare interface tracks {
  [props: number]: track
}

declare interface playlistData {
  body: {
    playlist: Array<any>
  }
}

declare module 'lyric-parser'