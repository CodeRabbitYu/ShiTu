/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import { observable, action, runInAction } from 'mobx';
import type { RTBDJList, RTGankResult } from '../../servers/News/interfaces';
import { loadBuDeJieData } from '../../servers/News';
import type { RTBuDeJieType } from '../../servers/News';
import { System } from '../../utils';
import { ConfigStore } from '../../store/ConfigStore';
import { Joke, Picture, RTBDJResult, ToolBar, UserInfo } from '../../servers/News/interfaces';

const ContainerHeight = System.SCREEN_HEIGHT - 49 - 64 - 54;
const SpacingHeight = 80;

class BuDeJieMobx extends ConfigStore {
  @observable
  isRefreshing: boolean = true;
  @observable
  dataSource: Array<RTBDJList>;
  @observable
  maxtime: string = '';

  @action
  async fetchBuDeJieData(type: RTBuDeJieType, value: string) {
    try {
      const dataSource: RTBDJResult = await loadBuDeJieData(type, value);

      // console.log('ssssssssssss', dataSource.info.count);

      dataSource.list.map((item: RTBDJList) => {
        const imageHeight = (System.SCREEN_WIDTH * item.height) / item.width;

        item.imageHeight = imageHeight;
        item.containerHeight = imageHeight;
        item.isLongPicture = false;

        if (imageHeight > ContainerHeight && imageHeight < System.SCREEN_HEIGHT) {
          item.containerHeight = imageHeight - SpacingHeight;
          item.isLongPicture = false;
        } else if (imageHeight > System.SCREEN_HEIGHT && item.is_gif === '0') {
          item.isLongPicture = true;
        }

        const {
          text,
          profile_image,
          name,
          passtime,
          love,
          hate,
          repost,
          comment,
          cdn_img,
          containerHeight,
          isLongPicture,
          weixin_url,
          theme_name,
          is_gif,
          gifFistFrame
        } = item;

        const userInfoData = {
          profile_image,
          name,
          passtime,
          theme_name,
          type
        };
        const toolBarData = { love, hate, repost, comment, type };
        const jokeData = { text, type };
        const pictureData = {
          cdn_img,
          imageHeight,
          isLongPicture,
          containerHeight,
          weixin_url,
          is_gif,
          type,
          gifFistFrame,
          ...jokeData
        };

        item.userInfoData = userInfoData;
        item.toolBarData = toolBarData;
        item.jokeData = jokeData;
        item.pictureData = pictureData;
      });

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
