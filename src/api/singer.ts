import request from './request'
import cacheRequest from './api-cache'
import lscache from 'lscache'
import { resolve } from 'dns'
const LC_KEY: string = '__netease__'
import pinyin from 'js-pinyin'
import { read } from 'fs'
// 需要连续缓存，特殊化
pinyin.setOptions({ checkPolyphone: false, charCase: 0 })

const limit = 100
const maxOffset = 30
const targetCount = 20
const target = '/top/artists'

const getArtists = function() {
  let currentOffset = 0
  let currentCount = 0
  let resTmp: Array<any> = []
  let hotTmp: Array<any> = []

  return new Promise((resolve, reject) => {
    // 本地拥有，提前返回
    const tryCache = lscache.get(LC_KEY + target)
    if (tryCache) {
      resolve(tryCache)
      return
    }
    // 开启并发进行获取，并进行合成
    for (; currentOffset < maxOffset; currentOffset++) {
      let query = { offset: currentOffset, limit: limit }
      let offsetTmp = currentOffset
      request({ target, query }, true).then(
        (res: any) => {
          currentCount++
          //如果是第一页或第二页，加入热门列表
          if (offsetTmp < 2) {
            hotTmp = hotTmp.concat(res.body.artists)
          }
          // 合并
          if (res.body.code === 200) {
            resTmp = resTmp.concat(res.body.artists)
          }
          // 达到目标数量，进行排序+去重
          if (currentCount >= targetCount) {
            let result = pinyinSort(unique2(resTmp))
            //加入热门
            result['热门'] = { cate: '热门', list: hotTmp }
            lscache.set(LC_KEY + target, result)
            resolve(result)
          }
        },
        (err: any) => {
        }
      )
    }
  })
}

const unique2 = function(arr: Array<any>) {
  arr = arr.slice()
  interface hash {
    [props: number]: boolean
  }
  let n: hash = {},
    r = []
  for (let i = 0; i < arr.length; i++) {
    if (!n[arr[i].id]) {
      n[arr[i].id] = true
      r.push(arr[i])
    }
  }
  return r
}

// 按拼音进行排序
const pinyinSort = function(arr: Array<any>) {
  interface sortedResult {
    [props: string]: { cate: string; list: Array<any> }
  }
  const result: sortedResult = { other: { cate: '#', list: [] } }
  const AZReg = /[a-zA-z]/
  for (let item of arr) {
    let firstChar = (pinyin.getCamelChars(item.name).charAt(0) as string).toUpperCase()
    if (AZReg.test(firstChar)) {
      if (!result[firstChar]) {
        result[firstChar] = { cate: firstChar, list: [item] }
      } else {
        result[firstChar].list.push(item)
      }
    } else {
      result.other.list.push(item)
    }
  }
  return result
}

const getSingerDetail = function(id: number) {
  const target = '/artists'
  const query = {
    id
  }
  return request({ target, query }, false)
}

const getSingerAlbums = function(id: number, limit: number) {
  const target = '/artist/album'
  const query = {
    id,
    limit
  }
  return request({ target, query }, false)
}

const getSingerDesc = function(id: number) {
  const target = '/artist/desc'
  const query = {
    id
  }
  return request({ target, query }, false)
}

const getSimiSinger = function(id: number) {
  const target = '/simi/artist'
  const query = {
    id
  }
  return request({ target, query }, true)
}
export { getArtists, getSingerDetail, getSingerAlbums, getSingerDesc, getSimiSinger }
