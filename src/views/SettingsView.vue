<!-- <script setup lang="ts">
import { storeToRefs } from 'pinia'
import SettingRow from '../components/SettingRow.vue'
import { useCalculationsStore } from '@/features/calculations'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, n } = useI18n()
const calculationsStore = useCalculationsStore()

const {
  hourRate,
  brokerPercentageFee,
  weeklyWorkHours,
  vacationDays,
  holidays,
  pensionSavings,
  salary,
  taxPercentage,
  expenses
} = storeToRefs(calculationsStore)

const getEventValue = (event: Event): number => {
  const target = event.target as HTMLInputElement
  return target.value ? Number(target.value) : 0
}

const updateHourRate = (event: Event) => {
  calculationsStore.setHourRate(getEventValue(event))
}

const updateBrokerPercentageFee = (event: Event) => {
  calculationsStore.setBrokerPercentageFee(getEventValue(event))
}

const updateWeeklyWorkHours = (event: Event) => {
  calculationsStore.setWeeklyWorkHours(getEventValue(event))
}

const updateVacationDays = (event: Event) => {
  calculationsStore.setVacationDays(getEventValue(event))
}

const updateHolidays = (event: Event) => {
  calculationsStore.setHolidays(getEventValue(event))
}

const updatePensionSavings = (event: Event) => {
  calculationsStore.setPensionSavings(getEventValue(event))
}

const updateSalary = (event: Event) => {
  calculationsStore.setSalary(getEventValue(event))
}

const updateTaxPercentage = (event: Event) => {
  calculationsStore.setTaxPercentage(getEventValue(event))
}

const updateExpenses = (event: Event) => {
  calculationsStore.setExpenses(getEventValue(event))
}

const rows = ref([
  {
    label: t('hourRate'),
    value: computed(() => calculationsStore.hourRate),
    description: computed(() => {
      const value = n(Number(calculationsStore.hourRate), 'currency')
      const options = { named: { value } }
      return t('valuePerHour', calculationsStore.hourRate, options)
    }),
    // description: computed(() => {
    //   const value: number = calcStore.hourRate
    //   const currency = n(value, 'currency')
    //   return `${currency} / ${t('hour')}`
    // }),
    input: {
      type: 'range',
      min: 500,
      max: 2000,
      step: 25,
      value: hourRate,
      event: updateHourRate
    }
  },
  {
    label: t('brokerFee'),
    value: computed(() => calculationsStore.brokerPercentageFee),
    description: computed(() => n(calculationsStore.brokerPercentageFee / 100, 'percent')),
    input: {
      type: 'range',
      min: 0,
      max: 20,
      step: 1,
      value: brokerPercentageFee,
      event: updateBrokerPercentageFee
    }
  },
  {
    label: t('workWeek'),
    value: computed(() => calculationsStore.weeklyWorkHours),
    description: computed(() => `${calculationsStore.weeklyWorkHours} ${t('hour')}`),
    input: {
      type: 'range',
      min: 0,
      max: 80,
      step: 1,
      value: weeklyWorkHours,
      event: updateWeeklyWorkHours
    }
  },
  {
    label: t('vacation'),
    value: computed(() => calculationsStore.vacationDays),
    description: computed(
      () => `${calculationsStore.vacationDays} ${t('day', calculationsStore.vacationDays)}`
    ),
    input: {
      type: 'range',
      min: 0,
      max: 80,
      step: 1,
      value: vacationDays,
      event: updateVacationDays
    }
  },
  {
    label: t('holidays'),
    value: computed(() => calculationsStore.holidays),
    description: computed(
      () => `${calculationsStore.holidays} ${t('day', calculationsStore.holidays)}`
    ),
    input: {
      type: 'range',
      min: 0,
      max: 80,
      step: 1,
      value: holidays,
      event: updateHolidays
    }
  },
  {
    label: t('pensionSavings'),
    value: computed(() => calculationsStore.pensionSavings),
    description: computed(() => {
      const value = n(Number(calculationsStore.pensionSavings), 'currency')
      const options = { named: { value } }
      return t('valuePerMonth', calculationsStore.pensionSavings, options)
    }),
    input: {
      type: 'range',
      min: 1000,
      max: 20000,
      step: 250,
      value: pensionSavings,
      event: updatePensionSavings
    }
  },
  {
    label: t('salary'),
    value: computed(() => calculationsStore.salary),
    description: computed(() => {
      const value = n(Number(calculationsStore.salary), 'currency')
      const options = { named: { value } }
      return t('valuePerMonth', calculationsStore.salary, options)
    }),
    input: {
      type: 'range',
      min: 1000,
      max: 200000,
      step: 500,
      value: salary,
      event: updateSalary
    }
  },
  {
    label: t('taxTable'),
    value: computed(() => calculationsStore.taxPercentage),
    description: computed(() => {
      return n(Number(calculationsStore.taxPercentage / 100), 'percent')
    }),
    input: {
      type: 'range',
      min: 20,
      max: 50,
      step: 1,
      value: taxPercentage,
      event: updateTaxPercentage
    }
  },
  {
    label: t('otherExpenses'),
    value: computed(() => calculationsStore.expenses),
    description: computed(() => {
      const value = n(Number(calculationsStore.expenses), 'currency')
      const options = { named: { value } }
      return t('valuePerYear', calculationsStore.salary, options)
    }),
    input: {
      min: 1000,
      max: 100000,
      step: 250,
      value: expenses,
      event: updateExpenses
    }
  }
])
</script>

<template>
  <div class="flex flex-col items-start w-full text-xs">
    <SettingRow v-for="(row, index) in rows" :key="index">
      <template #label>{{ row.label }} </template>
      <template #description>{{ row.description }}</template>
      <template #value>
        <Slider
          class="w-full"
          type="range"
          :min="row.input.min"
          :max="row.input.max"
          :step="row.input.step"
          v-model="row.input.value"
          @input="row.input.event"
        />
      </template>
    </SettingRow>
  </div>
</template> -->
