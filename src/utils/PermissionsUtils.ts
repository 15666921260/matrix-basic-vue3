import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore()

/**
 * 检查权限
 * @param permission 权限标识
 * @returns true：有权限；false：无权限
 */
export const checkPermission = (permission: string) => {
  if (!userStore.permissions) {
    return false
  } else if (userStore.permissions.length === 0) {
    return false
  } else {
    return userStore.permissions.includes(permission)
  }
}
