interface option {
  name: string;
  name_zh: string;
  iconCls: string;
  id: number
}
interface optionsList {
  [prop:number]:option
}
interface optionsGroup {
  title: null|string;
  list:optionsList
}

const InitOptions: optionsGroup[] = [
  {
    title: null,
    list: [
      {
        name: 'search',
        name_zh:'搜索',
        iconCls: 'i_search',
        id:0
      },
      {
        name: 'find',
        iconCls: 'i_music_26',
        name_zh:'发现音乐',
        id:1
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
        name_zh:'最近播放'
      },
      {
        name: 'myradio',
        iconCls: 'i_radio_21',
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

export default InitOptions

