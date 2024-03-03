// 想成为全局组件的在此引入
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
// 引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 想成为全局组件的添加到此
const allGlobalComponent: { [name: string]: Component } = { SvgIcon }
// 对外暴露插件对象
export default {
  // 务必叫 install 方法
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key: string) => {
      app.component(key, allGlobalComponent[key])
    });
    // 将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
