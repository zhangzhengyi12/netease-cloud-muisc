import * as types from './mutation-type.ts'
import { MutationTree } from 'vuex'
import { cache } from 'common/js/cache'
import { stat } from 'fs'
import { start } from 'repl'

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
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.playData.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.playData.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.playData.currentIndex = index
    cache.set(state.playData, 'playData')
  },
  [types.SET_PLAY_TYPE](state, isRadio) {
    state.playData.isRadio = isRadio
    cache.set(state.playData, 'playData')
  },
  [types.SET_REC_MODE](state, isRecMode) {
    state.playData.isRec = isRecMode
    cache.set(state.playData, 'playData')
  },
  [types.ADD_SEARCH_HISTORY](state, value) {
    // 避免重复
    let index = state.searchHistory.findIndex((v: any) => {
      return value === v
    })
    if (index === -1) {
      state.searchHistory = [value].concat(state.searchHistory)
    } else {
      state.searchHistory.splice(index, 1)
      state.searchHistory = [value].concat(state.searchHistory)
    }
    cache.set(state.searchHistory, 'searchHistory')
  },
  [types.CLEAR_SEARCH_HISTORY](state) {
    state.searchHistory = []
    cache.set(state.searchHistory, 'searchHistory')
  },
  [types.DEL_SEARCH_HISTORY_FOR_INDEX](state, index) {
    let history = state.searchHistory.slice()
    history.splice(index, 1)
    state.searchHistory = history
    cache.set(history, 'searchHistory')
  },
  [types.SET_PLAY_HISTORY](state, list) {
    state.playHistory = list
    cache.set(list, 'playHistory')
  }
}

export default mutations
