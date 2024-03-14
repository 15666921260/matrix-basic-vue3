import { RouteRecordRaw } from 'vue-router'

/**
 * 定义小仓库数据state类型
 * @author liuweizhong
 * @since 2024-03-07
 */
export interface UserState {
  token: string | null
  // 定义的路由类型
  menuRoutes: Array<RouteRecordRaw>
  // 用户名
  username: string
  // 昵称
  nickName: string
  // 头像
  avatar: string
  // 头像文件id
  avatarFileId: string
}
