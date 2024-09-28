export const calculateProfit = (
  totalWorkHours: number,
  hourRate: number,
  brokerFee: number,
  employeeTax: number,
  salary: number,
  pension: number = 2000,
  expenses: number = 5000
): number => {
  const employeeTaxPercent = 1 + employeeTax / 100

  const income = totalWorkHours * hourRate
  const brokerPercentage = brokerFee / 100
  const brokerFeeAmount = income * brokerPercentage

  const incomeWithoutBrokerFee = income - brokerFeeAmount
  const incomeWithoutExpenses = incomeWithoutBrokerFee - expenses
  const monthlyIncome = incomeWithoutExpenses / 12
  const incomeWithPension = monthlyIncome - pension

  const incomeWithSalary = incomeWithPension - salary * employeeTaxPercent
  const profit = 12 * incomeWithSalary

  return Math.round(profit)
}
