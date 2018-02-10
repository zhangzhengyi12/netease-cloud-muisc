import request from './request'
import cacheRequest from './api-cache'

const getAlbumDetail = function(id: number) {
  const target = '/album'
  const query = { id }
  return request({ target, query }, false)
}

export { getAlbumDetail }
