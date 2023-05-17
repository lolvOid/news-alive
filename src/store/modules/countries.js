export default {
  state: {
    countries: [],
  },
  mutations: {
    CREATE_COUNTRIES(state, data) {
      // Map the country codes to objects with id and name properties
      const newData = data.map((code) => ({
        id: code,
        name: new Intl.DisplayNames(['en'], { type: 'region' }).of(
          code.toUpperCase()
        ),
      }))

      // Update the countries state
      state.countries = newData
    },
  },
  getters: {
    getCountries: (state) => state.countries,
  },
  actions: {
    createCountries({ commit }) {
      // List of country codes
      const countryCodes = [
        'us',
        'in',
        'ca',
        'ua',
        'th',
        'au',
        'sg',
        'gb',
        'ch',
        'ru',
        'kr',
        'cn',
        'fr',
        'il',
        'ae',
        'it',
        'ph',
        'tw',
      ]

      // Trigger the mutation to create countries
      commit('CREATE_COUNTRIES', countryCodes)
    },
  },
}
