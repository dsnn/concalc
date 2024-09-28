import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'
import locale from './locale'

const numberFormats = {
  sv: {
    currency: {
      style: 'currency',
      currency: 'SEK',
      notation: 'standard',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    },
    value: {
      notation: 'standard',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    },
    decimal: {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    },
    percent: {
      style: 'percent',
      useGrouping: false
    }
  }
} as const

const datetimeFormats = {
  sv: {
    short: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }
  }
} as const

export const i18n = createI18n({
  locale: 'sv',
  fallbackLocale: 'sv',
  messages: locale,
  legacy: false,
  numberFormats,
  datetimeFormats
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.is-dark-mode',
      cssLayer: false
    }
  }
})

app.mount('#app')
