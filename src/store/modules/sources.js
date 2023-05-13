import axios from 'axios'
const API_KEY = 'cf892909912948a3b7a76644511b39d2'
const API_URL = 'https://newsapi.org/v2'
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
