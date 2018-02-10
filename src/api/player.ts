import request from './request'

const addCollectToPlayList = function(sid: number, pid: number) {
  const target = '/playlist/tracks'
  const query = {
    op: 'add',
    pid,
    tracks: sid
  }
  return request({ target, query }, true)
}

const getLyric = function(sid: number) {
  const target = '/lyric'
  const query = {
    id: sid
  }
  return request({ target, query }, false)
}

const getSimiSong = function(sid: number) {
  const target = '/simi/song'
  const query = {
    id: sid
  }
  return request({ target, query }, false)
}

const getSongUrl = function(sid: number) {
  const target = '/music/url'
  const query = {
    id: sid
  }
  return request({ target, query }, false)
}

const getSongComment = function(sid: number, limit: number, offset?: number) {
  const target = '/comment/music'
  const query: any = {
    id: sid,
    limit
  }
  if (offset) query.offset = offset
  return request({ target, query }, false)
}

const getDjComment = function(sid: number, limit: number, offset?: number) {
  const target = '/comment/dj'
  const query: any = {
    id: sid,
    limit
  }
  if (offset) query.offset = offset
  return request({ target, query }, false)
}

const getRecFm = function() {
  const target = '/personal_fm'
  const query = {
    timestamp: Date.now()
  }
  return request({ target, query }, true)
}

const like = function(id: number, liked: boolean) {
  const target = '/like'
  const query = {
    id,
    like: liked
  }
  return request({ target, query }, true)
}

const fmTrash = function(id: number) {
  const target = '/fm_trash'
  const query = {
    id
  }
  return request({ target, query }, true)
}

export { addCollectToPlayList, fmTrash, like, getLyric, getSimiSong, getSongComment, getSongUrl, getDjComment, getRecFm }
