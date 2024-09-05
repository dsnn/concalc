<script setup lang="ts">
import CalculatedView from './views/CalculatedView.vue'
import SettingsView from './views/SettingsView.vue'
</script>

<template>
  <div class="container">
    <div class="header">
      <h2 class="green">Konsulträknaren</h2>
    </div>
    <div class="content">
      <div class="column left">
        <span>Filter</span>
        <SettingsView />
      </div>
      <div class="column right">
        <CalculatedView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

.header {
  display: flex;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.column {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  height: 100%;
}

.left {
  max-width: 300px;
}

.right {
  max-width: 100%;
}

/* .left {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin: 0px;
  padding-right: 50px;
  border-right: 1px solid var(--color-border);
  overflow-y: scroll;
} */

/* .content {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin: 0 100px;
} */
</style>
