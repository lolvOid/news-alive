import { createApp } from 'vue'
import FlagIcon from 'vue-flag-icon'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'

loadFonts()

const app = createApp(App)
store.dispatch('fetchHeadlines')
store.dispatch('createCategories')
store.dispatch('createCountries')

store.dispatch('fetchSources')
app.use(FlagIcon)
app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
