<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAssignmentsStore } from './AssignmentsStore'
import { useRouter } from 'vue-router'
import { formatDistance } from 'date-fns'
import { sv } from 'date-fns/locale'

const { t } = useI18n()
const router = useRouter()
const assignmentsStore = useAssignmentsStore()
const assignments = assignmentsStore.assignments.map((a) => ({
  ...a,
  period: formatDistance(a.startDate, a.endDate, { locale: sv })
}))

const columns = [
  { header: t('name'), field: 'name' },
  { header: t('invoiced'), field: 'invoiced' },
  { header: t('income'), field: 'income' },
  { header: t('hourRate'), field: 'hourRate' },
  { header: t('profit'), field: 'profit' },
  { header: t('period'), field: 'period' }
]

const onAssignment = (data: any) => {
  if (data) {
    router.push({ path: `/assignment/${data.id}` })
  } else {
    router.push({ path: '/assignment/new' })
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 px-4">
    <div class="flex justify-end pb-2">
      <Button size="small" severity="secondary" icon="pi pi-plus" @click="onAssignment(null)" />
    </div>
    <DataTable size="small" :value="assignments" data-key="id">
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" />
      <Column>
        <template #body="{ data }">
          <Button
            size="small"
            severity="secondary"
            icon="pi pi-pencil"
            text
            @click="onAssignment(data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
