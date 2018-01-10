import lscache from 'lscache'
const LC_KEY: string = '__netease__'

const LOGIN_KEY: string = LC_KEY + 'LOGIN'

interface cacheObj  {
  set: (n: any) => any;
  get: (def: any) => any;
}

export const userLoginState:cacheObj = {
  set(Login: any) {
    lscache.set(LOGIN_KEY, Login)
    return Login
  },
  get(def: any) {
    let result = lscache.get(LOGIN_KEY)
    if (result) return result
    return def
  }
}
