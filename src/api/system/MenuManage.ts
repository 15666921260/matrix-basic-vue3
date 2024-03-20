// 菜单管理
import request from '@/utils/request.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { SysMenuTreeVo } from '@/pojo/system/router/SysMenuTreeVo.ts'

enum API {
  MENU_TREE_LIST = '/sysMenu/getMenuTreeList',
}

/**
 * 获取当前登录路由
 */
export const getMenuTreeList = () =>
  request.get<any, ResponseData<SysMenuTreeVo>>(API.MENU_TREE_LIST)
