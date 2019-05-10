/**
 * @flow
 * Created by Rabbit on 2018/4/16.
 */

import { Fetch } from '../../utils';

import { RTGankData, RTBDJData, RTBDJResult, RTWealResult } from './interfaces';

type RGankType = '福利' | 'iOS' | 'Android';

export async function fetchWelfareData(
  page: number,
  type: RGankType = '福利',
  count: number = 20
): Promise<RTWealResult> {
  const _type: string = encodeURIComponent(type);

  const url = `http://gank.io/api/data/${_type}/${count}/${page}`;

  const params = {
    type: _type,
    count: count,
    page: page
  };

  // const url = ApiConfig.api.news.list;

  return await Fetch.get(url, params);
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

  const params = {
    type,
    maxtime
  };

  // const url = ApiConfig.api.news.list;

  return await Fetch.get(url, params);
}
