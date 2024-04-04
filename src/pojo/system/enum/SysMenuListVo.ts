/**
 * 菜单列表显示类
 * @author liuweizhong
 * @since 2024-04-04
 */
export interface SysMenuListVo{
  id: number
  // 菜单名
  title: string
  type: number
  typeStr: string
  status: boolean
  sort: number
  routeUrl: string
  componentPath: string
  hidden: boolean
  updateTime: string
  withItem: number
  isChild: boolean
}