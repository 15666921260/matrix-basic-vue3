/**
 * 与dictItem相同但是因为是查询结果所以一定有id
 */
export interface DictItemResult {
  id: string
  typeName: string
  type?: number
  dicName: string
  dicValue: string
  sortNum?: number
  remarks: string
  disable: boolean
}
