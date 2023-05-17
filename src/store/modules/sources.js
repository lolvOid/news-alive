import worldIcon from '../../assets/world.png'
import { api } from '../../api'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const API_URL = import.meta.env.VITE_NEWS_API_URL

export default {
  mutations: {
    SET_SOURCES(state, sources) {
      // Mutation to set the sources of headlines
      const sourcesWithIcons = sources.map((e) => {
        const { origin } = new URL(e.url)
        const icon = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=128`
        if (e.id == null) {
          e.id = e.name.toLowerCase()
        }
        return {
          ...e,
          icon,
        }
      })
      state.sources = [
        { id: '', name: 'All Sources', icon: worldIcon },
        ...sourcesWithIcons,
      ]
    },
  },
  state: {
    sources: [], // Array to store the sources of headlines
  },
  getters: {
    allSources: (state) => state.sources, // Getter to retrieve all sources of headlines
    getSource: (state) => (value) => {
      // Getter to retrieve a specific source of headlines by value
      if (!value) {
        return state.sources
      }
      return state.sources.find((source) => {
        const id = source.id.toLowerCase()
        return id.includes(value.toLowerCase())
      })
    },
    filteredSources: (state) => (value) => {
      // Getter to retrieve filtered sources of headlines based on value
      if (!value) {
        return state.sources
      }
      return state.sources.filter((source) => {
        const name = source.name.toLowerCase()
        return name.includes(value.toLowerCase())
      })
    },
  },
  actions: {
    async fetchSources({ commit }) {
      // Action to fetch the sources of headlines
      try {
        const res = await api.get(`${API_URL}/sources?apiKey=${API_KEY}`)
        commit('SET_SOURCES', res.data.sources)
      } catch (e) {}
    },
  },
}
