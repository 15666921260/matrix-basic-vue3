// 进行axios的二次封装, 使用请求和响应拦截器
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user.ts'

const base = import.meta.env
// 一、利用axios对象的create方法创建axios的实例(配置其他配置: 基础路径、超时时间)
const request = axios.create({
  /**
   * 基础路径 要让 import.meta.env 不报错 tsconfig.json中修改两项：
   * "module": "es2020",
   * "moduleResolution": "Node",
   */
  // baseURL: base.VITE_APP_BASE_API,
  baseURL: base.VITE_SERVE + base.VITE_APP_BASE_API,
  // 超时时间 10s
  timeout: 10000,
  headers: {
    AccessControlAllowOrigin: '*',
  },
})
// 二、request添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // 获取用户相关的小仓库 获取仓库内部的token, 登录成功后携带给服务器
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.set('Authorization', 'Bearer ' + userStore.token)
  }
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 返回配置对象
  return config
})
request.interceptors.response.use(
  // 成功的回调
  (response) => {
    // 判断token无效 实现了token的跳转登陆
    if (response.data.code && response.data.code === 401) {
      ElMessageBox.alert('当前登录已失效！', '注意', {
        confirmButtonText: '重新登录',
        callback: () => {
          // 直接删除用户信息(达到跳转登录页的目的)
          const userStore = useUserStore()
          userStore.userLogOut()
          // 随意跳转即可
          window.location.href = '/login'
        },
      })
    } else if (response.data.code && response.data.code !== 200) {
      const message = errorMessage(response.data.code)
      // 提示的错误信息
      ElMessage({
        type: 'error',
        message,
      })
    }
    // 简化数据
    return response.data
  },
  // 失败的回调
  (error) => errorHandler(error),
)

const errorHandler = (error: any) => {
  // http 状态码
  // 处理http网络错误
  // 顶一个变量:存储网络错误的信息
  const message = errorMessage(error.response.code)
  // 提示的错误信息
  ElMessage({
    type: 'error',
    message,
  })
  // 终结Promise量
  return Promise.reject(error)
}

const errorMessage = (code: number) => {
  let message = ''
  switch (code) {
    case 401:
      message = 'token过期'
      break
    case 403:
      message = '无权访问'
      break
    case 404:
      message = '请求地址错误'
      break
    case 500:
      message = '服务器出现问题'
      break
    default:
      message = '网络出现问题'
  }
  return message
}

// 对外暴露request
export default request
