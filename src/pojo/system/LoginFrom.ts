/**
 * 登录接口携带参数类型
 * @author liuweizhong
 * @since 2024-03-07
 */
export interface LoginFrom {
  username: string
  password: string
  // 验证码
  captcha?: string
  // 验证码ID
  captchaId?: string
}
