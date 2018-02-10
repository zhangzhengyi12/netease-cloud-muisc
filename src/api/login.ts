import request from './request.ts'

function userLogin(loginMessage: object) {
  const target = '/login/cellphone'
  const query = loginMessage
  return request({ target, query }, true)
}

const zhijie = function() {
  const target = '/login/cellphone'
  const query = { phone: '13221338819', password: 'nokia720' }
  return request({ target, query }, true)
}

const signIn = function() {
  const target = '/daily_signin'
  const query = {
    timestamp: Date.now()
  }
  return request({ target, query }, true)
}
export { zhijie, userLogin, signIn }
