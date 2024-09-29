<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCalculationsStore } from './CalculationsStore'
import CalculationValue from './CalculationValue.vue'

const { t, n } = useI18n()

const {
  settingRows,
  calculationRows,
  salary,
  // actualWorkHours,
  // actualHourRate,
  // totalInvoiced,
  // incomePercentage,
  // actualInvoiced,
  grossSalaryPerYear,
  netSalaryPerYear,
  netSalary,
  // totalProfit,
  grossDividendPerYear,
  netDividendPerYear,
  grossDividendPerMonth,
  netDividendPerMonth,
  grossSalaryWithDividendPerMonth,
  netSalaryWithDividendPerMonth,
  totalSaved,
  totalPensionSavings
  // grossMonthlyMunicipalTax,
  // grossMonthlyStateTax,
  // salaryVsEmployee
} = useCalculationsStore()

const overviewRows = computed(() => [
  {
    name: 'salary',
    gross: grossSalaryPerYear(),
    net: netSalaryPerYear()
  },
  {
    name: 'dividend',
    gross: grossDividendPerYear(),
    net: netDividendPerYear()
  },
  {
    name: 'pension',
    gross: totalPensionSavings(),
    net: null
  },
  {
    name: 'savedCapital',
    gross: totalSaved(),
    net: null
  }
])

const salaryRows = computed(() => [
  {
    name: 'monthSalary',
    gross: salary,
    net: netSalary()
  },
  {
    name: 'dividend',
    gross: grossDividendPerMonth(),
    net: netDividendPerMonth()
  },
  {
    name: 'sum',
    gross: grossSalaryWithDividendPerMonth(),
    net: netSalaryWithDividendPerMonth()
  }
])
</script>

<template>
  <div class="flex flex-col w-full h-full gap-2">
    <div class="flex flex-col text-sm gap-2 md:flex-row">
      <Card class="flex-1">
        <template #title>
          <span class="text-sm font-bold">{{ t('overview') }}</span>
        </template>
        <template #content>
          <DataTable size="small" :value="overviewRows" data-key="id">
            <Column field="name" :header="t('private')">
              <template #body="slotProps">
                {{ t(slotProps.data.name) }}
              </template>
            </Column>
            <Column field="value" :header="t('gross')">
              <template #body="slotProps">
                <span class="font-semibold">
                  {{ n(slotProps.data.gross, 'currency') }}
                </span>
              </template>
            </Column>
            <Column field="value" :header="t('net')">
              <template #body="slotProps">
                <span class="font-semibold" v-if="slotProps.data.net">
                  {{ n(slotProps.data.net, 'currency') }}
                </span>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
      <Card class="flex-1">
        <template #title>
          <span class="text-sm font-bold"> {{ t('salary') }}</span>
        </template>
        <template #content>
          <DataTable size="small" :value="salaryRows" data-key="id">
            <Column field="name" :header="t('private')">
              <template #body="slotProps">
                {{ t(slotProps.data.name) }}
              </template>
            </Column>
            <Column field="gross" :header="t('gross')">
              <template #body="slotProps">
                <span class="font-semibold">
                  {{ n(slotProps.data.gross, 'currency') }}
                </span>
              </template>
            </Column>
            <Column field="net" :header="t('net')">
              <template #body="slotProps">
                <span class="font-semibold">
                  {{ n(slotProps.data.net, 'currency') }}
                </span>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
    <div class="flex flex-col-reverse text-sm gap-2 md:flex-row">
      <Card class="flex-1 md:w-3/5">
        <template #title>
          <span class="text-sm font-bold">{{ t('settings') }}</span>
        </template>
        <template #content>
          <DataTable size="small" :value="settingRows" data-key="id">
            <Column>
              <template #body="slotProps">
                <div class="flex flex-col gap-2">
                  <CalculationValue
                    :name="slotProps.data.name"
                    :format="slotProps.data.format"
                    :computed="slotProps.data.computed"
                    :value="slotProps.data.value"
                    :prefix="slotProps.data.prefix"
                  />
                  <Slider
                    class="w-full my-2"
                    :min="slotProps.data.input.min"
                    :max="slotProps.data.input.max"
                    :step="slotProps.data.input.step"
                    v-model.number="slotProps.data.value"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
      <Card class="flex-1 lg:w-2/5">
        <template #title>
          <span class="text-sm font-bold">{{ t('economy') }}</span>
        </template>
        <template #content>
          <DataTable size="small" :value="calculationRows" data-key="id">
            <Column :header="t('company')">
              <template #body="slotProps">
                {{ t(slotProps.data.name) }}
              </template>
            </Column>
            <Column class="flex justify-end" :header="t('result')">
              <template #body="slotProps">
                <span class="font-semibold">{{ n(slotProps.data.value, 'currency') }}</span>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>
