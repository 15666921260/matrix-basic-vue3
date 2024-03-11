// 统一管理文件相关的接口
import request from '@/utils/request.ts'

enum API {
  IMAGE_PREVIEW = '/sysFile/imagePreview',
  FILE_UPLOAD = '/sysFile/upload'
}

/**
 * 图片预览
 * @param fileId
 */
export const imagePreview = (fileId: string) =>
  request.get<any, any>(API.IMAGE_PREVIEW + '/' + fileId, {
    headers: {},
    responseType: 'blob',
  })

export const uploadFile = (param: File) => request.post<any, any>(API.FILE_UPLOAD, param, {
  headers: {"content-type": "multipart/form-data"}
})