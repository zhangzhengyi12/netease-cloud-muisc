import request from './request'

const getAdviceData = function(keywords: string) {
  const target = '/search/suggest'
  const query = {
    keywords
  }
  return request({ target, query }, false)
}

const getSearchResultData = function(keywords: string, type: number | string) {
  const target = '/search'
  const query = {
    keywords,
    type
  }
  return request({ target, query }, false)
}

export { getAdviceData, getSearchResultData }
