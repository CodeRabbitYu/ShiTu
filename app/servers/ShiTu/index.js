/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */

import { Fetch } from '../../utils';

import { RTSearchDetail, RTUploadImage, RTUploadToken } from './interfaces';

export async function fetchUpLoadToken(): Promise<RTUploadToken> {
  const url = ApiConfig.api.qiniu.upLoadToken;

  return await Fetch.get(url);
}

export async function upLoadImage(params: any): Promise<RTUploadImage> {
  const url = ApiConfig.qiniu.upload;

  return await Fetch.upload(url, params);
}

export async function fetchSearchDetail(params: any): Promise<RTSearchDetail> {
  const url = ApiConfig.api.shitu.detailURL;

  return await Fetch.post(url, params);
}
