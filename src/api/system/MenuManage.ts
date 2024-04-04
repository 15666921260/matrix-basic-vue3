// 菜单管理
import request from '@/utils/request.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { SysMenuTreeVo } from '@/pojo/system/router/SysMenuTreeVo.ts'
import { SysMenuListVo } from '@/pojo/system/enum/SysMenuListVo.ts'

enum API {
  MENU_TREE_LIST = '/sysMenu/getMenuTreeList',
  MENU_LIST_VO_BY_PARENT_ID = '/sysMenu/getMenuListVoByParentId',
}

/**
 * 获取当前登录路由
 */
export const getMenuTreeList = () =>
  request.get<any, ResponseData<SysMenuTreeVo>>(API.MENU_TREE_LIST)

export const getMenuListVoByParentId = (parentId: number) =>
  request.get<any, ResponseData<SysMenuListVo[]>>(
    API.MENU_LIST_VO_BY_PARENT_ID,
    {
      params: { parentId },
    },
  )
