/**
 * @flow
 * Created by Rabbit on 2018/4/16.
 */

import { Fetch } from '../../utils';

import { RTGankResult, RTBDJResult } from './interfaces';

type RGankType = '福利' | 'iOS' | 'Android';

export async function fetchWelfareData(
  page: number,
  type: RGankType = '福利',
  count: number = 20
): Promise<RTGankResult> {
  // let _type: string;

  const _type: string = encodeURIComponent(type);

  const url = `http://gank.io/api/data/${_type}/${count}/${page}`;

  return await Fetch.get(url);
}

// const BuDeJieValue = {
// 	'All': 1,
// 	'Video': 41,
// 	'Picture': 10,
// 	'Joke': 29
// };

// export type RTBuDeJieType = $Keys<typeof BuDeJieValue>;
export type RTBuDeJieType = '1' | '41' | '10' | '29' | string | number;

export async function loadBuDeJieData(type: RTBuDeJieType, maxtime: string): Promise<RTBDJResult> {
  const url = `http://api.budejie.com/api/api_open.php?a=list&c=data&type=${type}&maxtime=${maxtime}`;

  // const data = await fetch(url);
  // console.log('xxxxxxx', await data.json());

  return await Fetch.get(url);
}
