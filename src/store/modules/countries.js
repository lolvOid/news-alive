export default {
  state: {
    countries: [],
  },
  mutations: {
    CREATE_COUNTRIES(state, data) {
      const newData = data.map((code) => ({
        id:code,
        name: new Intl.DisplayNames(['en'], { type: 'region' }).of(
          code.toLocaleUpperCase()
        ),
      }))

      state.countries = newData
    },
  },
  getters: {
    getCountries: (state) => state.countries,
  },
  actions: {
    createCountries({ commit }) {
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

      commit('CREATE_COUNTRIES', countryCodes)
    },
  },
}
