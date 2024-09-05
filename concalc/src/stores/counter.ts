import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const CalculateWorkWeeks = (vacationDays: number): number => {
  const WEEKS_IN_YEAR = 52
  const DAYS_IN_WEEK = 5
  const vacationDaysInWeeks = Math.floor(vacationDays / DAYS_IN_WEEK)
  return WEEKS_IN_YEAR - vacationDaysInWeeks
}

export const CalculateTotalWorkHours = (
  weeklyWorkHours: number,
  workWeeks: number,
  vacationDays: number
): number => {
  const workHours = weeklyWorkHours * workWeeks
  const result = workHours - vacationDays
  return result > 0 ? result : 0
}

export const CalcuateActualHourRate = (hourRate: number, brokerPercentageFee: number): number => {
  const brokerFee = 1 - brokerPercentageFee
  return Math.round(hourRate * brokerFee)
}

export const CalculateTotalIncome = (hourRate: number, totalWorkHours: number): number => {
  return hourRate * totalWorkHours
}

export const CalculateRealHourRate = (hourRate: number, brokerPercentageFee: number): number => {
  return hourRate * (1 - brokerPercentageFee)
}

export const CalculateTotalPerYear = (value: number): number => {
  return value * 12
}

export const CalculateProfit = (
  totalIncomeWithBrokerFee: number,
  monthlyCosts: number,
  companyTaxPercentage: number,
  pensionSavings: number
): number => {
  const income = totalIncomeWithBrokerFee
  const expenses = CalculateTotalPerYear(monthlyCosts)
  const actualProfit = income - expenses
  const profitTotalTax = actualProfit * companyTaxPercentage
  return actualProfit - profitTotalTax - pensionSavings
}

export const CalculateDividendByTemplateRule = (): number => {
  return 0
}

export const CalculateDividendByMainRule = (
  totalSalary: number,
  maxDividendPercentage: number,
  capitalTax: number
): number => {
  const dividend = totalSalary * maxDividendPercentage
  const dividendTax = dividend * capitalTax
  return dividend - dividendTax
}

export const CalculateTotalSaved = (revenue: number, dividend: number): number => {
  // 665 777 - 137 000 - 306 600
  // skatt = vinst * bolagsskatt (0.206)
  // vinst - skatt - utdelning
  const revenueTax = revenue * 0.206
  return Math.floor(revenue - revenueTax - dividend)
}

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      brokerPercentageFee: 0.17,
      companyTaxPercentage: 0.206,
      employeeTaxPercentage: 0.3142,
      taxPercentage: 34,
      maxDividendPercentage: 0.5,
      capitalTaxPercentage: 0.2,
      hourRate: 900,
      weeklyWorkHours: 40,
      vacationDays: 40,
      pensionSavings: 3000,
      salary: 51100,
      monthlyCosts: 20000
    }
  },
  getters: {
    workWeeks: (state): number => {
      return CalculateWorkWeeks(state.vacationDays)
    },
    actualBrokerPercentageFee: (state): number => {
      return Math.round(state.brokerPercentageFee * 100)
    },
    totalWorkHours(state): number {
      return CalculateTotalWorkHours(state.weeklyWorkHours, this.workWeeks, state.vacationDays)
    },
    actualHourRate(state): number {
      return CalcuateActualHourRate(this.hourRate, state.brokerPercentageFee)
    },
    totalIncome(): number {
      return CalculateTotalIncome(this.hourRate, this.totalWorkHours)
    },
    incomePercentage(state): number {
      const brokerFee = 100 * state.brokerPercentageFee
      return 100 - brokerFee
    },
    totalIncomeWithoutBrokerFee(): number {
      const realHourRate = CalculateRealHourRate(this.hourRate, this.brokerPercentageFee)
      return CalculateTotalIncome(realHourRate, this.totalWorkHours)
    },
    realHourRate(state): number {
      return this.hourRate * (1 - state.brokerPercentageFee)
    },
    totalSalary(state): number {
      return CalculateTotalPerYear(state.salary)
    },
    totalSalaryWithEmployeeTax(state): number {
      const tax = 1 + state.employeeTaxPercentage
      return Math.round(state.salary / tax)
    },
    totalExpenses(state): number {
      return CalculateTotalPerYear(state.monthlyCosts)
    },
    totalProfit(state): number {
      const profit = CalculateProfit(
        this.totalIncomeWithoutBrokerFee,
        state.monthlyCosts,
        state.companyTaxPercentage,
        state.pensionSavings
      )
      return Math.round(profit)
    },
    dividend(): number {
      return CalculateDividendByMainRule(
        this.totalSalary,
        this.maxDividendPercentage,
        this.capitalTaxPercentage
      )
    },
    totalSaved(): number {
      return CalculateTotalSaved(this.totalProfit, this.dividend)
    },
    totalPensionSavings(state) {
      return state.pensionSavings * 12
    }
  },
  actions: {
    setHourRate(newRate: number) {
      this.hourRate = newRate
    },
    setBrokerPercentageFee(newPercentage: number) {
      const percentage = newPercentage / 100
      this.brokerPercentageFee = percentage
    },
    setWeeklyWorkHours(newHours: number) {
      this.weeklyWorkHours = newHours
    },
    setVacationDays(newDays: number) {
      this.vacationDays = newDays
    },
    setPensionSavings(newSavings: number) {
      this.pensionSavings = newSavings
    },
    setSalary(newSalary: number) {
      this.salary = newSalary
    },
    setTaxPercentage(newPercentage: number) {
      this.taxPercentage = newPercentage
    },
    setMonthlyCosts(newCosts: number) {
      this.monthlyCosts = newCosts
    }
  }
})

export const useCounterStore2 = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
