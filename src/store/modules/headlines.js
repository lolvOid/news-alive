import axios from 'axios'
const API_KEY = 'cf892909912948a3b7a76644511b39d2'
const API_URL = 'https://newsapi.org/v2'
export default {
  mutations: {
    SET_HEADLINES(state, headlines) {
      let count = 0
      headlines.forEach((e) => {
        e['id'] = count
        count++
      })

      state.headlines = headlines
    },
   
  },
  state: {
    headlines: [],
  },
  getters: {
    allHeadlines: (state) => state.headlines,
    getHeadline:(state)=>(id)=>{
      return state.headlines.find(e=>e.id===parseInt(id));
    },
    
  },
  actions: {
    async fetchHeadlines({ commit }) {
      const res = await axios.get(
        `${API_URL}/top-headlines?country=us&apiKey=${API_KEY}`
      )
      commit('SET_HEADLINES', res.data.articles)
    },
    async fetchHeadlinesBySearch({commit},query){
      const res = await axios.get(
        `${API_URL}/top-headlines?q=${query}&apiKey=${API_KEY}`
      );
      commit('SET_HEADLINES', res.data.articles)
    },
 
   
  },
}
