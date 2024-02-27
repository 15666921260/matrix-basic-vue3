<template>
  <div class='layout_container'>
    <!--  左侧菜单  -->
    <div class='layout_slider'>
      <logo></logo>
      <!--  展示菜单  -->
      <!--  滚动组件  -->
      <el-scrollbar class='scrollbar'>
        <el-menu
          default-active="2"
          class="menu-vertical"
          text-color='white'
        >
          <el-menu-item index="1">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>数据大屏</span>
          </el-menu-item>
          <el-sub-menu index='3'>
            <template #title>
              <span>权限管理</span>
            </template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--  顶部导航  -->
    <div class='layout_tabbar'>456</div>
    <!--  内容展示区  -->
    <div class='layout_main'>
      <p style='height: 2000px;background-color: red'>我是一个段落</p>
    </div>
  </div>
</template>
<script setup lang='ts'>
import Logo from './logo/index.vue'
</script>
<style scoped lang='scss'>
  .layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
      width: $base-menu-width;
      height: 100vh;
      background: $base-menu-background;

      .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);

        .menu-vertical{
          background-color: $base-menu-background;
        }
      }
    }

    .layout_tabbar {
      position: fixed;
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      background: cyan;
      top: 0;
      left: $base-menu-width;
    }

    .layout_main {
      position: absolute;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      background-color: yellowgreen;
      top: $base-tabbar-height;
      left: $base-menu-width;
      padding: 20px;
      // 添加滚动条
      overflow: auto;
    }
  }
</style>
