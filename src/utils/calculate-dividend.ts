export const calculateDividend = (salary: number): number => {
  // simplified version. No saved dividend from previous years etc.
  // TODO: Implement advanced dividend calculation with salary limit amount and more.
  // see more here: https://www.bokio.se/utdelning-kalkylator/

  // price for stocks and additionl fees (broker fees etc)
  // e.g you by 100 stocks at 10 kr / stock = overheadAmount = 1000 kr
  // with an additionl fee of 100 kr to buy them = 1100 kr

  const revenue = 665773
  const INCOME_TAX = 0.3142
  const totalSalary = salary * 12
  const salaryBasedScope = totalSalary / 2
  const actualRevenue = revenue * (1 - INCOME_TAX)
  const result = Math.min(salaryBasedScope, actualRevenue)

  // Ensure result is not negative
  const dividend = Math.max(0, result)
  return Math.round(dividend)
}
