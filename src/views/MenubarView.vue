<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()

const items = ref([
  { route: '/', label: t('dashboard'), icon: 'pi pi-home' }
  // { route: '/assignments', label: t('assignments'), icon: 'pi pi-list' },
  // { route: '/statistics', label: t('statistics'), icon: 'pi pi-chart-line' }
  // { route: '/product-cost', label: 'Actual cost', icon: 'pi pi-wallet' }
])
</script>

<template>
  <Tabs class="w-full" value="/">
    <TabList>
      <Tab v-for="tab in items" :key="tab.label" :value="tab.route">
        <RouterLink v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
          <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
            <i :class="tab.icon" />
            <span>{{ tab.label }}</span>
          </a>
        </RouterLink>
      </Tab>
    </TabList>
  </Tabs>
</template>
