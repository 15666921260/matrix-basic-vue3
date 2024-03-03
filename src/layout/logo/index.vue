<template>
  <div v-if="setting.logoHidden" class="logo">
    <img :src="setting.logo" alt="" />
    <!--  矩阵软件  -->
    <p>{{ setting.title }}</p>
  </div>
</template>
<script setup lang="ts">
// 引入设置标题
import setting from '@/setting.ts'
</script>
<script lang="ts">
// 为组件起名
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 12px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    margin-left: 10px;
    color: white;
    font-size: $base-logo-title-fontSize;
    font-family: SimHei;
    width: 180px;
    // 强制不换行
    white-space: nowrap;
    // 防止溢出
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
