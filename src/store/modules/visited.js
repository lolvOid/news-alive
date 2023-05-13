export default{
    state:{
        visited:[]
    },
    mutations:{
        CREATE_VISITED(state,visited){
         
        }
    },
    getters:{
        allVisited:(state)=>state.visited,
    },
    actions:{
        async createVisited({commit},visited){
            commit('CREATE_VISITED',visited)
        }
    }
}