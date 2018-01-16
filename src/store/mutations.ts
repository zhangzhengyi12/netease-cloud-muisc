import * as types from './mutation-type.ts'
import { userLoginState } from 'common/js/cache.ts'
import { MutationTree } from 'vuex'

const mutations: MutationTree<any> =  {
  [types.SET_USER_LOGIN](state: any, logininfo: any) {
    state.userLoginState = logininfo
  },
  [types.SET_CLIENT_VIEWPORT](state: any, viewport) {
    state.viewport = viewport
  }
}

export default mutations