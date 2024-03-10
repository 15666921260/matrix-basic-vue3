// 统一管理文件相关的接口
import request from '@/utils/request.ts'
import { ResponseData } from '@/pojo/system/ResponseData.ts'

enum API {
  IMAGE_PREVIEW = '/sysFile/imagePreview',
}

/**
 * 图片预览
 * @param fileId
 */
export const imagePreview = (fileId: string) =>
  request.get<any, any>(API.IMAGE_PREVIEW + "/" + fileId, {headers: {}, responseType: 'blob'})
