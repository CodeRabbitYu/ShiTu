/**
 * @flow
 * Created by Rabbit on 2018/4/16.
 */

import { Fetch } from "../../components";

import {RTWeal, RTGankResult, RTBDJResult} from "./interfaces";

type RGankType = '福利' | 'iOS' | 'Android';

export async function loadWealPictureData(page: number, type: RGankType = '福利', count: number = 20): Promise<RTGankResult> {

  let _type: string;

  _type = encodeURIComponent(type);

  let url = `http://gank.io/api/data/${_type}/${count}/${page}`;

  return await Fetch.get(url);

  // return Gank;
}


const BuDeJieValue = {
  'All': 1,
  'Video': 41,
  'Picture': 10,
  'Joke': 29
};

export type RTBuDeJieType = $Keys<typeof BuDeJieValue>;

export async function loadBuDeJieData(type: RTBuDeJieType, maxtime: string): Promise<RTBDJResult> {
  let url = `http://api.budejie.com/api/api_open.php?a=list&c=data&type=${type}&maxtime=${maxtime}`;

  return await Fetch.get(url);

  // console.log(url)
}