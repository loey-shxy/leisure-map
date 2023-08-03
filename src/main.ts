import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.css'
import './assets/styles/index.scss'

const pinia = createPinia()
const app = createApp(App)
app
  .use(Varlet)
  .use(router)
  .use(pinia)
  .mount('#app')
