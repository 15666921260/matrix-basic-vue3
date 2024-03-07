<template>
  <div>
    <h1>我是主页</h1>
    <el-button type="primary" @click="testButton">接口测试按钮后端</el-button>
    <el-button type="primary" @click="routerPath">接口测试按钮跳转</el-button>
    <el-avatar
    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
  />
  </div>
</template>

<script setup lang="ts">
import { isLogin } from '@/api/user'
// 引入获取路由器
import { useRouter } from 'vue-router'
// 获取路由器
let $router = useRouter()
const routerPath = () => {
  $router.push({ path: '/acl/role' })
}
const testButton = () => {
  isLogin()
}
</script>

<style scoped></style>
