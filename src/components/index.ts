// 想成为全局组件的在此引入
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
// 想成为全局组件的添加到此
const components: { [name: string]: Component } = { SvgIcon }
// 对外暴露插件对象
export default {
  // 务必叫 install 方法
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
