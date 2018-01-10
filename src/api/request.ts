import superagent from 'superagent'
import {SERVER_URI} from './config.ts'

// TODO:可能需要更好的封装
interface requestData {
  query: object;
  target: string;
}


export default function request(data: requestData) {
  const url: string = SERVER_URI + data.target
  const query:object = data.query
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .query(query)
      .end((err:any, res:any) => {
        if (err) {
           reject(err)
        } else {
          resolve(res)
         }
      })
  })
}
