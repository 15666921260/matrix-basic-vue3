<template>
  <div>
    <!--  路由组件出口的位置  -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!--  渲染layout一级路由组件的子路由  -->
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup lang='ts'>

</script>
<script lang='ts'>
export default {
  name: 'Main'
}
</script>
<style scoped lang='scss'>

.fade-enter-from {
  // 开始时透明度为0
  opacity: 0;
}

.fade-enter-active {
  // 动作为过渡动画1s
  transition: all 1s;
}

.fade-enter-to {
  // 结束时透明度为1
  opacity: 1;
}
</style>