import request from '@/utils/request.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { CaptchaBo } from '@/pojo/system/captcha/CaptchaBo.ts'

enum API {
  GET_CAPTCHA = '/captcha/get',
}

/**
 * 获取验证码
 */
export const getCaptcha = (captchaId: string) =>
  request.get<any, ResponseData<CaptchaBo>>(API.GET_CAPTCHA, {
    params: { captchaId },
  })
