export const calculateTotalSaved = (
  companyTax: number,
  revenue: number,
  dividend: number
): number => {
  // 665 777 - 137 000 - 306 600
  // skatt = vinst * bolagsskatt (0.206)
  // vinst - bolaggsskatt (20.6%) - utdelning
  const taxPercent = companyTax / 100
  const revenueTax = revenue * taxPercent
  const acutalRevenue = revenue - revenueTax
  const incomeTax = dividend * (0 / 100)
  const netDividend = dividend - incomeTax
  const savedCapital = acutalRevenue - netDividend
  const result = savedCapital > 0 ? savedCapital : 0

  return Math.floor(result)
}
