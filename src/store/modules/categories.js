export default {
  state: {
    categories: [],
  },
  mutations: {
    CREATE_CATEGORIES(state, data) {
      const categoriesIcons = [
        'mdi:mdi-domain',
        'mdi:mdi-youtube',
        'mdi:mdi-earth',
        'mdi:mdi-medical-bag',
        'mdi:mdi-nature',
        'mdi:mdi-dumbbell',
        'mdi:mdi-hammer-screwdriver',
      ]
      const newData = data.map((c) => ({
        id: c,
        name: c.charAt(0).toUpperCase() + c.slice(1).toLowerCase(),
        icon: categoriesIcons[data.indexOf(c)],
      }))

      state.categories = newData
    },
  },
  getters: {
    getCategories: (state) => state.categories,
  },
  actions: {
    createCategories({ commit }) {
      const category = [
        'business',
        'entertainment',
        'general',
        'health',
        'science ',
        'sports',
        'technology',
      ]

      commit('CREATE_CATEGORIES', category)
    },
  },
}
