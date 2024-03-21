/**
 * 新增用户
 * @author liuweizhong
 * @since 2024-03-21
 */
export interface AddUserInfo {
  id?: string
  username: string
  password: string
  nickName?: string
  phone?: string
  realName?: string
  userType: string
}
