<script setup lang="ts">
import { storeToRefs } from 'pinia'
import RowItem from '../components/RowItem.vue'
import DocumentationIcon from '../components/icons/IconDocumentation.vue'
import { useCounterStore } from '@/stores/counter'

const calcStore = useCounterStore()
const {
  hourRate,
  actualBrokerPercentageFee,
  weeklyWorkHours,
  vacationDays,
  pensionSavings,
  salary,
  taxPercentage,
  monthlyCosts
} = storeToRefs(calcStore)

const getEventValue = (event: Event): number => {
  const target = event.target as HTMLInputElement
  return Number(target.value)
}

const updateHourRate = (event: Event) => {
  calcStore.setHourRate(getEventValue(event))
}

const updateBrokerPercentageFee = (event: Event) => {
  calcStore.setBrokerPercentageFee(getEventValue(event))
}

const updateWeeklyWorkHours = (event: Event) => {
  calcStore.setWeeklyWorkHours(getEventValue(event))
}

const updateVacationDays = (event: Event) => {
  calcStore.setVacationDays(getEventValue(event))
}

const updatePensionSavings = (event: Event) => {
  calcStore.setPensionSavings(getEventValue(event))
}

const updateSalary = (event: Event) => {
  calcStore.setSalary(getEventValue(event))
}

const updateTaxPercentage = (event: Event) => {
  calcStore.setTaxPercentage(getEventValue(event))
}

const updateMonthlyCosts = (event: Event) => {
  calcStore.setMonthlyCosts(getEventValue(event))
}
</script>

<template>
  <div class="information">
    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Timpris {{ hourRate }} kr/tim</template>
      <template #value>
        <input
          type="range"
          min="500"
          max="2000"
          step="25"
          v-model="hourRate"
          @input="updateHourRate"
        />
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Mäklararvode {{ actualBrokerPercentageFee }}%</template>
      <template #value>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          v-model="actualBrokerPercentageFee"
          @input="updateBrokerPercentageFee"
        />
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Arbetsvecka {{ weeklyWorkHours }} timmar</template>
      <template #value>
        <input
          type="range"
          min="0"
          max="80"
          step="1"
          v-model="weeklyWorkHours"
          @input="updateWeeklyWorkHours"
        />
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Semester / utan uppdrag {{ vacationDays }} dagar</template>
      <template #value>
        <input
          type="range"
          min="0"
          max="80"
          step="1"
          v-model="vacationDays"
          @input="updateVacationDays"
        />
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Pensionssparande {{ pensionSavings }} kr / mån</template>
      <template #value>
        <input
          type="range"
          min="1000"
          max="20000"
          step="250"
          v-model="pensionSavings"
          @input="updatePensionSavings"
        />
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Lön {{ salary.toLocaleString() }} kr / mån</template>
      <template #value>
        <input
          type="range"
          min="1000"
          max="200000"
          step="500"
          v-model="salary"
          @input="updateSalary"
        />
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Skattetabell {{ taxPercentage }}%</template>
      <template #value>
        <input
          type="range"
          min="20"
          max="50"
          step="1"
          v-model="taxPercentage"
          @input="updateTaxPercentage"
        />
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Övriga kostnader {{ monthlyCosts.toLocaleString() }} kr</template>
      <template #value>
        <input
          type="range"
          min="1000"
          max="100000"
          step="250"
          v-model="monthlyCosts"
          @input="updateMonthlyCosts"
        />
      </template>
    </RowItem>
  </div>
</template>

<style scoped>
.information {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  font-size: 12px;
}
</style>
