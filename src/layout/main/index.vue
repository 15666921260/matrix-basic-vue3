<template>
  <div>
    <!--  路由组件出口的位置  -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!--  渲染layout一级路由组件的子路由  -->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
// 获取layout小仓库
import useLayoutSettingStore from '@/store/modules/setting.ts'
let layoutSettingStore = useLayoutSettingStore()
// 控制当前组件是否销毁重建
let flag = ref(true)
// 监听仓库数据是否发生变化， 变化则用户点击刷新按钮
watch(
  () => layoutSettingStore.refresh,
  () => {
    // 点击刷新按钮路由组件需要销毁
    flag.value = false
    // nextTick 监听响应式数据发生变化，可以获取到更新后的dom。然后重新渲染，如果使用延时器不如这个靠谱
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style scoped lang="scss">
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
