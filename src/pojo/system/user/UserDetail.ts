/**
 * 用户管理详情
 */
export interface UserDetail {
  id: string
  // 用户名
  username: string
  // 确认密码
  confirmPassword: string
  // 密码
  password: string
  // 真实姓名
  realName: string
  // 用户类型
  userTypeId: string
  userType: string
  // 电话号
  phone: string
  // 用户昵称
  nickName: string
  remarks: string
}
