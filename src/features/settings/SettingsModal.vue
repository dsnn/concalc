<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsView from './SettingsView.vue'
const { t } = useI18n()

const visible = ref(false)
const header = t('defaultSettings')
</script>

<template>
  <Button severity="secondary" size="small" icon="pi pi-cog" @click="visible = true" />
  <Dialog
    v-model:visible="visible"
    modal
    :header="header"
    :style="{ width: '50rem', height: '42rem' }"
  >
    <SettingsView />
    <template #footer>
      <Button size="small" label="Save" />
      <Button size="small" severity="secondary" label="Cancel" />
    </template>
  </Dialog>
</template>
