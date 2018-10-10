/**
 * @flow
 * Created by Rabbit on 2018/9/12.
 */

/**
 * 上传token的数据类型
 */
export interface RTUploadToken {
  data: RTUploadTokenData;
  success: boolean;
}

export interface RTUploadTokenData {
  key: string;
  token: string;
}

export interface RTUploadImage {
  hash: string;
  key: string;
}

/**
 *  搜索图片返回的类型
 */
export interface RTSearchDetail {
  data: RTSearchDetailData;
  success: boolean;
}

export interface RTSearchDetailData {
  imageURL: string;
  webURL: string;
}
