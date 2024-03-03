<!-- 上方 tabbar 左侧组件 -->
<template>
  <el-icon style='margin-right: 10px' @click='changeIcon'>
    <!-- 可以动态渲染加载相应的组件 -->
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand' "></component>
  </el-icon>
  <!-- 左侧面包屑 separator-icon 间隔的icon -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!--
      v-show='item.meta.title' 有标题就展示，没有就隐藏
      :to='item.path'  点击面包屑的时候跳转指定的页面
    -->
    <el-breadcrumb-item v-for='(item, index) in $route.matched' :key='index' v-show='item.meta.title' :to='item.path' class='breadcrumb_item'>
      <!-- 图标 有问题 与标题不水平 不想要了 -->
<!--      <el-icon>
        <component :is='item.meta.icon'></component>
      </el-icon>-->
      <!-- 面包屑展示对应的标题 -->
      <span>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang='ts'>
import { useRoute } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting.ts'
// 获取layout配置相关的仓库
let LayoutSettingStore = useLayoutSettingStore();
// 获取路由对象
let $route = useRoute();
// 点击图标的方法
const changeIcon = () => {
  // 进行图标切换(注意 .value)
  LayoutSettingStore.fold = !LayoutSettingStore.fold;
}
</script>
<script lang='ts'>
export default {
  name: "Breadcrumb"
}
</script>
<style scoped lang='scss'>
</style>