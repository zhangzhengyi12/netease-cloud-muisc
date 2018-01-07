import Vue from 'vue'

// 需要使用 Vuex 的 interface 
import Vuex, { ActionTree, MutationTree } from 'vuex'

Vue.use(Vuex)

interface State  {
  name: String;
}

const state: State = {
  name: '33333'
}

const actions: ActionTree<State, any> = {
  changName (
    { commit },
    name: String
  ): void {
    commit('CHANGE_NAME', name)
  }
}

const mutations: MutationTree<State> = {
  'CHANGE_NAME' (
    state: State,
    name: String
  ): void {
    state.name = name
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})