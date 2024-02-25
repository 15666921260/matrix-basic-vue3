// 统一管理用户相关的接口
import request from '@/utils/request.ts'
import {
  loginFrom,
  loginResponseData,
  userResponseData,
} from '@/api/user/type.ts'

enum API {
  LOGIN_URL = '/user/login',
  USER_INFO_URL = '/user/info',
}
// 对外暴露请求函数
export const reqLogin = (data: loginFrom) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
  request.get<userResponseData>(API.USER_INFO_URL)
