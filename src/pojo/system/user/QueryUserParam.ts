import { PageQueryBaseParam } from '@/pojo/system/PageQueryBaseParam.ts'

/**
 * 查询用户参数类
 * @author liuweizhong
 * @since 2024-03-19
 */
export interface QueryUserParam extends PageQueryBaseParam{
  username?: string
}