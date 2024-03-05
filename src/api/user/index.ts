// 统一管理用户相关的接口
import request from '@/utils/request.ts'
import { loginFrom, userResponseData } from '@/api/user/type.ts'
import { ResponseData } from '@/po/system/ResponseData.ts'

enum API {
  LOGIN_URL = '/user/login',
  USER_INFO_URL = '/user/info',
  LOGOUT = '/user/logOut',
}
// 对外暴露请求函数
export const reqLogin = (data: loginFrom) =>
  request.post<any, ResponseData>(API.LOGIN_URL, data)
// 退出登录
export const logOut = () => request.post<any, ResponseData>(API.LOGOUT)
export const reqUserInfo = () =>
  request.get<userResponseData>(API.USER_INFO_URL)
