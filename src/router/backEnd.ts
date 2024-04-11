import { RouteRecordRaw, useRouter } from 'vue-router'
import { getMenuTreeList } from '@/api/system/MenuManage.ts'
import useUserStore from '@/store/modules/user.ts'
import { constantRoute } from '@/router/routes.ts'
const layoutModules: any = import.meta.glob([
  '../layout/*.{vue,tsx}',
  '../layout/routerView/*.{vue,tsx}',
])
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}')
const userStore = useUserStore()
/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const dynamicViewsModules: Record<string, Function> = Object.assign(
  {},
  { ...layoutModules },
  { ...viewsModules },
)

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 */
export async function initBackEndControlRoutes() {
  const $router = useRouter()
  let menuRoutes = userStore.menuRoutes
  // 1、获取后端路由数据
  await getMenuTreeList().then((route) => {
    // 2、将数据格式化成路由数据
    const formatData: RouteRecordRaw[] = formatRoute(route.data)
    const routePass = backEndComponent(formatData)
    for (const r of routePass) {
      $router.addRoute(r)
    }
    if (constantRoute.length == menuRoutes.length) {
      menuRoutes = [...menuRoutes, ...routePass]
    }
    userStore.setMenu(menuRoutes)
  })
  return menuRoutes
}

/**
 * 2、后端路由 将数据格式化成路由数据
 * @param routes 嵌套路由
 * @returns 返回处理好的路由菜单
 */
export function formatRoute(routes: any): RouteRecordRaw[] {
  return routes.map((p: any) => {
    const route: any = {
      path: p.routeUrl,
      name: p.id,
      component: p.componentPath,
      // component: () => import(`@/views/${p.componentPath}.vue`),
      meta: {
        title: p.title,
        icon: p.icon,
        hidden: !!p.hidden,
        sort: p.sort,
      },
    }
    if (p.routeRedirect) {
      route.redirect = p.routeRedirect
    }
    if (p.children?.length > 0) {
      route.children = formatRoute(p.children)
      route.component = 'layout/index'
    }
    return route
  })
}

/**
 * 路由地址处理
 * @param path
 */
/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent(routes: any) {
  if (!routes) return
  return routes.map((item: any) => {
    if (item.component)
      item.component = dynamicImport(
        dynamicViewsModules,
        item.component as string,
      )
    item.children && backEndComponent(item.children)
    return item
  })
}

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(
  // eslint-disable-next-line @typescript-eslint/ban-types
  dynamicViewsModules: Record<string, Function>,
  component: string,
) {
  const keys = Object.keys(dynamicViewsModules)

  const matchKeys = keys.filter((key) => {
    const k = key.replace(/..\/views|../, '')
    return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    return false
  }
}
