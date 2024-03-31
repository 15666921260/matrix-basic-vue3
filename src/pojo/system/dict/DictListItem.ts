/**
 * item list id不为空
 * @author liuweizhong
 * @since 2024-03-30
 */
export interface DictListItem {
  id: string
  typeName: string
  type?: number
  dicName: string
  dicValue: string
  sortNum?: number
  remarks: string
  disable: boolean
}
