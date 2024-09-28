export const calculateActualHourRate = (hourRate: number, brokerPercentageFee: number): number => {
  const percentage = brokerPercentageFee / 100
  const brokerFee = hourRate * percentage
  return hourRate - brokerFee
}
