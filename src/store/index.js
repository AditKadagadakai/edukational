import Vue from 'vue'
import Vuex from 'vuex'
import { setLocalStorage, getLocalStorage } from '@/core/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listLink: getLocalStorage('linkList') ? getLocalStorage('linkList') : []
  },
  mutations: {
    updatelink(state, link) {
      if (!link.isEdit) {
        state.listLink.push(link)
      } else {
        const editLink = state.listLink.find((item) => { return item.url === link.url })
        editLink.type = link.type
        editLink.subject = link.subject
        editLink.grade = link.grade
        editLink.rating = link.rating
        editLink.description = link.description
        editLink.link = link.url
      }
      setLocalStorage('linkList', state.listLink) // Updated to localStorage
    },
    deletelink(state, link) {
      state.listLink.splice(link.index, 1)
      setLocalStorage('linkList', state.listLink) // Updated to localStorage
    }
  },
  actions: {
    updatelistLink({ commit }, data) {
      commit('updatelink', data.link)
    },
    deleteStoreLink({ commit }, data) {
      commit('deletelink', data.link)
    }
  },
  modules: {
  }
})
