import * as types from './mutation-type.ts'
import { MutationTree } from 'vuex'
import { cache } from 'common/js/cache'

const mutations: MutationTree<any> = {
  [types.SET_USER_LOGIN](state: any, logininfo: any) {
    state.userLoginState = logininfo
  },
  [types.SET_CLIENT_VIEWPORT](state: any, viewport) {
    state.viewport = viewport
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playData.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.playData.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playData.playlist = list
    cache.set(state.playData, 'playData')
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.playData.sequenceList = list
    cache.set(state.playData, 'playData')
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.playData.mode = mode
    cache.set(state.playData, 'playData')
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.playData.currentIndex = index
    cache.set(state.playData, 'playData')
  }
}

export default mutations
