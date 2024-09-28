import { expect, it, beforeEach, describe } from 'vitest'
import { calculateProfit } from './calculate-profit'
import { calculateDividend } from './calculate-dividend'
import { createPinia, setActivePinia } from 'pinia'
import { calculateActualHourRate } from './calculate-rate'
import { calculateActualWorkHours } from './calculate-hours'
import { calculateTotalSaved } from './calculate-saved'
import { defaults } from '@/features/settings'

describe('calculate', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('rate', () => {
    const { defaultHourRate, defaultBrokerFee } = defaults

    const realHourRate = calculateActualHourRate(defaultHourRate, defaultBrokerFee)

    expect(realHourRate).toBe(900)
  })

  it('work hours', () => {
    const hours = calculateActualWorkHours(40, 30)

    expect(hours).toBe(1808)
  })

  it.each([
    [1000, 1808, 2000, 5000, 17, 665773]
    // [950, 1728, 2000, 5000, 17, 527661]
  ])('profit', (rate, totalWorkHours, pension, expenses, brokerFee, expected) => {
    const { defaultEmployeeTax, defaultSalary } = defaults

    const profit = calculateProfit(
      totalWorkHours,
      rate,
      brokerFee,
      defaultEmployeeTax,
      defaultSalary,
      pension,
      expenses
    )

    expect(profit).toBe(expected)
  })

  it('dividend', () => {
    const { defaultSalary } = defaults

    const dividend = calculateDividend(defaultSalary)

    expect(dividend).toBe(306600)
  })

  it('saved', () => {
    const { defaultCompanyTax } = defaults
    const revenue = 665773
    const dividend = 306600

    const saved = calculateTotalSaved(defaultCompanyTax, revenue, dividend)

    expect(saved).toBe(222023)
  })
})
