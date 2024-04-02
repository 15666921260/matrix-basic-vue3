<!-- 文件上传组件 -->
<template>
  <el-upload
    class="avatar-uploader"
    :http-request="uploadImageFile"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
  >
    <el-image
      style="width: 100px; height: 100px"
      v-if="imageUrl"
      :src="imageUrl"
      fit="contain"
    />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadProps } from 'element-plus'
import { uploadFile } from '@/api/system/FileManage.ts'

// 因为不是ajax发起的所以没有进入请求拦截器

const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  response,
  uploadLocalFile,
) => {
  imageUrl.value = URL.createObjectURL(uploadLocalFile.raw!)
}

const uploadImageFile = (options: File) => {
  uploadFile(options).then(() => {})
}
</script>

<style scoped lang="scss">
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
