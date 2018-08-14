/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx';
import {ConfigStore} from '../../store/ConfigStore';
import {Response} from 'react-native-image-picker';
import {fetchUpLoadToken, upLoadImage, fetchSearchDetail} from '../../servers/ShiTu';
import RNFetchBlob from 'rn-fetch-blob';



class ShiTuMobx extends ConfigStore {

	@observable backgroundImageUrl: string;

	constructor() {
		super();
	}

	@action.bound
	uploadImage = async (response: Response) => {

		// 获取上传需要的token和key
		const tokenData = await fetchUpLoadToken();

		// response = {
		// 	uri: 'file:///Users/Rabbit/Library/Developer/CoreSimulator/Devices/BB817212-9896-4E20-A8F6-221489895E53/data/Containers/Data/Application/93925139-4818-4043-8407-1B900076BA09/Documents/ShiTu/DEC950B5-DBFE-45A4-A821-5FC8886A6585.jpg'
		// };

		const token = tokenData.data.token;
		const key = tokenData.data.key;
		const PATH = iOS ? response.uri.replace('file:///', '') : response.uri;
		const params = [{
			name: 'token', data: token,
		}, {
			name: 'key', data: key,
		}, {
			name: 'file',
			filename: 'file',
			data: RNFetchBlob.wrap(PATH)
		}];

		return await upLoadImage(params);
	}

	@action.bound
	getSearchDetail = async (params) => {
		const searchDetail = await fetchSearchDetail(params);

		console.log('searchDetail', searchDetail);

		return searchDetail;

	}


}

export { ShiTuMobx };