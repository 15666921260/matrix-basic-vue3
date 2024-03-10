<template>
  <div>
    <h1>我是主页</h1>
    <el-button type="primary" @click="testButton">接口测试按钮后端</el-button>
    <el-button type="primary" @click="routerPath">接口测试按钮跳转</el-button>
    <h1>图片文件上传示例</h1>
    <ImageUpload/>
    <h1>图片文件预览示例</h1>
    <ImagePreview :file-id="fileId"/>

  </div>
</template>

<script setup lang="ts">
import ImageUpload from "@/components/ImageUpload/index.vue"
import ImagePreview from  "@/components/ImagePreview/index.vue"
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
const fileId = "1766829528619884545"
</script>

<style scoped>
</style>
