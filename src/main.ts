import { createApp } from 'vue'
import { Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
const pinia = createPinia()

const app = createApp(App)
app
  .use(Quasar, {
    plugins: {}
  })
  .use(router)
  .use(pinia)
  .mount('#app')
