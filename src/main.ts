import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/index'
import './tron.css'
import { defaultData } from './default'
function initializeData() {
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify(defaultData.ranking))
    }
    if (!localStorage.getItem('ships')) {
      localStorage.setItem('ships', JSON.stringify(defaultData.ships))
    }
    if (!localStorage.getItem('characters')) {
      localStorage.setItem('characters', JSON.stringify(defaultData.characters))
    }
  }
initializeData()

const app = createApp(App)
app.use(router)
app.mount('#app')
