// Styles
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'
import { aliases, fa } from 'vuetify/iconsets/fa'
// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  {
    components,
    directives,
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
        mdi,
      },
    },
  }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
