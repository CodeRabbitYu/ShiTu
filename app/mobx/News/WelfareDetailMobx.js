/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx';
import {CameraRoll} from 'react-native';
import FetchBlob from 'rn-fetch-blob';
// import {RootStore} from '../../store/RootStore';
const Dirs = FetchBlob.fs.dirs;


class WelfareDetailMobx {

	@observable isHiddenNavBar: boolean = true;


	@action.bound
	setHiddenNavBar(isHiddenNavBar: boolean): boolean {
		this.isHiddenNavBar = isHiddenNavBar;
	}

	@action.bound
	saveImageWithIOS = async (url: string) => {
		console.log('2222222');
		try {
			await  CameraRoll.saveToCameraRoll('http://p2oxs1iv5.bkt.clouddn.com/lzp.png', 'photo');
			alert('保存成功1111');
		} catch (e) {
			alert('保存失败');
		}
	}

	@action.bound
	saveImageWithAndroid = async (url: string) => {
		// url最后一个反斜线的位置
		const lastIndex = url.lastIndexOf('/');
		// 通过位置得到图片名称
		const imageName = url.substr(lastIndex);

		const config = {
			fileCache: true,
			path: Dirs.DCIMDir + imageName
		};

		try {
			// 下载图片
			await FetchBlob.config(config).fetch('GET', url);
			alert('保存成功');
		} catch (e) {
			console.log(e);
			alert('保存失败');
		}
	}

}

export { WelfareDetailMobx };