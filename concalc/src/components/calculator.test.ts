import { expect, it, beforeEach, describe } from 'vitest'
import {
  CalculateDividendByMainRule,
  CalculateProfit,
  CalculateRealHourRate,
  CalculateTotalIncome,
  CalculateTotalPerYear,
  CalculateTotalSaved,
  CalculateTotalWorkHours,
  CalculateWorkWeeks
} from '../stores/counter'
import { createPinia, setActivePinia } from 'pinia'

describe('calculator', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('total work weeks', () => {
    const vacationDays = 30
    const weeks = CalculateWorkWeeks(vacationDays)
    expect(weeks).toBe(46)
  })

  it('total work hours', () => {
    const weeklyWorkHours = 40
    const workWeeks = 46
    const vacationDays = 30
    const totalWorkHours = CalculateTotalWorkHours(weeklyWorkHours, workWeeks, vacationDays)
    expect(totalWorkHours).toBe(1810)
  })

  it('total income', () => {
    const hourRate = 1000
    const totalWorkHours = 1810
    const income = CalculateTotalIncome(hourRate, totalWorkHours)
    expect(income).toBe(1810000)
  })

  it('real hour reate', () => {
    const hourRate = 1000
    const brokerPercentageFee = 0.17
    const realHourRate = CalculateRealHourRate(hourRate, brokerPercentageFee)
    expect(realHourRate).toBe(830)
  })

  it('total income without broker fee', () => {
    const hourRate = 1000
    const totalWorkHours = 1810
    const brokerPercentageFee = 0.17
    const realHourRate = CalculateRealHourRate(hourRate, brokerPercentageFee)
    const income = CalculateTotalIncome(realHourRate, totalWorkHours)
    expect(income).toBe(1502300)
  })

  it('total salary', () => {
    const salary = 51100
    const totalSalary = CalculateTotalPerYear(salary)
    expect(totalSalary).toBe(613200)
  })

  it('total expenses', () => {
    const monthlyCosts = 5000
    const expenses = CalculateTotalPerYear(monthlyCosts)
    expect(expenses).toBe(60000)
  })

  it('total profit', () => {
    const income = 1502300
    const monthlyCosts = 5000
    const companyTaxPercentage = 0.17
    const profit = CalculateProfit(income, monthlyCosts, companyTaxPercentage)
    expect(profit).toBe(1197109)
  })

  it('dividend main rule', () => {
    const salary = 51100
    const totalSalary = CalculateTotalPerYear(salary)
    const maxDividendPercentage = 0.5
    const capitalTaxPercentage = 0.2
    const dividend = CalculateDividendByMainRule(
      totalSalary,
      maxDividendPercentage,
      capitalTaxPercentage
    )
    expect(dividend).toBe(245280)
  })

  it('saved capital', () => {
    const revenue = 665773
    const dividend = 306600
    const saved = CalculateTotalSaved(revenue, dividend)
    expect(saved).toBe(222023)
  })
})
