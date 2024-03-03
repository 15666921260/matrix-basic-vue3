// 定义小仓库数据state类型
import { RouteRecordRaw } from 'vue-router'

export interface UserState {
  token: string | null
  // 定义的路由类型
  menuRoutes: Array<RouteRecordRaw>
}
