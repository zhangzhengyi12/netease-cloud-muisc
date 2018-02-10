import request from './request'

const getSongListComment = function(id: number) {
  const target = '/comment/playlist'
  const query = {
    id
  }
  return request({ target, query }, false)
}

const getAlbumComment = function(id: number) {
  const target = '/comment/album'
  const query = {
    id
  }
  return request({ target, query }, false)
}

export { getSongListComment,getAlbumComment }
