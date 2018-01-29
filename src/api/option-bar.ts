import request from './request'
import cacheRequest from './api-cache'
const getUserPlaylist = function(uid: any) {
  const target = '/user/playlist'
  const query = { uid }
  return cacheRequest({ target, query }, false)
}

export { getUserPlaylist }
