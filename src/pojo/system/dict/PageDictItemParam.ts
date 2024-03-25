import { PageQueryBaseParam } from '@/pojo/system/PageQueryBaseParam.ts'

/**
 * 分页查询字典项参数类
 * @author liuweizhong
 * @since 2024-03-26
 */
export interface PageDictItemParam extends PageQueryBaseParam {
  typeId: number
}
