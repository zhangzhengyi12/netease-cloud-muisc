import superagent from 'superagent'
import { SERVER_URI } from './config.ts'

// TODO:可能需要更好的封装
interface requestData {
  query?: object
  target: string
}

const request = function request(data: requestData, needCooike: boolean) {
  const url: string = SERVER_URI + data.target
  const query = data.query ? data.query : {}
  if (needCooike) {
    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .withCredentials()
        .query(query)
        .end((err: any, res: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .query(query)
        .end((err: any, res: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }

}

export default request
