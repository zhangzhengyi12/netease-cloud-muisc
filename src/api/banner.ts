import request from './request.ts'

const getBanner = function() {
  const target = '/phantomBanner'
  return request({target})
}

export default getBanner
