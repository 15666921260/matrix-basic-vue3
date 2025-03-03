// 统一管理用户相关的接口
import request from '@/utils/request.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { LoginFrom } from '@/pojo/system/LoginFrom.ts'
import { QueryUserParam } from '@/pojo/system/user/QueryUserParam.ts'
import { PageResponse } from '@/pojo/system/PageResponse.ts'
import { UserList } from '@/pojo/system/user/UserList.ts'
import { UserInfo } from '@/pojo/system/user/UserInfo.ts'
import { UserDetail } from '@/pojo/system/user/UserDetail.ts'

enum API {
  LOGIN_URL = '/user/login',
  LOGOUT = '/user/logOut',
  IS_LOGIN = '/user/isLogin',
  QUERY_USER = '/user/queryUserList',
  ADD = '/user/addUser',
  DETAIL_USER_BY_ID = '/user/detailUserById',
  EDIT_USER = '/user/editUser',
  DELETE_USER_ID = '/user/deleteUserById',
  TOKEN_CODE = '/user/tokenCode',
}
// 对外暴露请求函数
export const reqLogin = (data: LoginFrom) =>
  request.post<any, ResponseData<UserInfo>>(API.LOGIN_URL, data)
// 退出登录
export const logOut = () => request.post<any, ResponseData<boolean>>(API.LOGOUT)

export const isLogin = () =>
  request.get<any, ResponseData<string>>(API.IS_LOGIN)

export const queryUserList = (data: QueryUserParam) =>
  request.post<any, PageResponse<UserList>>(API.QUERY_USER, data)

/**
 * 添加用户
 * @param data
 */
export const addUserData = (data: UserDetail) =>
  request.post<any, ResponseData<string>>(API.ADD, data)

export const getUserDetailById = (user: UserList) =>
  request.post<any, ResponseData<UserDetail>>(API.DETAIL_USER_BY_ID, user)

export const editUserData = (data: UserDetail) =>
  request.post<any, ResponseData<string>>(API.EDIT_USER, data)

export const deleteUserById = (user: UserList) =>
  request.post<any, ResponseData<string>>(API.DELETE_USER_ID, user)

// 获取验证码
export const getTokenCodeApi = (phone: string) =>
  request.get<any, ResponseData<string>>(API.TOKEN_CODE, {
    params: { phone },
  })
