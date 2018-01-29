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

export { addCollectToPlayList }
