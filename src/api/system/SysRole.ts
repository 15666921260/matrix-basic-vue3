// 统一管理角色相关的接口
import request from '@/utils/request.ts'
import { PageRoleParam } from '@/pojo/system/role/PageRoleParam.ts'
import { PageResponse } from '@/pojo/system/PageResponse.ts'
import { RoleListVo } from '@/pojo/system/role/RoleListVo.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { UserRole } from '@/pojo/system/role/UserRole.ts'

enum API {
  PAGE_ROLE_LIST = '/sysRole/pageRoleVo',
  ADD_OR_EDIT_ROLE = '/sysRole/addOrEditRole',
  DELETE_ROLE = '/sysRole/deleteRole',
  QUERY_ALL_ROLE_LIST = '/sysRole/queryAllRoleVo',
  SAVE_USER_ROLE_ASSOCIATION = '/sysRole/saveUserRoleAssociation',
  QUERY_ROLE_ID_BY_USER_ID = '/sysRole/queryRoleIdByUserId',
}

/**
 * 分页查询角色列表数据
 * @param param
 */
export const pageRoleList = (param: PageRoleParam) =>
  request.post<any, PageResponse<RoleListVo>>(API.PAGE_ROLE_LIST, param)

/**
 * 添加或更新角色
 * @param param 要添加或更新的角色
 */
export const addOrEditRole = (param: RoleListVo) =>
  request.post<any, ResponseData<string>>(API.ADD_OR_EDIT_ROLE, param)

export const deleteRole = (param: RoleListVo) =>
  request.post<any, ResponseData<string>>(API.DELETE_ROLE, param)

/**
 * 查询所有角色列表数据
 */
export const queryAllRoleList = () =>
  request.get<any, ResponseData<RoleListVo[]>>(API.QUERY_ALL_ROLE_LIST)

export const saveUserRoleAssociation = (param: UserRole) =>
  request.post<any, ResponseData<string>>(API.SAVE_USER_ROLE_ASSOCIATION, param)

export const queryRoleIdByUserId = (param: string) =>
  request.get<any, ResponseData<number[]>>(API.QUERY_ROLE_ID_BY_USER_ID, {
    params: {
      userId: param,
    },
  })
