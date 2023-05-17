import { createApp } from 'vue'
import FlagIcon from 'vue-flag-icon'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'

// Create the Vue application and configure plugins
const app = createApp(App).use(FlagIcon).use(router).use(store).use(vuetify)

// Load fonts
loadFonts()

// Dispatch actions to fetch data from the store
store.dispatch('fetchHeadlines')
store.dispatch('createCategories')
store.dispatch('createCountries')
store.dispatch('fetchSources')

// Mount the application to the DOM
app.mount('#app')
