import request from './request.ts'

export default function userLogin(loginMessage:object) {
  const target = '/login/cellphone'
  const query = loginMessage
  return request({target,query})
}
