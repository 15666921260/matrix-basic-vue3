<!-- 上方 tabbar 左侧组件 -->
<template>
  <el-button
    size="small"
    icon="Refresh"
    @click="refreshEvent"
    circle
  ></el-button>
  <el-tooltip
    class="box-item"
    effect="dark"
    content="进入或退出全屏"
    placement="bottom"
  >
    <el-button
      size="small"
      icon="FullScreen"
      @click="fullScreen"
      circle
    ></el-button>
  </el-tooltip>
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
// 全屏按钮
const fullScreen = () => {
  // 对象的一个属性，可以用来判断当前是不是全屏模式 (全屏：true 不是全屏：false(其实显示的是null))
  let full = document.fullscreenElement
  // 切换为全屏模式
  if (!full) {
    // 利用根节点的方法requestFullscreen实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
// 为组件命名
export default {
  name: 'Setting',
}
</script>
<style scoped lang="scss"></style>
