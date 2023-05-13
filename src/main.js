import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from "./store";
loadFonts()

const app = createApp(App);
store.dispatch("fetchHeadlines")
  
store.dispatch("fetchSources")

app.use(router);
app.use(store);
app.use(vuetify);
app.mount("#app");
