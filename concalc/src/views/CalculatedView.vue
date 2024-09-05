<script setup lang="ts">
import RowItem from '../components/RowItem.vue'
import DocumentationIcon from '../components/icons/IconDocumentation.vue'

import { useCounterStore } from '@/stores/counter'

const calcStore = useCounterStore()
</script>

<template>
  <div class="information">
    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Fakturerat</template>
      <template #value>
        <span>{{ calcStore.totalWorkHours }} * {{ calcStore.hourRate.toLocaleString() }} = </span>
        <span> {{ calcStore.totalIncome.toLocaleString() }} kr </span>
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Faktiskt timpris</template>
      <template #value>
        <span>
          {{ calcStore.hourRate.toLocaleString() }} - {{ calcStore.brokerPercentageFee }}% =
        </span>
        <span>{{ calcStore.actualHourRate }} kr / h</span>
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Intäckter ({{ calcStore.incomePercentage }}%)</template>
      <template #value>
        <div>
          <span>
            {{ calcStore.totalIncome.toLocaleString() }} - {{ calcStore.brokerPercentageFee }}% =
          </span>
          <span> {{ calcStore.totalIncomeWithoutBrokerFee.toLocaleString() }}</span>
        </div>
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Lön</template>
      <template #value>
        <div>
          <span>
            {{ calcStore.totalSalary.toLocaleString() }} - {{ calcStore.taxPercentage }}% =
          </span>
          <span> {{ calcStore.totalSalaryWithEmployeeTax.toLocaleString() }} kr</span>
        </div>
      </template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Vinst</template>
      <template #value>{{ calcStore.totalProfit.toLocaleString() }} kr</template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Utdelning</template>
      <template #value>{{ calcStore.dividend.toLocaleString() }} kr</template>
    </RowItem>

    <RowItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading>Sparat kapital</template>
      <template #value>{{ calcStore.totalSaved.toLocaleString() }} kr</template>
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
