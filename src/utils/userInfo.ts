// 存储用户信息的工具类
import { encodeBase, decodeBase } from '@/utils/base64.ts'
import { UserInfo } from '@/pojo/system/UserInfo.ts'

const userInfoKey : string = 'userCodes'
export const saveUserInfo = (userInfo: UserInfo) => {
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
      avatarFileId: '',
      username: '',
      nickName: '',
      token: '',
    }
  }
}

export const removeUserInfo = () => {
  localStorage.removeItem(userInfoKey)
}
