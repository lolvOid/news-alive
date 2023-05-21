import { createApp } from 'vue'
import FlagIcon from 'vue-flag-icon'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'
import VueGtagPlugin from 'vue-gtag'

const intervalMS = 60 * 60 * 1000


const gtagOpts = {
  config: {
    id: "G-90STNM4SKT",
    params: {
      anonymize_ip: true,
    },
  },
};
registerSW({
  onRegisteredSW(swUrl, r) {
    r &&
      setInterval(async () => {
        if (!(!r.installing && navigator)) return

        if ('connection' in navigator && !navigator.onLine) return

        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            cache: 'no-store',
            'cache-control': 'no-cache',
          },
        })

        if (resp?.status === 200) await r.update()
      }, intervalMS)
  },
})

// Create the Vue application and configure plugins
const app = createApp(App).use(FlagIcon).use(router).use(store).use(vuetify)
app.use(VueGtagPlugin, gtagOpts);
// Load fonts
loadFonts()

// Dispatch actions to fetch data from the store
store.dispatch('fetchHeadlines')
store.dispatch('createCategories')
store.dispatch('createCountries')
store.dispatch('fetchSources')

// Mount the application to the DOM
app.mount('#app')
