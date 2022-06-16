import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    user: {
      type: ''
    },
    ids: [],
  },
  mutations: {
    login(state) {
      state.isAuthenticated = true
    },
    logout(state) {
      state.isAuthenticated = false
    },
  },
  actions: {
    loginAction(context) {
      context.commit('login')
    },
    logoutAction(context) {
      context.commit('logout')
    }
  },
  modules: {
  }
})
