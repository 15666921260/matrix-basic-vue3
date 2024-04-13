<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { initBackEndControlRoutes } from '@/router/backEnd.ts'

onMounted(async () => {
  // 设置菜单
  await initBackEndControlRoutes()
})
</script>

<style scoped lang="scss"></style>
