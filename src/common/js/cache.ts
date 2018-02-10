import lscache from 'lscache'
const LC_KEY: string = '__netease__'

const LOGIN_KEY: string = LC_KEY + 'LOGIN'

interface cacheObj {
  set: <t>(vat: t, key: string) => t
  get: <t>(def: t, key: string) => any | t
}

export const cache: cacheObj = {
  set<t>(val: t, key: string): t {
    setTimeout(() => {
      lscache.set(key + LC_KEY, val)
    }, 5000)
    return val
  },
  get<t>(def: t, key: string): any {
    let r = lscache.get(key + LC_KEY)
    if (r) return r
    return def
  }
}
