<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const header = t('newAssignment')
const visible = ref(false)
</script>

<template>
  <Button severity="secondary" size="small" icon="pi pi-plus" @click="visible = true" />
  <Dialog
    v-model:visible="visible"
    modal
    :header="header"
    :style="{ width: '50rem', height: '40rem' }"
  >
    New assignment
  </Dialog>
</template>
