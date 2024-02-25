// 存取token工具类

export const setToken = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('TOKEN')
}
