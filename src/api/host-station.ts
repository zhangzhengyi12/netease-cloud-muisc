import request from './request'
import cacheRequest from './api-cache'

// 获取分类，几乎没有更新要求，使用缓存机制

const getDjCatelist = function() {
  const target = '/dj/catelist'
  return cacheRequest({ target }, false)
}

const getDjRecommend = function() {
  const target = '/dj/recommend'
  return request({ target }, false)
}

export { getDjCatelist, getDjRecommend }
