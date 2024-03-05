import { Base64 } from 'js-base64';

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