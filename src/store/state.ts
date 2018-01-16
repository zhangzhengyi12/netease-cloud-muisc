import { userLoginState } from 'common/js/cache.ts'
import { viewport } from './getter'
interface state {
  userLoginState: {
    isLogin: boolean
    userData: object
  }
  viewport: {
    width: number
    height: number
  }
}

const defaultLogin: state['userLoginState'] = {
  isLogin: false,
  userData: {}
}

export default {
  userLoginState: userLoginState.get(defaultLogin),
  viewport: { width: document.body.clientWidth, height: window.innerHeight }
}
