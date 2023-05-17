import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import visited from './modules/visited'
import headlines from './modules/headlines'
import sources from './modules/sources'
import countries from './modules/countries'
import categories from './modules/categories'

export default createStore({
  plugins: [createPersistedState()], // This Vuex store uses the vuex-persistedstate plugin to persist the state in the browser's local storage.

  // Global state
  state: {
    error: '', // Holds the error message
    isLoading: false, // Indicates if the application is currently loading data
  },

  // Mutations modify the state
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_LOADING(state, value) {
      state.isLoading = value
    },
    RESET_ERROR(state) {
      state.error = ''
    },
  },

  // Actions perform asynchronous operations and commit mutations
  actions: {
    // Sets the error message and automatically resets it after 10 seconds
    setError({ commit }, error) {
      commit('SET_ERROR', error)
      setTimeout(() => {
        commit('RESET_ERROR')
      }, 10000) // Reset error after 10 seconds
    },
    setLoading({ commit }, value) {
      commit('SET_LOADING', value)
    },
  },

  // Getters retrieve and compute derived state
  getters: {
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
  },

  // Modules for organizing related state, mutations, actions, and getters
  modules: {
    visited,
    headlines,
    sources,
    countries,
    categories,
  },
})
