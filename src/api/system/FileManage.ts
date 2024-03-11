// 统一管理文件相关的接口
import request from '@/utils/request.ts'

enum API {
  IMAGE_PREVIEW = '/sysFile/imagePreview',
  FILE_UPLOAD = '/sysFile/upload',
  CONNECT_TEST = '/sysFile/fileConnectTest',
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
/**
 * 图片上传
 * @param param
 */
export const uploadFile = (param: File) =>
  request.post<any, any>(API.FILE_UPLOAD, param, {
    headers: { 'content-type': 'multipart/form-data' },
  })

export const connectTest = () => request.get<any>(API.CONNECT_TEST)
