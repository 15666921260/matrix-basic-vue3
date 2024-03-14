import { Base64 } from 'js-base64'

/**
 * 自定义Base64的加密方式
 * @param str
 */
export const encodeBase = (str: string): string => {
  return Base64.encode(str)
}

/**
 * 自定义Base64的解密方式
 * @param str
 */
export const decodeBase = (str: string): string => {
  return Base64.decode(str)
}

// blob转base64
export const blobToBase64 = (blob: Blob): string => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}