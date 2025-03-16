<template>
  <div>
    <h1>我是主页</h1>
    <el-button type="primary" @click="testButton">接口测试按钮后端</el-button>
    <el-button type="primary" @click="routerPath">接口测试按钮跳转</el-button>
    <h1>图片文件上传示例</h1>
    <h1>图片文件预览示例</h1>
    <ImagePreview :file-id="fileId" />
    <div v-if="flag.isShow">vIfTestvIfTestvIfTestvIfTestvIfTest</div>
    <el-button type="primary" @click="vIfTest">测试v-if</el-button>
    <el-button type="primary" @click="testQueryUser">
      测试分页查询用户
    </el-button>
    <el-button type="primary" @click="testPermission">测试权限</el-button>
    <div v-show="checkPermission('user.add')">权限有:user.add显示该文字</div>
  </div>
</template>

<script setup lang="ts">
import ImagePreview from '@/components/ImagePreview/index.vue'
import { isLogin, queryUserList } from '@/api/user'
// 引入获取路由器
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { QueryUserParam } from '@/pojo/system/user/QueryUserParam.ts'
import { checkPermission } from '@/utils/PermissionsUtils.ts'
// 获取路由器
let $router = useRouter()
const routerPath = () => {
  $router.push({ path: '/acl/role' })
}
const testButton = () => {
  isLogin()
}
const fileId = '1766829528619884545'
const flag = reactive({
  isShow: false,
})

const testPermission = () => {
  console.log('权限有:', checkPermission('user.add'))
}

const vIfTest = () => {
  flag.isShow = !flag.isShow
}

const testQueryUser = () => {
  let queryUserParam: QueryUserParam = {
    pageSize: 10,
    pageNum: 1,
  }
  queryUserList(queryUserParam)
}
</script>
<style scoped></style>
