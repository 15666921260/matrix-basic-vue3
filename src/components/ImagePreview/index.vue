<!-- 图片预览组件 -->
<template>
  <el-image
    style="width: 500px; height: 500px"
    v-if="fileId"
    :src="imgSrc"
    fit="contain"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

let defineProps1 = defineProps(['fileId'])
import { imagePreview } from '@/api/system/FileManage.ts'

const fileId = defineProps1.fileId
let imgSrc = ref('');

imagePreview(fileId).then((r) => {
  imgSrc.value = URL.createObjectURL(r)
})
</script>
<style scoped lang="scss"></style>
