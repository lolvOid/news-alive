import axios from 'axios'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = import.meta.env.VITE_NEWS_API_URL;

export default {
  mutations: {
    SET_SOURCES(state, sources) {
      
      sources.forEach(e=>{
        const origin = new URL(e.url).origin
        const icon =  `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=128`
        e["icon"]=icon;
      })
      state.sources = sources
    },
  },
  state: {
    sources: [],
  },
  getters: {
    allSources: (state) => state.sources,
  },
  actions: {
   
    async fetchSources({ commit }) {
      try{
        const res = await axios.get(
          `${API_URL}/sources?apiKey=${API_KEY}`
        )
  
        commit('SET_SOURCES', res.data.sources)
      }catch(e){
        console.error(e)
      }
      
    },
  },
}
