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
  {
    componentName: 'singer',
    title: '歌手'
  },
  {
    componentName: 'rank',
    title: '榜单'
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

interface options {
  [prop:number]:optionsGroup
}

const InitOptionsNoLogin: options = [
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
      }
    ]
  },
  {
    title: '我的音乐',
    list: [
      {
        name: 'lastplay',
        iconCls: 'i_time',
        id: 4,
        name_zh: '最近播放'
      }
    ]
  }
]

const InitOptionsLogined: options = [
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
      }
    ]
  },
  {
    title: '我的音乐',
    list: [
      {
        name: 'lastPlay',
        iconCls: 'i_time',
        id: 4,
        name_zh: '最近播放'
      }
    ]
  }
]

const ranks = {
  '0': '云音乐新歌榜',
  '1': '云音乐热歌榜',
  '2': '网易原创歌曲榜',
  '3': '云音乐飙升榜',
  '4': '云音乐电音榜',
  '5': 'UK排行榜周榜',
  '6': '美国Billboard周榜',
  '7': 'KTV嗨榜',
  '8': 'iTunes榜',
  '9': 'Hit FM Top榜',
  '10': '日本Oricon周榜',
  '11': '韩国Melon排行榜周榜',
  '12': '韩国Mnet排行榜周榜',
  '13': '韩国Melon原声周榜',
  '14': '中国TOP排行榜(港台榜)',
  '15': '中国TOP排行榜(内地榜)',
  '16': '香港电台中文歌曲龙虎榜',
  '17': '华语金曲榜',
  '18': '中国嘻哈榜',
  '19': '法国 NRJ EuroHot 30周榜',
  '20': '台湾Hito排行榜',
  '21': 'Beatport全球电子舞曲榜',
  '22': '云音乐ACG音乐榜',
  '23': '云音乐嘻哈榜'
}

const hotSearch = ['Despactio 缓缓', '谈判官', '林俊杰', '周杰伦', '爱乐之战', 'BIGBang', '红昭愿', '起风了', '无问东西', '说散就散']

const initSingerDetailViews = ['热门50', '专辑', '歌手详情', '相似歌手']

const initPlayData = { currentIndex: -1, playlist: [], sequenceList: [], mode: 0, isRec: false, fullScreen: false, playing: false }

const searchType = {
  songs: '1',
  albums: '10',
  singers: '100',
  songlists: '1000',
  stations: '1009'
}

const initSearchViews = ['单曲', '歌手', '专辑', '歌单', '主播电台']
export {
  routers,
  InitOptionsLogined,
  InitOptionsNoLogin,
  initPlayData,
  initSingerDetailViews,
  ranks,
  hotSearch,
  searchType,
  initSearchViews
}
