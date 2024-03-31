// 统一管理字典相关的接口
import request from '@/utils/request.ts'
import { DictType } from '@/pojo/system/dict/DictType.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'
import { PageDictTypeParam } from '@/pojo/system/dict/PageDictTypeParam.ts'
import { PageResponse } from '@/pojo/system/PageResponse.ts'
import { DictItem } from '@/pojo/system/dict/DictItem.ts'
import { PageDictItemParam } from '@/pojo/system/dict/PageDictItemParam.ts'
import { DictListItem } from '@/pojo/system/dict/DictListItem.ts'

enum API {
  ADD_EDIT_DICT_TYPE = '/sysDict/addOrEditDictType',
  TYPE_DETAIL = '/sysDict/getDictTypeDetail/',
  PAGE_DICT_TYPE = '/sysDict/pageDictType',
  DELETE_DICT_TYPE_BY_ID = '/sysDict/deleteDictTypeById',
  PAGE_DICT_ITEM = '/sysDict/pageDictItem',
  ADD_EDIT_DICT_ITEM = '/sysDict/addOrEditDictItem',
  ITEM_DETAIL = '/sysDict/getDictDetail',
  DELETE_ITEM_TYPE_BY_ID = '/sysDict/deleteDictItemTypeById',
  // 根据字典类型获取项集合
  LIST_ITEM_BY_DICT_TYPE = '/sysDict/selectDictItemByDictTypeId',
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
  request.get<any, ResponseData<DictType>>(API.TYPE_DETAIL + dictTypeId)

export const pageDictType = (param: PageDictTypeParam) =>
  request.post<any, PageResponse<DictType>>(API.PAGE_DICT_TYPE, param)
/**
 * 删除指定的字典类型
 * @param dictTypeId
 */
export const deleteDictTypeById = (dictTypeId: number) =>
  request.get<any, ResponseData<string>>(API.DELETE_DICT_TYPE_BY_ID, {
    params: { dictTypeId },
  })

/**
 * 分页查询字典项接口
 * @param param
 */
export const pageDictItem = (param: PageDictItemParam) =>
  request.post<any, PageResponse<DictItem>>(API.PAGE_DICT_ITEM, param)

/**
 * 新增或修改字典项
 * @param param
 */
export const addOrEditDictItem = (param: DictItem) =>
  request.post<any, ResponseData<string>>(API.ADD_EDIT_DICT_ITEM, param)

export const getDictItemDetail = (dictItemId: string) =>
  request.get<any, ResponseData<DictItem>>(API.ITEM_DETAIL, {
    params: { dictItemId },
  })

/**
 * 删除指定的字典项
 * @param dictItemId
 */
export const deleteDictItemById = (dictItemId: string) =>
  request.get<any, ResponseData<string>>(API.DELETE_ITEM_TYPE_BY_ID, {
    params: { dictItemId },
  })

export const listItemByDictType = (dictTypeId: number) =>
  request.get<any, ResponseData<DictListItem[]>>(API.LIST_ITEM_BY_DICT_TYPE, {
    params: { dictTypeId },
  })
