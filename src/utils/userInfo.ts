// 存储用户信息的工具类
import { encodeBase, decodeBase } from '@/utils/base64.ts'
import { UserInfo } from '@/pojo/system/user/UserInfo.ts'

const userInfoKey: string = 'userCodes'
export const saveUserInfo = (userInfo: UserInfo) => {
  if (userInfo != null) {
    const userJson = JSON.stringify(userInfo)
    localStorage.setItem(userInfoKey, encodeBase(userJson))
  }
}

export const getUserInfo = (): UserInfo => {
  const userJson = localStorage.getItem(userInfoKey)
  if (userJson != null) {
    return JSON.parse(decodeBase(userJson))
  } else {
    return {
      avatarFileId: '',
      username: '',
      nickName: '',
      token: '',
      permissions: [],
    }
  }
}

export const removeUserInfo = () => {
  localStorage.removeItem(userInfoKey)
}
