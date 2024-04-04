/**
 * 菜单弹窗详情
 * @author liuweizhong
 * @since 2024-04-04
 */
export interface SysMenuDetail {
  id: number | null
  // 菜单名
  title: string
  type: number | null
  typeStr: string
  // 状态,是否禁用
  status: boolean
  // 菜单编码
  code: string
  // 菜单图标
  icon: string
  sort: number
  // 前端路由地址
  routeUrl: string
  // 重定向路由地址
  routeRedirect: string | null
  // 组件位置路径
  componentPath: string
  // 是否显示
  hidden: boolean
  // 备注
  remarks: string
}
