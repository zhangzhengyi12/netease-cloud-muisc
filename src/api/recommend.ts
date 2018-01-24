import request from './request'
import cacheRequest from './api-cache'

// 增加缓存机制
const getBanner = function(cache: boolean = false) {
  const target = '/phantomBanner'
  return cacheRequest({ target }, false)
}

const getPersonalizedSonglist = function() {
  const target = '/personalized'
  return request({ target }, false)
}

const getPrivateContent = function() {
  const target = '/personalized/privatecontent'
  return request({ target }, false)
}

const getPersonalizedNewsong = function() {
  const target = '/personalized/newsong'
  return request({ target }, false)
}

const getPersonalizedMvs = function() {
  const target = '/personalized/mv'
  return request({ target }, false)
}

const getPersonalizedDjprogram = function() {
  const target = '/personalized/djprogram'
  return request({ target }, false)
}

export { getBanner, getPersonalizedSonglist, getPrivateContent, getPersonalizedNewsong, getPersonalizedMvs, getPersonalizedDjprogram }
