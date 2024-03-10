<!-- 图片预览组件 -->
<template>
  <el-image style="width: 100px; height: 100px"  v-if="fileId" :src="fileId" fit="contain" />
</template>
<script setup lang='ts'>
let defineProps1 = defineProps(['fileId'])
import { imagePreview } from '@/api/system/FileManage.ts'

const fileId = defineProps1.fileId;

imagePreview(fileId).then(r => {

})


</script>
<style scoped lang='scss'>

</style>