/**
 * 用户信息类
 * @author liuweizhong
 * @since 2024-03-05
 */
export interface UserInfo {
  avatar: string
  username: string
  nickName: string
  desc?: string
  roles?: Array<string>
  button?: Array<string>
  routes?: Array<string>
}
