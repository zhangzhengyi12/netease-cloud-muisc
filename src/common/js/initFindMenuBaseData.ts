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
    componentName: 'lastMusic',
    title: '最新音乐'
  }, {
    componentName: 'singer',
    title: '歌手'
  }
]

export default routers
