import request from './request.ts'

const getToplist = function(idx: number) {
  const target = '/top/list'
  const query = {
    idx
  }
  return request({ target, query }, false)
}

export {getToplist}