// 统一管理用户相关的接口
import request from '@/utils/request.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { LoginFrom } from '@/pojo/system/LoginFrom.ts'

enum API {
  LOGIN_URL = '/user/login',
  LOGOUT = '/user/logOut',
  IS_LOGIN = '/user/isLogin',
}
// 对外暴露请求函数
export const reqLogin = (data: LoginFrom) =>
  request.post<any, ResponseData>(API.LOGIN_URL, data)
// 退出登录
export const logOut = () => request.post<any, ResponseData>(API.LOGOUT)

export const isLogin = () => request.get<any, ResponseData>(API.IS_LOGIN)
