/**
 * 基础的树形数据封装集
 * @author liuweizhong
 * @since 2024-04-14
 */
export interface TreeData {
  id: number
  label: string
  children: Array<TreeData>
}
