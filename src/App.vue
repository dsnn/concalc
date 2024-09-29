<script setup lang="ts">
import MenubarView from './views/MenubarView.vue'
</script>

<template>
  <div class="flex flex-col h-full bg-slate-100">
    <div class="flex w-full mb-4">
      <MenubarView />
    </div>
    <main class="flex-1 mx-4 mb-4">
      <RouterView />
    </main>
  </div>
</template>
