import { userLoginState } from 'common/js/cache.ts'
interface state {
  userLoginState: {
    isLogin: boolean
    userData: object
  }
}

const defaultLogin: state['userLoginState'] = {
  isLogin: false,
  userData: {}
}

export default  {
  userLoginState: userLoginState.get(defaultLogin)
}
