export default {
  state: {
    categories: [],
  },
  mutations: {
    // Mutation to set categories with icons
    SET_CATEGORIES(state, categories) {
      const categoryIcons = [
        'mdi-domain',
        'mdi-youtube',
        'mdi-earth',
        'mdi-medical-bag',
        'mdi-nature',
        'mdi-dumbbell',
        'mdi-hammer-screwdriver',
      ]

      const categoriesWithIcons = categories.map((category, index) => ({
        id: category.toLowerCase(),
        name: category,
        icon: `mdi:${categoryIcons[index]}`,
      }))

      state.categories = categoriesWithIcons
    },
  },
  getters: {
    // Getter to retrieve categories
    getCategories: (state) => state.categories,
  },
  actions: {
    // Action to initialize categories
    createCategories({ commit }) {
      const categories = [
        'Business',
        'Entertainment',
        'General',
        'Health',
        'Science',
        'Sports',
        'Technology',
      ]

      commit('SET_CATEGORIES', categories)
    },
  },
}
