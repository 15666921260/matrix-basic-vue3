// 统一管理角色相关的接口
import request from '@/utils/request.ts'
import { PageRoleParam } from '@/pojo/system/role/PageRoleParam.ts'
import { PageResponse } from '@/pojo/system/PageResponse.ts'
import { RoleListVo } from '@/pojo/system/role/RoleListVo.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'

enum API {
  PAGE_ROLE_LIST = '/sysRole/pageRoleVo',
  ADD_OR_EDIT_ROLE = '/sysRole/addOrEditRole',
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
