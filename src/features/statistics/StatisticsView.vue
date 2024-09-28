<script setup lang="ts">
import { useStatisticsStore } from './StatisticsStore'
const { cards } = useStatisticsStore()
</script>

<template>
  <div class="flex flex-col gap-4 justify-between">
    <Card class="w-64 h-24" v-for="(card, index) in cards" :key="index">
      <template #title> {{ card.title }}</template>
      <template #content>{{ card.content }}</template>
    </Card>
  </div>
</template>
