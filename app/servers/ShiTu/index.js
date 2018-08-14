/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */

import { Fetch, Config } from '../../utils';
import {RTGankResult} from '../News/interfaces';

export async function fetchUpLoadToken(): Promise<RTGankResult> {

	const url = Config.api.qiniu.upLoadToken;

	return await Fetch.get(url);
}

export async function upLoadImage(params): Promise<RTGankResult> {

	const url = Config.qiniu.upload;

	return await Fetch.upload(url, params);
}

export async function fetchSearchDetail(params) {
	const url = Config.api.shitu.detailURL;

	return await Fetch.post(url, params);
}