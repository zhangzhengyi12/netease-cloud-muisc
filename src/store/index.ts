import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.ts'
import mutations from './mutations.ts'
import state from './state.ts'
import * as getters from './getter.ts'

Vue.use(Vuex)


export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})