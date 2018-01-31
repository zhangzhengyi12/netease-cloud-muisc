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

const getCateRecommend = function(type: number) {
  const target = '/dj/recommend/type'
  const query = {
    type: type
  }
  return request({ target, query }, false)
}

const getDjDetail = function(rid: number) {
  const target = '/dj/detail'
  const query = { rid }
  return request({ target, query }, false)
}

const getDjPrograms = function(rid: number) {
  const target = '/dj/program'
  const query = { rid }
  return request({ target, query }, false)
}

export { getDjCatelist, getDjRecommend, getCateRecommend, getDjDetail, getDjPrograms }
