<!-- 菜单组件 -->
<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item
      v-if="!item.meta.hidden && !item.children"
      :index="item.path"
      @click="goRouter"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 只有一个子路由 -->
    <template
      v-if="!item.meta.hidden && item.children && item.children.length == 1"
    >
      <!-- 子菜单不隐藏则显示子菜单title -->
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRouter"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 子菜单隐藏则显示主菜单title -->
      <el-menu-item
        v-if="item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRouter"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由 -->
    <el-sub-menu
      v-if="!item.meta.hidden && item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts">
// 要在获取父组件数据之前写
import { useRouter } from 'vue-router'
// 获取父组件传递过来的全部数据
defineProps(['menuList'])

let $router = useRouter()
// 点击菜单回调
const goRouter = (vc: any) => {
  $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
}
</script>
<style scoped lang="scss"></style>
