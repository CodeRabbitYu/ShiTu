/**
 * @flow
 * Created by Rabbit on 2018/4/16.
 */

import { Fetch } from "../../components";

import {RTWeal, RTGankResult} from "./types";

type RGankType = '福利'

export async function loadWealPictureData(page: number, type: RGankType = '福利', count: number = 20): Promise<RTGankResult> {

  let _type: string;

  _type = encodeURIComponent(type);

  let url = `http://gank.io/api/data/${_type}/${count}/${page}`;

  return await Fetch.get(url);

  // return Gank;
}