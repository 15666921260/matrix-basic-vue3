// 创建用户相关小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { saveUserInfo, getUserInfo, removeUserInfo } from '@/utils/userInfo.ts'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import { Md5 } from 'ts-md5/dist/md5'
// 引入常量路由
import { constantRoute } from '@/router/routes.ts'
import { UserInfo } from '@/pojo/system/user/UserInfo.ts'
import { LoginFrom } from '@/pojo/system/LoginFrom.ts'
import { UserState } from '@/pojo/system/store/UserState.ts'
import { RouteRecordRaw } from 'vue-router'

const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    // 获取本地存储的信息
    const userInfo = getUserInfo()
    return {
      token: userInfo.token, // 用户的唯一标识
      menuRoutes: constantRoute, // 存储菜单需要的路由数组
      username: userInfo.username, // 用户名
      nickName: userInfo.nickName, // 昵称
      avatarFileId: userInfo.avatarFileId, // 头像文件id
      permissions: userInfo.permissions, // 权限列表
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 处理用户登录的方法
    async userLogin(data: LoginFrom) {
      // 加密传输封装类
      const copyData: LoginFrom = {
        username: data.username,
        password: data.password, // 前端取消md5加密，由后端进行加密
        captcha: data.captcha,
        captchaId: data.captchaId,
      }
      // 登录请求
      const result: ResponseData<UserInfo> = await reqLogin(copyData)
      // 成功 获取token
      if (result.code == 200) {
        // 存储token, 由于pinia|vuex存储数据其实利用的js对象
        this.token = result.data.token as string // 断言，是字符串的情况下返回值
        this.username = result.data.username
        this.nickName = result.data.nickName
        this.permissions = result.data.permissions
        this.avatarFileId = result.data.avatarFileId
        if (result.data.avatarFileId == null) {
          console.log('avatarFileId判断为空了')
          result.data.avatarFileId = '1767228887526178817'
        }
        const userInfo: UserInfo = {
          username: result.data.username,
          nickName: result.data.nickName,
          token: result.data.token,
          avatarFileId: result.data.avatarFileId,
          permissions: result.data.permissions,
        }
        // 本地存储，持久化存储一份
        saveUserInfo(userInfo)
        // await initBackEndControlRoutes()
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
      // 失败 登录失败的错误信息
    },
    userLogOut() {
      // 主动卸载 blob 产生的url文件
      if (this.avatar) {
        window.URL.revokeObjectURL(this.avatar)
      }
      this.token = ''
      this.username = ''
      this.nickName = ''
      this.avatar = ''
      this.avatarFileId = ''
      this.permissions = []
      // 清除保存的用户信息
      removeUserInfo()
    },
    /**
     * @description:设置菜单路由
     * */
    setMenu(data: Array<RouteRecordRaw>) {
      this.menuRoutes = data
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
