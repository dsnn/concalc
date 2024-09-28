<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAssignmentStore } from './AssignmentStore'
import { useAssignmentsStore } from './AssignmentsStore'
import { useI18n } from 'vue-i18n'

const { n } = useI18n()
const router = useRouter()

const props = defineProps<{ id: string }>()

const { rows, save: saveAssignment, $patch, $reset } = useAssignmentStore()
const { findById, remove: removeAssignment } = useAssignmentsStore()

const save = () => {
  saveAssignment()
  router.push({ path: '/' })
}

const remove = () => {
  if (props.id !== 'new') {
    removeAssignment(parseInt(props.id))
    router.push({ path: '/' })
  }
}

const cancel = () => {
  router.push({ path: '/' })
}

const match = findById(parseInt(props.id))
if (match) {
  $patch(match)
} else {
  $reset()
}
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex-1 p-4">
      <Card>
        <template #content>
          <DataTable size="small" :value="rows" data-key="id">
            <Column class="w-64" field="label" header="Name">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.label }}
                </span>
              </template>
            </Column>
            <Column class="w-auto h-12" field="slider" header="Control">
              <template #body="slotProps">
                <Slider
                  v-if="slotProps.data.kind === 'range'"
                  class="w-full"
                  type="range"
                  :min="slotProps.data.input.min"
                  :max="slotProps.data.input.max"
                  :step="slotProps.data.input.step"
                  v-model="slotProps.data.input.value"
                  @input="slotProps.data.input.event"
                />
                <DatePicker
                  v-if="slotProps.data.kind === 'date'"
                  v-model="slotProps.data.value"
                  showIcon
                  fluid
                  iconDisplay="input"
                  date-format="yy-mm-dd"
                />
                <InputText
                  type="text"
                  class="w-full"
                  v-if="slotProps.data.kind === 'input'"
                  v-model.trim="slotProps.data.value"
                />
              </template>
            </Column>
            <Column class="w-64" field="value" header="Value">
              <template #body="slotProps">
                <span v-if="slotProps.data.format">{{
                  n(slotProps.data.value, slotProps.data.format)
                }}</span>

                <span v-if="slotProps.data.customFormat"
                  >{{ slotProps.data.value }} {{ slotProps.data.customFormat }}</span
                >
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>

    <div class="flex m-4 gap-4 justify-between">
      <div>
        <Button
          v-if="props.id !== 'new'"
          size="small"
          icon="pi pi-trash"
          severity="danger"
          label="Delete"
          @click="remove"
        />
      </div>
      <div class="flex gap-4">
        <Button size="small" icon="pi pi-check" label="Save" @click="save" />
        <Button
          size="small"
          icon="pi pi-times"
          severity="secondary"
          label="Cancel"
          @click="cancel"
        />
      </div>
    </div>
  </div>
</template>
