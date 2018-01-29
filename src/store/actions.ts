import * as types from './mutation-type.ts'
import { cache } from 'common/js/cache.ts'
import { ActionTree } from 'vuex'
import { shuffle, findIndexOf } from 'common/js/util.ts'
import { playMode } from 'common/js/config'

const changeUserLoginState = function({ commit }: any, login: any) {
  commit(types.SET_USER_LOGIN, cache.set(login, 'LOGIN'))
}
const selectPlay = function({ commit, state }: any, { list, index }: any) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.playData.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndexOf(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

const deleteSong = function({ commit, state }: any, song: any) {
  let sequenceList = state.playData.sequenceList.slice()
  let playlist = state.playData.playlist.slice()
  let currentIndex = state.playData.currentIndex

  const sIndex = sequenceList.findIndex((item: any) => {
    return item.id === song.id
  })
  const pIndex = playlist.findIndex((item: any) => {
    return item.id === song.id
  })

  if (sIndex >= 0) {
    sequenceList.splice(sIndex, 1)
  }
  if (pIndex >= 0) {
    playlist.splice(pIndex, 1)
  }
  if (pIndex === currentIndex) {
    currentIndex++
  }
  // 数组下标变化
  if (pIndex < currentIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  const playState = playlist.length > 0
}

const clearPlayList = function({ commit }: any) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

const toggleRandomPlay = function({ commit, state }: any) {
  let list = state.playData.playlist
  let randomList = shuffle(list)
  let index = findIndexOf(randomList, list[state.playData.currentIndex])
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_CURRENT_INDEX, index)
}

const toggleSequPlay = function({ commit, state }: any) {
  let slist = state.playData.sequenceList
  let plist = state.playData.playlist
  let index = findIndexOf(slist, plist[state.playData.currentIndex])
  commit(types.SET_PLAYLIST, slist)
  commit(types.SET_PLAY_MODE, playMode.sequence)
  commit(types.SET_CURRENT_INDEX, index)
}

const insertSong = function({ commit, state }: any, song: any) {
  let playList = state.playData.playList.slice()
  let sequenceList = state.playData.sequenceList.slice()
  let currentIndex = state.playData.currentIndex

  // playList insert
  let currentSong = state.playData.playList[currentIndex]
  currentIndex++ // 注意++ 删除操作依赖
  let fpIndex = findIndexOf(playList, currentSong)

  playList.splice(currentIndex, 0, song)
  // if need Delete song
  if (fpIndex > -1) {
    if (fpIndex < currentIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  // sequencelist insert
  let currentSIndex = findIndexOf(sequenceList, currentSong) + 1
  let fsIndex = findIndexOf(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)
  // if need Delete song
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

const actions: ActionTree<any, any> = {
  changeUserLoginState,
  selectPlay,
  deleteSong,
  insertSong,
  toggleRandomPlay,
  clearPlayList,
  toggleSequPlay
}

export default actions
