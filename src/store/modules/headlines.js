import { v4 as uuidv4 } from 'uuid'
import { api } from '../../api'
import generateHashUniqueID from '../../helpers/index'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const API_URL = import.meta.env.VITE_NEWS_API_URL

export default {
  // #Define Mutation
  mutations: {
    SET_HEADLINES(state, headlines) {
      headlines.forEach((e) => {
        // Add 'updatedAt' field with current date and time
        e.updatedAt = new Date(Date.now())
        // Generate unique ID using uuidv4()
        e.id = generateHashUniqueID(uuidv4())
        if (e.source.id == null) e.source.id = e.source.name.toLowerCase()
        const { origin } = new URL(e.url)
        const icon = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=128`
        e.icon = icon
      })
      state.headlines = headlines
    },

    UPDATE_HEADLINE_TITLE(state, { id, title }) {
      const headline = state.headlines.find((e) => e.id === id)

      if (headline) {
        headline.title = title
        headline.updatedAt = new Date(Date.now())
      }
    },
  },
  state: {
    headlines: [],
  },
  getters: {
    allHeadlines: (state) => state.headlines,
    getHeadline: (state) => (id) => state.headlines.find((e) => e.id === id),
  },
  actions: {
    async fetchHeadlines({ commit }, country) {
      const res = await api.get(
        `${API_URL}/top-headlines?country=${country}&apiKey=${API_KEY}`
      )
      commit('SET_HEADLINES', res.data.articles)
    },

    async searchHeadlines({ commit }, { q, sources, country, category }) {
      let url = `${API_URL}/top-headlines?apiKey=${API_KEY}`

      if (q) {
        url += `&q=${q}`
      }

      if (category && !sources) {
        // Only add category if sources parameter is not present
        url += `&category=${category}`
      }

      if (sources && !category) {
        // Only add sources if category parameter is not present
        url += `&sources=${sources}`
      }

      if (country) {
        url += `&country=${country}`
      }

      const res = await api.get(url)
      commit('SET_HEADLINES', res.data.articles)
    },
    updateHeadlineTitle({ commit }, { id, title }) {
      commit('UPDATE_HEADLINE_TITLE', { id, title })
    },
    async fetchHeadlinesWrong({ commit }) {
      const res = await api.get(`${API_URL}/top_headlines?apiKey=${API_KEY}`)
    },
  },
}
