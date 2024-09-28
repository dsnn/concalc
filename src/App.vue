<script setup lang="ts">
import MenubarView from './views/MenubarView.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-100">
    <div class="flex h-20 w-full">
      <MenubarView />
    </div>
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
