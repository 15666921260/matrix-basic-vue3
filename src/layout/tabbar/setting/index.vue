<!-- 上方 tabbar 左侧组件 -->
<template>
  <el-button
    size="small"
    icon="Refresh"
    @click="refreshEvent"
    circle
  ></el-button>
  <el-button size="small" icon="FullScreen" circle></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    src="../../../../public/logo.png"
    alt=""
    style="width: 24px; height: 24px; margin: 0 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
// 获取layout小仓库
import useLayoutSettingStore from '@/store/modules/setting.ts'
let layoutSettingStore = useLayoutSettingStore()
// 刷新事件发生
const refreshEvent = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
</script>
<script lang="ts">
// 为组件命名
export default {
  name: 'Setting',
}
</script>
<style scoped lang="scss"></style>
