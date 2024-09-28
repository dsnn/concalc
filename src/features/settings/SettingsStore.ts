import { defineStore } from 'pinia'

type DefaultSettingsStateType = {
  defaultBrokerFee: number
  defaultDividendTax: number
  defaultCompanyTax: number
  defaultExpenses: number
  defaultStateTaxBreakpoint: number
  defaultHolidays: number
  defaultHourRate: number
  defaultPension: number
  defaultSalary: number
  defaultTax: number
  defaultEmployeeTax: number
  defaultVacation: number
  defaultWorkHours: number
}

export const defaults = {
  defaultBrokerFee: 10,
  defaultDividendTax: 20,
  defaultCompanyTax: 20.6,
  defaultExpenses: 5000,
  defaultStateTaxBreakpoint: 613900,
  defaultHolidays: 4,
  defaultHourRate: 1000,
  defaultPension: 2000,
  defaultSalary: 51100,
  defaultTax: 34,
  defaultEmployeeTax: 31.42,
  defaultVacation: 30,
  defaultWorkHours: 40
}

export const useDefaultSettingsStore = defineStore('settings', {
  state: (): DefaultSettingsStateType => defaults,

  getters: {
    rows: (state) => [
      {
        name: 'hourRate',
        value: state.defaultHourRate,
        format: 'currency',
        prefix: 'valuePerHour',
        input: { min: 500, max: 2000, step: 25 }
      },
      {
        name: 'brokerFee',
        value: state.defaultBrokerFee / 100,
        format: 'percent',
        prefix: null,
        input: { min: 0, max: 20, step: 1 }
      },
      {
        name: 'workWeek',
        value: state.defaultWorkHours,
        format: 'custom',
        prefix: 'hour',
        input: { min: 0, max: 80, step: 1 }
      },
      {
        name: 'vacation',
        value: state.defaultVacation,
        format: 'custom',
        prefix: 'day',
        input: { min: 0, max: 80, step: 1 }
      },
      {
        name: 'holidays',
        value: state.defaultHolidays,
        format: 'custom',
        prefix: 'day',
        input: { min: 0, max: 80, step: 1 }
      },
      {
        name: 'pensionSavings',
        value: state.defaultPension,
        format: 'currency',
        prefix: 'valuePerMonth',
        input: { min: 1000, max: 20000, step: 250 }
      },
      {
        name: 'salary',
        value: state.defaultSalary,
        format: 'currency',
        prefix: 'valuePerMonth',
        input: { min: 1000, max: 200000, step: 500 }
      },
      {
        name: 'taxTable',
        value: state.defaultTax / 100,
        format: 'percent',
        prefix: null,
        input: { min: 20, max: 50, step: 1 }
      },
      {
        name: 'otherExpenses',
        value: state.defaultExpenses,
        format: 'currency',
        prefix: 'valuePerYear',
        input: { min: 1000, max: 100000, step: 250 }
      }
    ]
  },

  actions: {
    setHourRate(rate: number) {
      this.defaultHourRate = rate
    },
    setBrokerFee(newPercentage: number) {
      const percentage = newPercentage / 100
      this.defaultBrokerFee = percentage
    },
    setWorkHours(newHours: number) {
      this.defaultWorkHours = newHours
    },
    setVacation(newDays: number) {
      this.defaultVacation = newDays
    },
    setPension(newPension: number) {
      this.defaultPension = newPension
    },
    setSalary(newSalary: number) {
      this.defaultSalary = newSalary
    },
    setTax(newPercentage: number) {
      this.defaultTax = newPercentage
    },
    setExpenses(expenses: number) {
      this.defaultExpenses = expenses
    },
    save() {
      console.log('TODO: save default settings to local storage')
    }
  }
})
