
// store/index.js
import { createStore } from 'vuex'
import stack from './modules/stack';
import visited from './modules/visited';
import headlines from './modules/headlines';
import sources from './modules/sources';
const store = createStore({
    state:{

    },
    mutations:{

    },
    actions:{

    },
    modules: {
        stack,
        headlines,
        visited,
        sources
    },
})