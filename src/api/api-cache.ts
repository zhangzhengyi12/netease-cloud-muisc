import lscache from 'lscache'
const LC_KEY: string = '__netease__'
const API_KEY: string = LC_KEY + 'API'
const SIXHOUR: number = 6 * 60 * 60 * 1000
import request from './request'
import { resolve } from 'path'

interface requestData {
  query?: object
  target: string
}

const cacheRequest = function(data: requestData, needCooike: boolean = false) {
  // 尝试从本地获取，并检验时间戳
  let target = data.target
  let keys = Object.keys(data.target)
  let tryCache = lscache.get(target +  + API_KEY)
  return new Promise((resolve, reject) => {
    if (tryCache && Date.now() - tryCache.timetamp < SIXHOUR) {
      resolve(tryCache)
    } else {
      request(data, needCooike).then(
        (res: any) => {
          res.timetamp = Date.now()
          lscache.set(target + API_KEY, res)
          resolve(res)
        },
        (err: any) => {
          reject(err)
        }
      )
    }
  })
}

export default cacheRequest
