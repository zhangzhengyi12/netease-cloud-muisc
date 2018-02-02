// recomend menu
interface routerLink {
  componentName: string
  title: string
}

const routers: Array<routerLink> = [
  {
    componentName: 'recommend',
    title: '个性推荐'
  },
  {
    componentName: 'songList',
    title: '歌单'
  },
  {
    componentName: 'hostStation',
    title: '主播电台'
  },
  // {
  //   componentName: 'lastMusic',
  //   title: '最新音乐'
  // }, {
  {
    componentName: 'singer',
    title: '歌手'
  }
]

// bar options

interface option {
  name: string
  name_zh: string
  iconCls: string
  id: number
}
interface optionsList {
  [prop: number]: option
}
interface optionsGroup {
  title: null | string
  list: optionsList
}

const InitOptions: optionsGroup[] = [
  {
    title: null,
    list: [
      {
        name: 'search',
        name_zh: '搜索',
        iconCls: 'i_search',
        id: 0
      },
      {
        name: 'find',
        iconCls: 'i_music_40',
        name_zh: '发现音乐',
        id: 1
      },
      {
        name: 'mv',
        iconCls: 'i_video',
        id: 2,
        name_zh: 'MV'
      },
      {
        name: 'friend',
        iconCls: 'i_friend',
        id: 3,
        name_zh: '朋友'
      }
    ]
  },
  {
    title: '我的音乐',
    list: [
      {
        name: 'lastpaly',
        iconCls: 'i_time',
        id: 4,
        name_zh: '最近播放'
      },
      {
        name: 'myradio',
        iconCls: 'i_radio_35',
        id: 5,
        name_zh: '我的电台'
      },
      {
        name: 'mycollect',
        iconCls: 'i_qm_favorites_is',
        id: 6,
        name_zh: '我的收藏'
      }
    ]
  }
]

const initSingerDetailViews = ['热门50', '专辑', '歌手详情', '相似歌手']

const initPlayData = { currentIndex: -1, playlist: [], sequenceList: [], mode: 0, fullScreen: false, playing: false }

export { routers, InitOptions, initPlayData, initSingerDetailViews }
