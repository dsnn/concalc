import {
  calculateActualHourRate,
  calculateActualWorkHours,
  calculateDividend,
  calculateProfit,
  calculateTotalSaved
} from '@/utils'
import { defineStore } from 'pinia'
import { useDefaultSettingsStore } from '../settings/SettingsStore'
import { computed, ref } from 'vue'

export const useCalculationsStore = defineStore('calculations', () => {
  const {
    defaultStateTaxBreakpoint,
    defaultDividendTax,
    defaultCompanyTax,
    defaultBrokerFee,
    defaultExpenses,
    defaultHourRate,
    defaultPension,
    defaultSalary,
    defaultTax,
    defaultEmployeeTax,
    defaultVacation,
    defaultWorkHours,
    defaultHolidays
  } = useDefaultSettingsStore()

  const hourRate = ref(defaultHourRate)
  const brokerFee = ref(defaultBrokerFee)
  const workHours = ref(defaultWorkHours)
  const vacation = ref(defaultVacation)
  const pension = ref(defaultPension)
  const salary = ref(defaultSalary)
  const tax = ref(defaultTax)
  const employeeTax = ref(defaultEmployeeTax)
  const expenses = ref(defaultExpenses)
  const capitalTaxPercentage = ref(0)
  const companyTax = ref(defaultCompanyTax)
  const currentDividendTemplate = ref(0)
  const govermentTaxBreakpoint = ref(0)
  const holidays = ref(defaultHolidays)
  const maxDividendPercentage = ref(0)

  const settingRows = ref([
    {
      name: 'hourRate',
      value: hourRate,
      format: 'currency',
      prefix: 'valuePerHour',
      input: { min: 500, max: 2000, step: 25 }
    },
    {
      name: 'brokerFee',
      value: brokerFee,
      computed: computed(() => brokerFee.value / 100),
      format: 'percent',
      prefix: null,
      input: { min: 0, max: 20, step: 1 }
    },
    {
      name: 'workWeek',
      value: workHours,
      format: 'custom',
      prefix: 'hour',
      input: { min: 0, max: 80, step: 1 }
    },
    {
      name: 'vacation',
      value: vacation,
      format: 'custom',
      prefix: 'day',
      input: { min: 0, max: 80, step: 1 }
    },
    {
      name: 'holidays',
      value: holidays,
      format: 'custom',
      prefix: 'day',
      input: { min: 0, max: 80, step: 1 }
    },
    {
      name: 'pensionSavings',
      value: pension,
      format: 'currency',
      prefix: 'valuePerMonth',
      input: { min: 1000, max: 20000, step: 250 }
    },
    {
      name: 'salary',
      value: salary,
      format: 'currency',
      prefix: 'valuePerMonth',
      input: { min: 1000, max: 200000, step: 500 }
    },
    {
      name: 'taxTable',
      value: tax,
      computed: computed(() => tax.value / 100),
      format: 'percent',
      prefix: null,
      input: { min: 20, max: 50, step: 1 }
    },
    {
      name: 'otherExpenses',
      value: expenses.value,
      format: 'currency',
      prefix: 'valuePerYear',
      input: { min: 1000, max: 100000, step: 250 }
    }
  ])

  const actualWorkHours = (): number => {
    return calculateActualWorkHours(workHours.value, vacation.value)
  }

  const actualHourRate = (): number => {
    return calculateActualHourRate(hourRate.value, brokerFee.value)
  }

  const totalInvoiced = (): number => {
    return hourRate.value * actualWorkHours()
  }

  const incomePercentage = (): number => {
    return 100 - brokerFee.value
  }

  const actualInvoiced = (): number => {
    return actualHourRate() * actualWorkHours()
  }

  const realHourRate = (): number => {
    return hourRate.value * (1 - brokerFee.value)
  }

  const grossSalaryPerYear = (): number => {
    return salary.value * 12
  }

  const netSalaryPerYear = (): number => {
    const gross = grossSalaryPerYear()
    const tax = 1 + defaultTax / 100
    return gross / tax
  }

  const netSalary = (): number => {
    const percentage = tax.value / 100
    const taxPercentage = 1 + percentage
    return Math.round(salary.value / taxPercentage)
  }

  const totalExpenses = (): number => {
    return expenses.value * 12
  }

  const totalProfit = (): number => {
    return calculateProfit(
      actualWorkHours(),
      hourRate.value,
      brokerFee.value,
      employeeTax.value,
      salary.value,
      pension.value,
      expenses.value
    )
  }

  const grossDividendPerYear = (): number => {
    return calculateDividend(salary.value)
  }

  const netDividendPerYear = (): number => {
    const dividendPerYear = calculateDividend(salary.value)
    const taxPercentage = defaultDividendTax / 100
    return dividendPerYear / (1 + taxPercentage)
  }

  const grossDividendPerMonth = () => {
    const result = grossDividendPerYear() / 12
    return result > 0 ? Math.round(result) : 0
  }

  const netDividendPerMonth = () => {
    const result = netDividendPerYear() / 12
    return result > 0 ? Math.round(result) : 0
  }

  const grossSalaryWithDividendPerMonth = () => {
    const dividend = grossDividendPerMonth()
    return salary.value + dividend
  }

  const netSalaryWithDividendPerMonth = () => {
    const dividend = netDividendPerMonth()
    const salary = netSalary()
    return salary + dividend
  }

  const totalSaved = (): number => {
    const profit = totalProfit()
    const dividend = grossDividendPerYear()
    return calculateTotalSaved(companyTax.value, profit, dividend)
  }

  const totalPensionSavings = () => {
    return pension.value * 12
  }

  const grossMonthlyMunicipalTax = () => {
    // grossSalary: number, tax: number
    const taxPercentage = defaultTax / 100
    const someCharge = 0.04
    const result = defaultSalary * (taxPercentage - someCharge)
    return Math.round(result)
  }

  const grossMonthlyStateTax = () => {
    // grossSalary: number,
    // stateTaxBreakpoint: number,
    // stateTaxRate: number
    const montlyStateTax = defaultStateTaxBreakpoint / 12 // stateTaxBreakpoint / 12
    const shouldApplyStateTax = defaultSalary > montlyStateTax
    const stateTaxPercentage = defaultDividendTax / 100 //stateTaxRate / 100
    const salaryWithoutTax = defaultSalary - montlyStateTax
    const totalTax = stateTaxPercentage * salaryWithoutTax
    const result = shouldApplyStateTax ? totalTax : 0
    return Math.round(result)
  }

  const salaryVsEmployee = () => {
    // netSalary: number,
    // dividend: number,
    // tax: number,
    // stateTaxBreakpoint: number,
    // stateTax: number
    const netSalary = defaultSalary / (1 + defaultTax)
    const dividendPerMonth = grossDividendPerYear() / 12
    const netSalaryWithDividend = netSalary + dividendPerMonth
    const salaryStateTaxBreakpoint = defaultStateTaxBreakpoint / 12 // stateTaxBreakpoint / 12
    const taxPercentage = defaultTax / 100
    const stateTaxPercentage = defaultDividendTax / 100
    const someCharge = 0.04
    // this.getMotsvarandeLonSomAnstalld(
    // h.nettomanadslon + h.nettoutdelningPerAr / 12,
    // null !== (d = null == e ? undefined : e.skattetabell) && undefined !== d ? d : 0,
    //  i.statligSkattBrytgrans / 12,
    //   i.statligSkatteSats)

    // getMotsvarandeLonSomAnstalld(e, i, r, s) {
    const actualTax = taxPercentage - someCharge
    const salary = netSalaryWithDividend / (1 - actualTax)
    let calculatedSalary = salary
    if (salary > salaryStateTaxBreakpoint) {
      const difference = salary - salaryStateTaxBreakpoint
      const salaryWODifference = salary - difference
      const differeceTax = difference - difference * actualTax
      const totalTax = actualTax + stateTaxPercentage
      calculatedSalary = salaryWODifference + differeceTax / (1 - totalTax)
    }
    return 100 * Math.ceil(calculatedSalary / 100)
  }

  // h.bruttomanadslon - (h.kommunalskattPerManad + h.statligSkattPerManad)
  // h.nettomanadslon = h.bruttomanadslon - (h.kommunalskattPerManad + h.statligSkattPerManad)
  // h.bolagsskatt = h.vinst * (i.bolagsskatt / 100)
  // h.statligSkattPerManad = this.getManatligStatligSkatt(h.bruttomanadslon, i.statligSkattBrytgrans, i.statligSkatteSats)
  // h.mestFormanligManadslon = 100 * Math.floor(i.statligSkattBrytgrans / 12 / 100)

  // const g = h.vinst - h.bolagsskatt;
  // h.bruttoutdelningPerAr = this.getMaxUtdelning(g, 12 * h.bruttomanadslon / 2), h.vinstskatt = h.bruttoutdelningPerAr * (i.vinstskatt / 100), h.nettoutdelningPerAr = h.bruttoutdelningPerAr - h.vinstskatt;
  // h.nettoutdelningPerAr = h.bruttoutdelningPerAr - h.vinstskatt
  // h.arbetsgivaravgift = h.bruttomanadslon * (i.arbetsgivaravgift / 100)
  // h.vinstskatt = h.bruttoutdelningPerAr * (i.vinstskatt / 100)

  // getMotsvarandeLonSomAnstalld(e, i, r, s) {
  //   const o = i / 100 - 0.04, a = e / (1 - o);
  //   let l = a;
  //   if (a > r) {
  //     const c = a - r;
  //     l = a - c + (c - c * o) / (1 - (o + s / 100));
  //   }
  //   return 100 * Math.ceil(l / 100);
  // }

  const calculationRows = ref([
    {
      name: 'invoiced',
      // name: `${t('invoiced')} (${actualWorkHours()} ${t('hour', actualWorkHours())})`,
      value: computed(() => totalInvoiced())
    },
    {
      name: 'income',
      value: computed(() => actualInvoiced())
    },
    {
      name: 'actualHourRate',
      value: computed(() => actualHourRate())
    },
    {
      name: 'salary',
      value: computed(() => grossSalaryPerYear())
    },
    {
      name: 'profit',
      value: computed(() => totalProfit())
    },
    // {
    //   name: 'Salary (gross)',
    //   value: n(salary, 'currency')
    // },
    // {
    //   name: 'Salary (net)', // t('salaryAfterTax'),
    //   value: n(netSalary(), 'currency')
    // },
    {
      name: 'dividend',
      value: computed(() => grossDividendPerYear())
    },
    {
      name: 'savedCapital',
      value: computed(() => totalSaved())
    }
  ])

  return {
    settingRows,
    calculationRows,
    brokerFee,
    capitalTaxPercentage,
    companyTax,
    currentDividendTemplate,
    expenses,
    govermentTaxBreakpoint,
    holidays,
    hourRate,
    maxDividendPercentage,
    pension,
    salary,
    tax,
    vacation,
    workHours,
    actualWorkHours,
    actualHourRate,
    totalInvoiced,
    incomePercentage,
    actualInvoiced,
    realHourRate,
    grossSalaryPerYear,
    netSalaryPerYear,
    netSalary,
    totalExpenses,
    totalProfit,
    grossDividendPerYear,
    netDividendPerYear,
    grossDividendPerMonth,
    netDividendPerMonth,
    grossSalaryWithDividendPerMonth,
    netSalaryWithDividendPerMonth,
    totalSaved,
    totalPensionSavings,
    grossMonthlyMunicipalTax,
    grossMonthlyStateTax,
    salaryVsEmployee
  }
})
