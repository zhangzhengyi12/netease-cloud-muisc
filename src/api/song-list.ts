import request from './request'

const getHighqualityPlaylist = function(tag: string, limit: number) {
  const target = '/top/playlist/highquality'
  const query = {
    cat: tag ? tag : '',
    limit: limit ? limit : 50
  }
  return request({ target, query }, false)
}

const getSonglistDetail = function(id: number) {
  const target = '/playlist/detail'
  const query = { id }
  return request({ target, query }, false)
}

export { getHighqualityPlaylist,getSonglistDetail }
