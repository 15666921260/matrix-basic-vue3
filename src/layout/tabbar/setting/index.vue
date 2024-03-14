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
    :src="userStore.avatar"
    alt=""
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.nickName }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="userLogOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
// 引入获取路由器
import { useRouter, useRoute } from 'vue-router'
// 获取layout小仓库
import useLayoutSettingStore from '@/store/modules/setting.ts'
// 获取user小仓库
import useUserStore from '@/store/modules/user.ts'
import { logOut } from '@/api/user'
import { onMounted } from "vue";
// 获取layout相关数据
let layoutSettingStore = useLayoutSettingStore()
// 获取用户相关数据
let userStore = useUserStore()
// 获取路由器
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
// 刷新事件发生
const refreshEvent = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

onMounted(() => {
  // 组件挂载完成;  解决blob失效问题
  userStore.setAvatar()
});
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
// 退出登录
const userLogOut = () => {
  // 向后端发送退出登录的请求
  logOut().then(() => {
    // 1、向服务器发出请求，调用退出登录接口
    // 2、仓库当中关于用户中的数据清空
    userStore.userLogOut()
    // 3、跳转到登录页面, query: { redirect: $route.path} 记录退出登录的路径，重新登录时直接跳转(在登录逻辑中)
    $router.push({ path: '/login', query: { redirect: $route.path } })
  })
}
</script>
<script lang="ts">
// 为组件命名
export default {
  name: 'Setting',
}
</script>
<style scoped lang="scss"></style>
