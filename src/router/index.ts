import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import find from '@/components/find/find.vue'
import recommend from '@/components/recommend/recommend.vue'
import hostStation from '@/components/host-station/host-station.vue'
import rank from '@/components/rank/rank.vue'
import singer from '@/components/singer/singer.vue'
import songList from '@/components/song-list/song-list.vue'
import Detail from '@/components/detail/detail.vue'
import SonglistDetail from '@/components/song-list-detail/song-list-detail.vue'
import StationDetail from '@/components/station-detail/station-detail.vue'
import SingerDetail from '@/components/singer-detail/singer-detail.vue'
import AlbumDetail from '@/components/album-detail/album-detail.vue'
import CommentDetail from '@/components/comment-detail/comment-detail.vue'
import RecommendSongsDetail from '@/components/recommend-songs-detail/recommend-songs-detail.vue'
import RankDetail from '@/components/rank-detail/rank-detail.vue'
import Search from '@/components/search/search.vue'
import LastPlay from '@/components/last-play/last-play.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: 'find'
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      redirect: '/',
      children: [
        {
          path: 'songlistDetail/:id',
          name: 'songlistDetail',
          component: SonglistDetail,
          props: true
        },
        {
          path: 'stationDetail/:id',
          name: 'stationDetail',
          component: StationDetail,
          props: true
        },
        {
          path: 'singerDetail/:id',
          name: 'singerDetail',
          component: SingerDetail,
          props: true
        },
        {
          path: 'albumDetail/:id',
          name: 'albumDetail',
          component: AlbumDetail,
          props: true
        },
        {
          path: 'commentDetail',
          name: 'commentDetail',
          component: CommentDetail,
          props: true
        },
        {
          path: 'recommendSongsDetail',
          name: 'recommendSongsDetail',
          component: RecommendSongsDetail
        },
        {
          path: 'rankDetail/:name/:id',
          name: 'rankDetail',
          component: RankDetail,
          props: true
        }
      ]
    },
    {
      path: '/find',
      name: 'find',
      component: find,
      redirect: '/find/recommend',
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: recommend
        },
        {
          path: 'hostStation',
          name: 'hostStation',
          component: hostStation
        },
        {
          path: 'rank',
          name: 'rank',
          component: rank
        },
        {
          path: 'singer',
          name: 'singer',
          component: singer
        },
        {
          path: 'songList',
          name: 'songList',
          component: songList
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/lastPlay',
      name: 'lastPlay',
      component: LastPlay
    }
  ]
})
