export const calculateActualWorkHours = (
  workHours: number,
  vacationDays: number,
  holidays: number = 4
) => {
  const weeks = 52
  const vacationDaysWithHolidays = vacationDays + holidays
  const vacationDaysInHours = vacationDaysWithHolidays * 8
  const totalInvoicedHours = weeks * workHours
  const result = totalInvoicedHours - vacationDaysInHours
  return result > 0 ? result : 0
}
