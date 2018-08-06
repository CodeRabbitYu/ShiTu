/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import {observable, action, runInAction} from 'mobx';
import type {RTGankResult} from '../../servers/News/types';
import {loadBuDeJieData, RTBuDeJieType} from '../../servers/News';
import { System } from '../../utils';
import type {UserInfo} from '../../servers/News/interfaces';
// import {RootStore} from '../../store/RootStore';


const ContainerHeight = System.SCREEN_HEIGHT - 49 - 64 - 54;


class BuDeJieMobx{
  @observable isRefreshing: boolean = true;
  @observable dataSource: Array<RTGankResult> = [];
  @observable maxtime: string = '';

  @action
  async fetchBuDeJieData(type: RTBuDeJieType, value) {
  	try {
		  const dataSource = await loadBuDeJieData(type, value);

		  dataSource.list.map(item => {
			  const imageHeight = System.SCREEN_WIDTH * item.height / item.width;

			  item.imageHeight = imageHeight;
			  item.containerHeight = imageHeight;
			  item.isLongPicture = false;

			  if (imageHeight > ContainerHeight && imageHeight < System.SCREEN_HEIGHT) {
				  item.containerHeight = imageHeight - 80;
				  item.isLongPicture = false;
			  } else if (imageHeight > System.SCREEN_HEIGHT && item.is_gif === '0') {
				  item.isLongPicture = true;
			  }


			  const { text, profile_image, name, passtime, love, hate, repost, comment, cdn_img, containerHeight, isLongPicture, weixin_url } = item;

			  const userInfoData = { profile_image, name, passtime };
			  const toolBarData = { love, hate, repost, comment };
			  const jokeData = { text };
			  const pictureData = { cdn_img, imageHeight, isLongPicture, containerHeight, weixin_url, ...jokeData };

			  item.userInfoData = userInfoData;
			  item.toolBarData = toolBarData;
			  item.jokeData = jokeData;
			  item.pictureData = pictureData;

		  });


		  // console.log(dataSource);

		  runInAction(() => {
			  this.dataSource = dataSource.list;
			  this.maxtime = dataSource.info.maxid;
		  });
	  } catch (e) {
		  // this.showErrorView(e);
	  }
  }

}

export { BuDeJieMobx };