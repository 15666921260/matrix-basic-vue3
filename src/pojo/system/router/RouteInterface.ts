import { RouteMeta } from '@/pojo/system/router/RouteMeta.ts'

export interface RouteInterface {
  path: string
  component: string
  name?: string
  redirect?: string
  meta: RouteMeta
}
