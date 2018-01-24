import request from './request'

const getUserPlaylist = function(uid:any) {
  const target = '/user/playlist'
  const query = {uid}
  return request({target,query},false)
}

export {getUserPlaylist}
