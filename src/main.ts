import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import gloablComponent from '@/components/index'
import '@/styles/index.scss'
import router from '@/router'
import pinia from '@/store'
// 引入路由鉴权文件
import './permisstion.ts'

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  // SvgIcon 注册为全局组件
  .use(gloablComponent)
  .use(router)
  .use(pinia)
  .mount('#app')
