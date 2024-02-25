<template>
  <div>
    <h1 class='h1'>app根组件</h1>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {reqLogin} from '@/api/user'

onMounted(()=> {
  reqLogin({username: 'admin', password: '111111'})
})
</script>

<style scoped lang='scss'></style>
