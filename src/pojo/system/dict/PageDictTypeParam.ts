import { PageQueryBaseParam } from '@/pojo/system/PageQueryBaseParam.ts'

/**
 * 分页查询字典类型参数类
 * @author liuweizhong
 * @since 2024-03-24
 */
export interface PageDictTypeParam extends PageQueryBaseParam {
  typeName?: string
}
