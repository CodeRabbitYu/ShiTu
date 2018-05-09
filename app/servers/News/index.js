/**
 * @flow
 * Created by Rabbit on 2018/4/16.
 */

import { Fetch } from "../../components";

import {RTWeal, RTGankResult, RTBDJResult} from "./types";

type RGankType = '福利' | 'iOS' | 'Android';

export async function loadWealPictureData(page: number, type: RGankType = '福利', count: number = 20): Promise<RTGankResult> {

  let _type: string;

  _type = encodeURIComponent(type);

  let url = `http://gank.io/api/data/${_type}/${count}/${page}`;


  return await Fetch.get(url);

  // return Gank;
}


const BuDeJieValue = {
  全部: 1,
  视频: 41,
  图片: 10,
  笑话: 29
};

export type RTBuDeJieType = $Keys<typeof BuDeJieValue>;

export async function loadBuDeJieData(type: RTBuDeJieType, maxtime: string): Promise<RTBDJResult> {
  let url = `http://api.budejie.com/api/api_open.php?a=list&c=data&type=${type}&maxtime=${maxtime}`;
  console.log(url);

  return await Fetch.get(url);

  // console.log(url)
}