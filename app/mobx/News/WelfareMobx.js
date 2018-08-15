/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import {observable, action, runInAction} from 'mobx';
import type {RTGankResult, RTWeal} from '../../servers/News/interfaces';
import {loadWelfareData} from '../../servers/News';
import {System} from '../../utils';
import FetchBlob from 'rn-fetch-blob';
import {CameraRoll} from 'react-native';
const Dirs = FetchBlob.fs.dirs;

let loadMoreNumber = [];

class WelfareMobx {

  @observable isRefreshing: boolean = true;
  @observable dataSource: Array<RTGankResult> = [];
  @observable page: number = 1;

	@action.bound
	saveImageWithIOS = async (url: string) => {
		try {
			await  CameraRoll.saveToCameraRoll(url, 'photo');
			alert('保存成功');
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


  @action.bound
	async fetchWelfareData(page) {
  	try {
  		const data = await loadWelfareData(page);

  		const results = data.results;

  		results.map((item: RTWeal) => {
  			const imageWidth = System.SCREEN_WIDTH / 2 - 15;
  			let imageHeight = imageWidth * 1.15;
  			imageHeight = parseInt(Math.random() * 100 + imageHeight);
  			item.height = imageHeight;
  			item.width = imageWidth;

			  item.largeUrl = item.url;
  			item.url = WelfareMobx.handleImageToSmallSize(item.url);
  		});

  		if (page !== 1) {
  			// console.log('page不等于1', page);
  			runInAction(() => {
				  this.page = page;
				  this.dataSource = this.dataSource.concat(results);
			  });

  		} else {
  			runInAction(() => {
				  this.page = 1;
				  this.dataSource = results;
			  });

  			// console.log('page等于1', page);
  		}

  		runInAction(() => {
			  this.isRefreshing = false;
		  });


  	} catch (e) {
		  runInAction(() => {
			  this.isRefreshing = false;
		  });
		  console.log(e);
  	}
	}

  static handleImageToSmallSize(url) {

		// thumbnail|缩略，quare|方形缩略图, thumb180, wap360, small|小图, bmiddle|中图，mw600|600, wap720, mw720|720, mw1024|1024, large|原图。

  	return url.replace('large', 'wap360');
  }

  @action.bound
  async refreshData() {
  	runInAction(() => {
		  this.isRefreshing = true;
	  });
  	await this.fetchWelfareData(1);
  }

  @action.bound
  async loadMoreData(distanceFromEnd: Array<number>) {
  	if (loadMoreNumber.length === 2) loadMoreNumber = [];

  	loadMoreNumber.push(distanceFromEnd);

  	let page = this.page;

  	if (loadMoreNumber.length === 2) {
  		page += 1;
  		await this.fetchWelfareData(page);
  	}
  }
}

export { WelfareMobx };