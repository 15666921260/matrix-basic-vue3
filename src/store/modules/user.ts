// 创建用户相关小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { saveUserInfo, getUserInfo, removeUserInfo } from '@/utils/userInfo.ts'
//@ts-ignore
import { Md5 } from 'ts-md5/dist/md5'
// 引入常量路由
import { constantRoute } from '@/router/routes.ts'
import { UserInfo } from '@/pojo/system/UserInfo.ts'
import { LoginFrom } from '@/pojo/system/LoginFrom.ts'
import { UserState } from '@/pojo/system/UserState.ts'
import { imagePreview } from '@/api/system/FileManage.ts'

let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    // 获取本地存储的信息
    let userInfo = getUserInfo()
    return {
      token: userInfo.token, // 用户的唯一标识
      menuRoutes: constantRoute, // 存储菜单需要的路由数组
      username: userInfo.username, // 用户名
      nickName: userInfo.nickName, // 昵称
      avatar: userInfo.avatar, // 头像
      avatarFileId: userInfo.avatarFileId, // 头像文件id
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 处理用户登录的方法
    async userLogin(data: LoginFrom) {
      // 加密传输封装类
      let copyData: LoginFrom = {
        username: data.username,
        password: Md5.hashStr(data.password),
      }
      // 登录请求
      let result: ResponseData = await reqLogin(copyData)
      // 成功 获取token
      if (result.code == 200) {
        // 存储token, 由于pinia|vuex存储数据其实利用的js对象
        this.token = result.data.token as string // 断言，是字符串的情况下返回值
        this.username = result.data.username
        this.nickName = result.data.nickName
        if (result.data.avatarFileId == null) {
          result.data.avatarFileId = '1767228887526178817'
        }
        await imagePreview(result.data.avatarFileId).then((r) => {
          /**
           * URL.createObjectURL(r) 将返回的blob转化为内存url
           * 但是浏览器在 document 卸载的时候，会自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。
           * 可能这个原因导致长时间不返回页面，使其失效
           */
          this.avatar = URL.createObjectURL(r)
          // this.avatar = blobToBase64(r)
          // console.log("这里是base64",this.avatar)
        })
        let userInfo: UserInfo = {
          username: result.data.username,
          nickName: result.data.nickName,
          token: result.data.token,
          avatar: this.avatar,
          avatarFileId: result.data.avatarFileId,
        }
        // 本地存储，持久化存储一份
        saveUserInfo(userInfo)
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
      // 失败 登录失败的错误信息
    },
    // 设置更新头像的方法 blob失效时
    async setAvatar() {
      await imagePreview(this.avatarFileId).then((r) => {
        this.avatar = URL.createObjectURL(r)
      })
      let userInfo: UserInfo = {
        username: this.username,
        nickName: this.nickName,
        token: this.token,
        avatar: this.avatar,
        avatarFileId: this.avatarFileId,
      }
      // 重新更新本地数据
      saveUserInfo(userInfo)
    },
    userLogOut() {
      // 主动卸载 blob 产生的url文件
      window.URL.revokeObjectURL(this.avatar)
      this.token = ''
      this.username = ''
      this.nickName = ''
      this.avatar = ''
      this.avatarFileId = ''
      // 清除保存的用户信息
      removeUserInfo()
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
