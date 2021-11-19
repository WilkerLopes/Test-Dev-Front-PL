import ContactService from "../services/contact.service"

export const contacts = {
  namespaced: true,
  state: {
    total: 4,
    values: [],
    loadingContact: true,
  },
  actions: {
    getAll({ commit }) {
      return ContactService.getAll().then((contacts) => {
        commit("saveContatcs", contacts)
        return Promise.resolve(true)
      })
    },
    getById({ commit }, id_contact) {
      return ContactService.getById(id_contact).then((contact) => {
        commit("sucsessAction")
        return Promise.resolve(contact)
      })
    },
    create({ commit }, body) {
      return ContactService.create(body).then(
        () => {
          commit("sucsessAction")
          return Promise.resolve(true)
        },
        (error) => {
          commit("failureAction")
          console.error(error)
        }
      )
    },
    edit({ commit }, body) {
      return ContactService.edit(body).then(
        () => {
          commit("sucsessAction")
          return Promise.resolve(true)
        },
        (error) => {
          commit("failureAction")
          console.error(error)
        }
      )
    },
    delete({ commit }, id_contact) {
      return ContactService.delete(id_contact).then(
        () => {
          commit("successDelete", id_contact)
          return Promise.resolve(true)
        },
        (error) => {
          commit("failureAction")
          console.error(error)
        }
      )
    },
  },
  mutations: {
    saveContatcs(state, contacts) {
      state.values = contacts
      state.total = state.values.length
    },
    successDelete(state, id) {
      var index = state.values.findIndex((contact) => contact.id == id)

      state.values.splice(index, 1)
    },
    sucsessAction(state) {
      state.loadingContact = false
    },
    failureAction(state) {
      state.loadingContact = false
    },
  },
}
