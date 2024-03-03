// 创建用户相关小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { loginFrom, loginResponseData } from '@/api/user/type.ts'
import { UserState } from '@/store/modules/types/type.ts'
import { getToken, setToken } from '@/utils/token.ts'
// 引入常量路由
import { constantRoute } from '@/router/routes.ts'

let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: getToken(), // 用户的唯一标识
      menuRoutes: constantRoute, // 存储菜单需要的路由数组
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 处理用户登录的方法
    async userLogin(data: loginFrom) {
      // 登录请求
      let result: loginResponseData = await reqLogin(data)
      // 成功 获取token
      if (result.code == 200) {
        // 存储token, 由于pinia|vuex存储数据其实利用的js对象
        this.token = result.data.token as string // 断言，是字符串的情况下返回值
        // 本地存储，持久化存储一份
        setToken(result.data.token as string)
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
      // 失败 登录失败的错误信息
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
