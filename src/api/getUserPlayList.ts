import request from './request.ts'

const getUserPlaylist = function(uid:any) {
  const target = '/user/playlist'
  const query = {uid}
  return request({target,query})
}

export default getUserPlaylist
