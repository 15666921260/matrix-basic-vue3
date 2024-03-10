<!-- 文件上传组件 -->
<template>
  <el-upload
    class="avatar-uploader"
    :action="url"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headersObj"
  >
    <el-image style="width: 100px; height: 100px"  v-if="imageUrl" :src="imageUrl" fit="contain" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup lang='ts'>
import useUserStore from '@/store/modules/user.ts'
import { ref } from 'vue'
import { UploadProps } from 'element-plus'
const base = import.meta.env
let userStore = useUserStore()

const url = base.VITE_SERVE + base.VITE_APP_BASE_API + "/sysFile/upload"

const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log("这是什么！",uploadFile.raw!)
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
// 设置请求头
const headersObj = {
  "token": userStore.token,    // JWT认证，携带token
}
</script>


<style scoped lang='scss'>

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>