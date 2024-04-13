/**
 * 返回的树形结果类
 * @author liuweizhong
 * @since 2024-03-21
 */
export interface SysMenuTreeVo {
  id: number
  title: string
  parentId: number
  code: string
  icon: string
  type: number
  status: boolean
  sort: number
  routeUrl: string
  routeRedirect: string
  componentPath: string
  hidden: boolean
  children: SysMenuTreeVo[]
  createId: string
  createTime: string
  updateId: string
  updateTime: string
}
