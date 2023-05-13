import axios from 'axios'


const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = import.meta.env.VITE_NEWS_API_URL;

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
