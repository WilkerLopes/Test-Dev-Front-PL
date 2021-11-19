import Vue from "vue"
import Vuex from "vuex"

import { auth } from "./auth.module"
import { contacts } from "./contacts.module"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    contacts,
  },
})
