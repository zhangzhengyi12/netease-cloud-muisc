import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import find from '@/components/find/find.vue'
import recommend from '@/components/recommend/recommend.vue'
import hostStation from '@/components/host-station/host-station.vue'
import lastMusic from '@/components/last-music/last-music.vue'
import singer from '@/components/singer/singer.vue'
import songList from '@/components/song-list/song-list.vue'
import Detail from '@/components/detail/detail.vue'
import SonglistDetail from '@/components/song-list-detail/song-list-detail.vue'
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
      redirect:'/',
      children: [
        {
          path: 'songlistDetail/:id',
          name: 'songlistDetail',
          component: SonglistDetail,
          props:true
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
          path: 'lastMusic',
          name: 'lastMusic',
          component: lastMusic
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
    }
  ]
})
