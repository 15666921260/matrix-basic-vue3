// 创建用户相关小仓库
import { defineStore } from 'pinia'
import { logOut, reqLogin } from '@/api/user'
import { loginFrom } from '@/api/user/type.ts'
import { UserState } from '@/store/modules/types/type.ts'
import { getToken, removeToken, setToken } from '@/utils/token.ts'
import { ResponseData } from '@/po/system/ResponseData.ts'
import { saveUserInfo, getUserInfo, removeUserInfo } from '@/utils/userInfo.ts'
// 引入常量路由
import { constantRoute } from '@/router/routes.ts'
import { UserInfo } from '@/po/system/UserInfo.ts'

let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    // 获取本地存储的信息
    let userInfo = getUserInfo()
    return {
      token: getToken(), // 用户的唯一标识
      menuRoutes: constantRoute, // 存储菜单需要的路由数组
      username: userInfo.username, // 用户名
      nickName: userInfo.nickName, // 昵称
      avatar: userInfo.avatar, // 头像
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 处理用户登录的方法
    async userLogin(data: loginFrom) {
      // 登录请求
      let result: ResponseData = await reqLogin(data)
      // 成功 获取token
      if (result.code == 200) {
        // 存储token, 由于pinia|vuex存储数据其实利用的js对象
        this.token = result.data.token as string // 断言，是字符串的情况下返回值
        this.username = result.data.username
        this.nickName = result.data.nickName
        this.avatar = result.data.avatar
        let userInfo: UserInfo = {
          username: result.data.username,
          nickName: result.data.nickName,
          avatar: result.data.avatar
        }
        saveUserInfo(userInfo)
        // 本地存储，持久化存储一份
        setToken(result.data.token as string)
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
      // 失败 登录失败的错误信息
    },
    userLogOut() {
      // 调用后台退出接口
      logOut().then(r => {
        /*if (r.code == 200){

        }*/
        // 目前没有mock接口
        this.token = ''
        this.username = ''
        this.nickName = ''
        this.avatar = ''
        // 清除本地存储中的token
        removeToken()
        // 清除保存的用户信息
        removeUserInfo()
      })
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
