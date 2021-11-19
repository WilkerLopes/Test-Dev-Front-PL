import AuthService from "../services/auth.service"
const user = JSON.parse(localStorage.getItem("user"))

export const auth = {
  namespaced: true,
  state: {
    status: {
      loggedIn: user ? true : false,
    },
    user: user ? user : null,
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user)
          return Promise.resolve(user)
        },
        (error) => {
          commit("loginFailure")
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      AuthService.logout()
      commit("logout")
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
  },
  getters: {},
}
