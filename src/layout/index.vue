<template>
  <div class="layout_container">
    <!--  左侧菜单  -->
    <div class="layout_slider" :class="{ fold: LayoutSettingStore.fold }">
      <logo></logo>
      <!--  展示菜单  -->
      <!--  滚动组件  -->
      <el-scrollbar class="scrollbar">
        <!--        <el-menu background-color="$base-menu-background" text-color="white" collapse>-->
        <!--
          default-active 使用默认激活,使其直接访问路由时可以展开相应的菜单
          background-color 这里只能是这样写，如果按照自定义的方式:$base-menu-background 会有子菜单的背景颜色还是白色的问题
          collapse 根据仓库字段判断是否折叠
        -->
        <el-menu
          :collapse="LayoutSettingStore.fold"
          :default-active="$route.path"
          background-color="#134857"
          text-color="white"
        >
          <!-- 向子组件传递数据 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--  顶部导航  -->
    <div class="layout_tabbar" :class="{ fold: LayoutSettingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!--  内容展示区  -->
    <div class="layout_main" :class="{ fold: LayoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>
<script setup lang="ts">
// 获取路由对象
import { useRoute } from 'vue-router'
// 左侧logo子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 右侧内容展示区
import Main from './main/index.vue'
// 引入顶部 tabbar
import Tabbar from './tabbar/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user.ts'
// 引入layout仓库配置
import useLayoutSettingStore from '@/store/modules/setting.ts'
let userStore = useUserStore()
let LayoutSettingStore = useLayoutSettingStore()
// 获取路由对象
let $route = useRoute()
</script>
<script lang="ts">
// 为组件命名
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;

    // 添加过渡动画(折叠时使用)
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    // 如果有 fold 类型则进行如下变化
    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;

    border-width: 1px;
    border-color: #bdbdbd;
    border-bottom-style: solid;

    // 添加过渡动画(折叠时使用)
    transition: all 0.3s;

    // 如果有 fold 类型则进行如下变化(计算宽度)
    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    // 添加滚动条
    overflow: auto;

    // 添加过渡动画(折叠时使用)
    transition: all 0.3s;

    // 如果有 fold 类型则进行如下变化(计算宽度)
    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
