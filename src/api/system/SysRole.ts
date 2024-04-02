// 统一管理角色相关的接口
import request from '@/utils/request.ts'
import { PageRoleParam } from '@/pojo/system/role/PageRoleParam.ts'
import { PageResponse } from '@/pojo/system/PageResponse.ts'
import { RoleListVo } from '@/pojo/system/role/RoleListVo.ts'

enum API {
  PAGE_ROLE_LIST = '/sysRole/pageRoleVo',
}

/**
 * 分页查询角色列表数据
 * @param param
 */
export const pageRoleList = (param: PageRoleParam) =>
  request.post<any, PageResponse<RoleListVo>>(API.PAGE_ROLE_LIST, param)
