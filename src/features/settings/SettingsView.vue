<script setup lang="ts"></script>
<template>SettingsView</template>
<!-- <script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDefaultSettingsStore } from './SettingsStore'

const { t, n } = useI18n()

const defaultSettingsStore = useDefaultSettingsStore()

const {
  defaultBrokerFee,
  defaultExpenses,
  defaultHolidays,
  defaultHourRate,
  defaultPension,
  defaultSalary,
  defaultTax,
  defaultVacation,
  defaultWorkHours
} = storeToRefs(defaultSettingsStore)

const eventToNumber = (event: Event): number => {
  const target = event.target as HTMLInputElement
  return target.value ? Number(target.value) : 0
}

const rows = ref([
  {
    label: t('hourRate'),
    value: defaultHourRate,
    description: computed(() => {
      const value = n(Number(defaultHourRate.value), 'currency')
      const options = { named: { value } }
      return t('valuePerHour', defaultHourRate.value, options)
    }),
    input: {
      min: 500,
      max: 2000,
      step: 25,
      value: defaultHourRate,
      event: (event: Event) => (defaultHourRate.value = eventToNumber(event))
    }
  },
  {
    label: t('brokerFee'),
    value: defaultBrokerFee,
    description: computed(() => n(defaultBrokerFee.value / 100, 'percent')),
    input: {
      min: 0,
      max: 20,
      step: 1,
      value: defaultBrokerFee,
      event: (event: Event) => (defaultBrokerFee.value = eventToNumber(event))
    }
  },
  {
    label: t('workWeek'),
    value: defaultWorkHours,
    description: computed(() => `${defaultWorkHours.value} ${t('hour')}`),
    input: {
      min: 0,
      max: 80,
      step: 1,
      value: defaultWorkHours,
      event: (event: Event) => (defaultWorkHours.value = eventToNumber(event))
    }
  },
  {
    label: t('vacation'),
    value: defaultVacation,
    description: computed(() => `${defaultVacation.value} ${t('day', defaultVacation.value)}`),
    input: {
      min: 0,
      max: 80,
      step: 1,
      value: defaultVacation,
      event: (event: Event) => (defaultVacation.value = eventToNumber(event))
    }
  },
  {
    label: t('holidays'),
    value: defaultHolidays,
    description: computed(() => `${defaultHolidays.value} ${t('day', defaultHolidays.value)}`),
    input: {
      min: 0,
      max: 80,
      step: 1,
      value: defaultHolidays,
      event: (event: Event) => (defaultHolidays.value = eventToNumber(event))
    }
  },
  {
    label: t('pensionSavings'),
    value: defaultPension,
    description: computed(() => {
      const value = n(Number(defaultPension.value), 'currency')
      const options = { named: { value } }
      return t('valuePerMonth', defaultPension.value, options)
    }),
    input: {
      min: 1000,
      max: 20000,
      step: 250,
      value: defaultPension,
      event: (event: Event) => (defaultPension.value = eventToNumber(event))
    }
  },
  {
    label: t('salary'),
    value: defaultSalary,
    description: computed(() => {
      const value = n(Number(defaultSalary.value), 'currency')
      const options = { named: { value } }
      return t('valuePerMonth', defaultSalary.value, options)
    }),
    input: {
      min: 1000,
      max: 200000,
      step: 500,
      value: defaultSalary,
      event: (event: Event) => (defaultSalary.value = eventToNumber(event))
    }
  },
  {
    label: t('taxTable'),
    value: defaultTax,
    description: computed(() => {
      return n(Number(defaultTax.value / 100), 'percent')
    }),
    input: {
      min: 20,
      max: 50,
      step: 1,
      value: defaultTax,
      event: (event: Event) => (defaultTax.value = eventToNumber(event))
    }
  },
  {
    label: t('otherExpenses'),
    value: defaultExpenses,
    description: computed(() => {
      const value = n(Number(defaultExpenses.value), 'currency')
      const options = { named: { value } }
      return t('valuePerYear', defaultExpenses.value, options)
    }),
    input: {
      min: 1000,
      max: 100000,
      step: 250,
      value: defaultExpenses,
      event: (event: Event) => (defaultExpenses.value = eventToNumber(event))
    }
  }
])
</script>

<template>
  <div class="flex flex-col items-start w-full text-xs">
    <div
      v-for="(row, index) in rows"
      :key="index"
      class="flex py-2 flex-col border-b border-gray-300 w-full"
    >
      <div class="flex items-center justify-between">
        <span class="text-sm font-bold text-gray-800">
          {{ row.label }}
        </span>
        <span>
          {{ row.description }}
        </span>
      </div>
      <div class="flex py-2">
        <Slider
          class="w-full"
          :min="row.input.min"
          :max="row.input.max"
          :step="row.input.step"
          v-model="row.input.value"
          @input="row.input.event"
        />
      </div>
    </div>
  </div>
</template> -->
