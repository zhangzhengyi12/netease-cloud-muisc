import * as types from './mutation-type.ts'
import { userLoginState } from 'common/js/cache.ts'
import { ActionTree } from 'vuex'

const changeUserLoginState = function({ commit }: any, login: any) {
  commit(types.SET_USER_LOGIN, userLoginState.set(login))
}

const actions: ActionTree<any, any> = {
  changeUserLoginState
}

export default actions
