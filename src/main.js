import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './scss/main.scss'

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createBootstrap } from 'bootstrap-vue-next'

import { createI18n } from 'vue-i18n'
import i18n from './i18n/locale'
import ru from './i18n/locale/ru'


const i18nConfig = createI18n({
  locale: 'pt-BR',
  messages: {
    en: i18n.en,
    'pt-BR': i18n.pt_BR,
    es: i18n.es,
    ru: i18n.ru,
  },
  numberFormats: {
    'pt-BR': {
      currency: {
        style: 'currency',
        currency: 'BRL'
      }
    },
    'en-US': {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    'es': {
      currency: {
        style: 'currency',
        currency: 'EUR'
      }
    },
    'ru': {
      currency: {
        style: 'currency',
        currency: 'RUB'
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createBootstrap())
app.use(i18nConfig)

app.mount('#app')
