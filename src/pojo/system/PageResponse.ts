/**
 * 分页数据基础返回
 * @author liuweizhong
 * @since 2024-03-20
 */
export interface PageResponse<T> {
  code: number
  data: T[]
  message: string
  total: number
  pages: number
  pageSize: number
  pageNum: number
}
