/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx';
import type {RTGankResult, RTWeal} from '../../servers/News/interfaces';
import {loadWelfareData} from '../../servers/News';
import {System} from '../../utils';
// import {RootStore} from '../../store/RootStore';

let loadMoreNumber = [];

class WelfareMobx {

  @observable isRefreshing: boolean = true;
  @observable dataSource: Array<RTGankResult> = [];
  @observable page: number = 1;

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
  	return url.replace('large', 'bmiddle');
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