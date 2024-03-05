// 登录接口携带参数类型
export interface loginFrom {
  username: string
  password: string
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: Array<string>
  button: Array<string>
  routes: Array<string>
  token: string
}

interface user {
  checkUser: userInfo
}

// 定义服务器返回用户信息相关的数据类型
export interface userResponseData {
  code: number
  data: user
}
