// 菜单管理
import request from '@/utils/request.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { SysMenuTreeVo } from '@/pojo/system/router/SysMenuTreeVo.ts'
import { SysMenuListVo } from '@/pojo/system/enum/SysMenuListVo.ts'
import { SysMenuDetail } from '@/pojo/system/enum/SysMenuDetail.ts'
import { MenuTreeSelect } from '@/pojo/system/enum/MenuTreeSelect.ts'

enum API {
  MENU_TREE_LIST = '/sysMenu/getMenuTreeList',
  ALL_MENU_LIST_VO = '/sysMenu/getAllMenuListVo',
  ADD_OR_EDIT_MENU = '/sysMenu/addOrEditMenu',
  DETAIL_BY_ID = '/sysMenu/getMenuDetailById',
  DELETED_ID = '/sysMenu/deleteById',
  MENU_TREE_SELECT = '/sysMenu/getMenuTreeSelect',
}

/**
 * 获取当前登录路由
 */
export const getMenuTreeList = () =>
  request.get<any, ResponseData<SysMenuTreeVo[]>>(API.MENU_TREE_LIST)

export const getAllMenuListVo = () =>
  request.get<any, ResponseData<SysMenuListVo[]>>(API.ALL_MENU_LIST_VO)

/**
 * 获取树形下拉菜单
 * @return 菜单列表
 */
export const queryMenuTreeSelect = () =>
  request.get<any, ResponseData<MenuTreeSelect[]>>(API.MENU_TREE_SELECT)

export const andOrEditMenu = (data: SysMenuDetail) =>
  request.post<any, ResponseData<string>>(API.ADD_OR_EDIT_MENU, data)

export const detailById = (menuId: number) =>
  request.get<any, ResponseData<SysMenuDetail>>(API.DETAIL_BY_ID, {
    params: { menuId },
  })

export const deleteMenuById = (menuId: number) =>
  request.get<any, ResponseData<string>>(API.DELETED_ID, {
    params: { menuId },
  })
