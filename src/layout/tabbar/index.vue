<template>
  <div class="tabbar">
    <!-- 顶部左侧静态 -->
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- 顶部右侧静态 -->
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<script lang="ts">
// 为组件命名
export default {
  name: 'Tabbar',
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  // 让组件一左一右
  display: flex;
  justify-content: space-between;
  // 设置渐变色
  // background-image: linear-gradient(to right, #d1ffff, #00ffdf, #27f7ff);
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
