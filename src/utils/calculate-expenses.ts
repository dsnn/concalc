export const calculateTotalExpenses = (
  brokerFee: number,
  pension: number,
  expenses: number,
  totalSalary: number
): number => {
  return brokerFee + pension + expenses + totalSalary
}
