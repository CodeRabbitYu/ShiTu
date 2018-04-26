/**
 * @flow
 * Created by Rabbit on 2018/4/16.
 */

import { Fetch } from "../../components";

export interface RGank {
  _id: string;
  createdAt: string;
  desc: string;
  images: Array<string>;
  publishedAt: string;
  source: string;
  type: string;
  url: string;
  used: boolean;
  who: string;
}

export interface RGankResult {
  error: boolean;
  results: RGank[];
}

type RGankType = 'iOS' | 'Android' | '福利'

export async function loadGankData(page: number, type: RGankType, count: number = 20): Promise<RGankResult> {

  type = encodeURIComponent(type);

  let url = `http://gank.io/api/data/${type}/${count}/${page}`;

  const Gank: RGankResult[] = await Fetch.get(url);
  return Gank;

}