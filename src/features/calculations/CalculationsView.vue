<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCalculationsStore } from './CalculationsStore'

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
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-row mx-4 gap-2">
      <Card class="flex-1 text-sm">
        <template #title>
          <span class="text-sm font-bold">{{ t('overview') }}</span>
        </template>
        <template #content>
          <DataTable size="small" :value="overviewRows" data-key="id">
            <Column field="name" :header="t('private')">
              <template #body="slotProps">
                <span class="text-sm">
                  {{ t(slotProps.data.name) }}
                </span>
              </template>
            </Column>
            <Column field="value" :header="t('gross')">
              <template #body="slotProps">
                <span class="text-sm font-semibold">
                  {{ n(slotProps.data.gross, 'currency') }}
                </span>
              </template>
            </Column>
            <Column field="value" :header="t('net')">
              <template #body="slotProps">
                <span v-if="slotProps.data.net" class="text-sm font-semibold">
                  {{ n(slotProps.data.net, 'currency') }}
                </span>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
      <Card class="flex-1 text-sm">
        <template #title>
          <span class="text-sm font-bold"> {{ t('salary') }}</span>
        </template>
        <template #content>
          <DataTable size="small" :value="salaryRows" data-key="id">
            <Column field="name" :header="t('private')">
              <template #body="slotProps">
                <span class="text-sm">
                  {{ t(slotProps.data.name) }}
                </span>
              </template>
            </Column>
            <Column field="gross" :header="t('gross')">
              <template #body="slotProps">
                <span class="text-sm font-semibold">
                  {{ n(slotProps.data.gross, 'currency') }}
                </span>
              </template>
            </Column>
            <Column field="net" :header="t('net')">
              <template #body="slotProps">
                <span class="text-sm font-semibold">
                  {{ n(slotProps.data.net, 'currency') }}
                </span>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
    <div class="flex flex-row text-sm m-4 gap-2">
      <Card class="w-3/5">
        <template #title>
          <span class="text-sm font-bold">{{ t('settings') }}</span>
        </template>
        <template #content>
          <DataTable size="small" :value="settingRows" data-key="id">
            <Column :header="t('factors')">
              <template #body="slotProps">
                <span class="text-sm">
                  {{ t(slotProps.data.name) }}
                </span>
              </template>
            </Column>
            <Column class="w-64">
              <template #body="slotProps">
                <div class="flex py-2">
                  <Slider
                    class="w-full"
                    :min="slotProps.data.input.min"
                    :max="slotProps.data.input.max"
                    :step="slotProps.data.input.step"
                    v-model.number="slotProps.data.value"
                  />
                </div>
              </template>
            </Column>
            <Column :header="t('value')">
              <template #body="slotProps">
                <div class="text-sm font-bold">
                  <span v-if="slotProps.data.format !== 'custom' && !slotProps.data.computed">{{
                    n(slotProps.data.value, slotProps.data.format)
                  }}</span>

                  <span v-if="slotProps.data.computed">
                    {{ n(slotProps.data.computed, slotProps.data.format) }}
                  </span>

                  <span v-if="slotProps.data.format === 'custom' && slotProps.data.prefix">
                    {{ n(slotProps.data.value) }}
                    {{ t(slotProps.data.prefix, slotProps.data.value) }}</span
                  >

                  <span v-if="slotProps.data.format !== 'custom' && slotProps.data.prefix">
                    {{ t(slotProps.data.prefix) }}
                  </span>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
      <Card class="w-2/5">
        <template #title>
          <span class="text-sm font-bold">{{ t('economy') }}</span>
        </template>
        <template #content>
          <DataTable size="small" :value="calculationRows" data-key="id">
            <Column :header="t('company')">
              <template #body="slotProps">
                <span class="text-sm">
                  {{ t(slotProps.data.name) }}
                </span>
              </template>
            </Column>
            <Column :header="t('result')">
              <template #body="slotProps">
                <span class="text-sm font-bold">{{ n(slotProps.data.value, 'currency') }}</span>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>
