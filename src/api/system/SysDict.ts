// 统一管理字典相关的接口
import request from '@/utils/request.ts'
import { DictType } from '@/pojo/system/dict/DictType.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { PageDictTypeParam } from '@/pojo/system/dict/PageDictTypeParam.ts'
import { PageResponse } from '@/pojo/system/PageResponse.ts'

enum API {
  ADD_EDIT_DICT_TYPE = '/sysDict/addOrEditDictType',
  DETAIL = '/sysDict/getDictTypeDetail/',
  PAGE_DICT_TYPE = '/sysDict/pageDictType',
}

/**
 * 添加或修改
 * @param param
 */
export const addOrEditDictType = (param: DictType) =>
  request.post<any, ResponseData<string>>(API.ADD_EDIT_DICT_TYPE, param)
/**
 * 获取详情
 * @param dictTypeId
 */
export const getDictTypeDetail = (dictTypeId: string) =>
  request.get<any, ResponseData<DictType>>(API.DETAIL + dictTypeId)

export const pageDictType = (param: PageDictTypeParam) =>
  request.post<any, PageResponse<DictType>>(API.PAGE_DICT_TYPE, param)
