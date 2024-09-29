<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, n } = useI18n()
defineProps<{
  name: string
  format: string
  computed: any
  value: any
  prefix: string | null
}>()
</script>
<template>
  <div class="flex gap-1 justify-between">
    <span>{{ t(name) }}</span>
    <div class="font-bold">
      <span v-if="format !== 'custom' && !computed">{{ n(value, format) }}</span>

      <span v-if="computed">
        {{ n(computed, format) }}
      </span>

      <span v-if="format === 'custom' && prefix">{{ n(value) }} {{ t(prefix, value) }}</span>

      <span v-if="format !== 'custom' && prefix">
        {{ t(prefix) }}
      </span>
    </div>
  </div>
</template>
