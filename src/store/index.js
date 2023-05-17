import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import visited from './modules/visited';
import headlines from './modules/headlines';
import sources from './modules/sources';
import countries from './modules/countries';
import categories from './modules/categories';
export default createStore({
  plugins: [createPersistedState()],
  state: {
    error: '',
    isLoading: false,
 
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_LOADING(state, value) {
      state.isLoading = value;
    },
    RESET_ERROR(state) {
      state.error = '';
    },
   
  },
  actions: {
    setError({ commit }, error) {
      commit('SET_ERROR', error);
      setTimeout(() => {
        commit('RESET_ERROR');
      }, 10000); // Reset error after 10 seconds
    },
    setLoading({ commit }, value) {
      commit('SET_LOADING', value);
    },
  
 
  },
  getters: {
    isLoading: state => state.isLoading,
    error: state => state.error,
    
  },

  modules: {
    visited,
    headlines,
    sources,
    countries,
    categories
  },
});
