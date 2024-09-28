import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// import { useAssignmentsStore } from '../assignments'

export const useStatisticsStore = defineStore('statistics', () => {
  const { t, n } = useI18n()

  // const assignments = useAssignmentsStore()

  const cards = ref([
    { title: t('salary'), content: n(51000, 'currency') },
    { title: t('dividend'), content: n(306600, 'currency') },
    { title: t('pensionSavings'), content: n(24000, 'currency') },
    { title: t('savedCapital'), content: n(222023, 'currency') }
  ])

  return { cards }
})
