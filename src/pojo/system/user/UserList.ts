/**
 * 用户列表类
 */
export interface UserList {
  id: string
  // 用户名
  username: string
  // 真实姓名
  realName: string
  // 用户类型
  userType: string
  // 电话号
  phone?: string
  // 用户昵称
  nickName?: string
  createTime?: string
  updateTime?: string
}
