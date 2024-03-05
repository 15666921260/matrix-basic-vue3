import { encodeBase, decodeBase } from '@/utils/base64.ts'
import { UserInfo } from '@/po/system/UserInfo.ts'
import { removeToken } from '@/utils/token.ts'

const userInfoKey = 'tavValue'
export const saveUserInfo = (userInfo: userInfo) => {
  if (userInfo != null) {
    let userJson = JSON.stringify(userInfo)
    localStorage.setItem(userInfoKey, encodeBase(userJson))
  }
}

export const getUserInfo = (): UserInfo => {
  let userJson = localStorage.getItem(userInfoKey)
  if (userJson != null) {
    return JSON.parse(decodeBase(userJson))
  } else {
    return {
      avatar: '',
      username: '',
      nickName: '',
    }
  }
}

export const removeUserInfo = () => {
  localStorage.removeItem(userInfoKey)
}
