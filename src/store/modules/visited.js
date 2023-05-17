export default {
  state: {
    visited: [],
  },
  mutations: {
    CREATE_VISITED(state, data) {
      const index = state.visited.findIndex(
        (e) => e.title === data.title || e.description === data.description
      )
      if (index === -1) {
        data.updatedAt = new Date(Date.now())
        state.visited.push(data)
      } else {
        data.updatedAt = new Date(Date.now())
        state.visited.splice(index, 1, data)
      }
    },
    RESET_VISITED(state) {
      state.visited = []
    },
  },
  getters: {
    getAllVisited: (state) => state.visited,
    getVisited: (state) => (id) => state.visited.find((e) => e.id === id),
  },
  actions: {
    createVisited({ commit }, data) {
      commit('CREATE_VISITED', data)
    },
    resetVisited({ commit }) {
      commit('RESET_VISITED')
    },
  },
}
