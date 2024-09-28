import type { AssignmentType } from './AssignmentType'
import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useAssignmentsStore } from './AssignmentsStore'
import { useCalculationsStore } from '../calculations'
import { useDefaultSettingsStore } from '../settings'
import { useI18n } from 'vue-i18n'

type AssignmentSettingRangeType = {
  min: number
  max: number
  step: number
  value: Ref<number>
  event: (value: any) => void
}

export type AssignmentSettingRowType = {
  label: string
  value: Ref<number> | Ref<string>
  format?: string
  customFormat?: string
  kind: string
  input?: AssignmentSettingRangeType
}

export const useAssignmentStore = defineStore('assignment', () => {
  const { t } = useI18n()
  const assignmentsStore = useAssignmentsStore()
  const calculationsStore = useCalculationsStore()
  const {
    defaultBrokerFee,
    defaultExpenses,
    defaultHourRate,
    defaultPension,
    defaultSalary,
    defaultTax,
    defaultVacation,
    defaultWorkHours
  } = useDefaultSettingsStore()

  const defaultStartDate = new Date()
  const defaultEndDate = new Date(new Date(defaultStartDate.getFullYear() + 1, 0, 1))

  const id = ref<number | undefined>(undefined)
  const name = ref('')
  const hourRate = ref(defaultHourRate)
  const brokerFee = ref(defaultBrokerFee)
  const workHours = ref(defaultWorkHours)
  const vacation = ref(defaultVacation)
  const pension = ref(defaultPension)
  const salary = ref(defaultSalary)
  const tax = ref(defaultTax)
  const expenses = ref(defaultExpenses)
  const startDate = ref(defaultStartDate)
  const endDate = ref(defaultEndDate)

  const { totalInvoiced: invoiced, actualInvoiced: income, totalProfit: profit } = calculationsStore

  const rows = ref([
    {
      label: t('name'),
      value: name,
      kind: 'input',
      event: (value: any) => {
        name.value = value
      }
    },
    {
      label: t('startDate'),
      value: startDate,
      kind: 'date',
      event: (value: any) => {
        startDate.value = value
      }
    },
    {
      label: t('endDate'),
      value: endDate,
      kind: 'date',
      event: (value: any) => {
        endDate.value = value
      }
    },
    {
      label: t('hourRate'),
      value: hourRate,
      format: 'currency',
      kind: 'range',
      input: {
        min: 500,
        max: 2000,
        step: 25,
        value: hourRate,
        event: (value: any) => {
          hourRate.value = value
        }
      }
    },
    {
      label: t('brokerFee'),
      value: computed(() => brokerFee.value / 100),
      format: 'percent',
      kind: 'range',
      input: {
        min: 0,
        max: 20,
        step: 1,
        value: brokerFee,
        event: (value: any) => {
          brokerFee.value = value
        }
      }
    },
    {
      label: t('workWeek'),
      value: workHours,
      customFormat: 'timmar / vecka',
      kind: 'range',
      input: {
        type: 'range',
        min: 0,
        max: 80,
        step: 1,
        value: workHours,
        event: (value: any) => {
          workHours.value = value
        }
      }
    },
    {
      label: t('vacation'),
      value: vacation,
      customFormat: 'dagar / år',
      kind: 'range',
      input: {
        min: 0,
        max: 80,
        step: 1,
        value: vacation,
        event: (value: any) => {
          vacation.value = value
        }
      }
    },
    {
      label: t('pensionSavings'),
      value: pension,
      format: 'currency',
      kind: 'range',
      input: {
        min: 1000,
        max: 20000,
        step: 250,
        value: pension,
        event: (value: any) => {
          pension.value = value
        }
      }
    },
    {
      label: t('salary'),
      value: salary,
      format: 'currency',
      kind: 'range',
      input: {
        min: 1000,
        max: 200000,
        step: 500,
        value: salary,
        event: (value: any) => {
          salary.value = value
        }
      }
    },
    {
      label: t('taxTable'),
      value: computed(() => tax.value / 100),
      format: 'percent',
      kind: 'range',
      input: {
        min: 20,
        max: 50,
        step: 1,
        value: tax,
        event: (value: any) => {
          tax.value = value
        }
      }
    },
    {
      label: t('otherExpenses'),
      value: expenses,
      format: 'currency',
      kind: 'range',
      input: {
        min: 1000,
        max: 100000,
        step: 250,
        value: expenses,
        event: (value: any) => {
          expenses.value = value
        }
      }
    }
  ] as AssignmentSettingRowType[])

  const save = () => {
    const assignment = {
      id: id.value,
      name: name.value,
      invoiced: invoiced(),
      income: income(),
      profit: profit(),
      hourRate: hourRate.value,
      brokerFee: brokerFee.value,
      workHours: workHours.value,
      vacation: vacation.value,
      pension: pension.value,
      salary: salary.value,
      tax: tax.value,
      expenses: expenses.value,
      startDate: startDate.value,
      endDate: endDate.value
    } as AssignmentType

    if (assignment.id !== undefined) {
      assignmentsStore.update(assignment)
    } else {
      assignment.id = assignmentsStore.getId()
      assignment.name = assignment.name.length > 0 ? assignment.name : `Assignment ${assignment.id}`
      assignmentsStore.add(assignment)
    }

    return assignment
  }

  const $reset = () => {
    id.value = undefined
    name.value = ''
    hourRate.value = defaultHourRate
    brokerFee.value = defaultBrokerFee
    workHours.value = defaultWorkHours
    vacation.value = defaultVacation
    pension.value = defaultPension
    salary.value = defaultSalary
    tax.value = defaultTax
    expenses.value = defaultExpenses
    startDate.value = defaultStartDate
    endDate.value = defaultEndDate
  }

  return {
    rows,
    save,
    $reset,
    id,
    name,
    hourRate,
    brokerFee,
    workHours,
    vacation,
    pension,
    salary,
    tax,
    expenses,
    startDate,
    endDate
  }
})
