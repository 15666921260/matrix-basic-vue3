/**
 * 数据回传接口
 * @author liuweizhong
 * @since 2024-03-05
 */
export interface ResponseData<T> {
  code: number
  data: T
  message: string
}
