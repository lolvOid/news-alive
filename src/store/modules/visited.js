export default {
  state: {
    visited: [], // Array to store visited headlines
  },
  mutations: {
    CREATE_VISITED(state, data) {
      // Mutation to add or update a visited headline
      const index = state.visited.findIndex(
        (e) => e.title === data.title || e.description === data.description
      )
      if (index === -1) {
        // If headline not found, add it to the array
        data.updatedAt = new Date(Date.now())
        state.visited.push(data)
      } else {
        // If headline found, update it in the array
        data.updatedAt = new Date(Date.now())
        state.visited.splice(index, 1, data)
      }
    },
    RESET_VISITED(state) {
      // Mutation to reset the visited headlines array
      state.visited = []
    },
  },
  getters: {
    getAllVisited: (state) => state.visited, // Getter to retrieve all visited headlines
    getVisited: (state) => (id) => state.visited.find((e) => e.id === id), // Getter to retrieve a specific visited headline by ID
  },
  actions: {
    createVisited({ commit }, data) {
      // Action to create a visited headline
      commit('CREATE_VISITED', data)
    },
    resetVisited({ commit }) {
      // Action to reset the visited headlines array
      commit('RESET_VISITED')
    },
  },
}
