
// store/index.js
import { createStore } from 'vuex'
import stack from './modules/stack';
import visited from './modules/visited';
import headlines from './modules/headlines';
import sources from './modules/sources';
export default createStore({
    
    modules: {
        stack,
        headlines,
        visited,
        sources
    },
})