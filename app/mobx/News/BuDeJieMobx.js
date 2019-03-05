/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import { action, observable, runInAction } from 'mobx';
import type { RTBDJList } from '../../servers/News/interfaces';
import { RTBDJResult } from '../../servers/News/interfaces';
import type { RTBuDeJieType } from '../../servers/News';
import { loadBuDeJieData } from '../../servers/News';
import { System } from '../../utils';
import { ConfigStore } from '../../store/ConfigStore';

import MeasureText from 'react-native-measure-text';

/**
 * 容器的高度
 * @type {number}
 */
// const ContainerHeight: number = System.SCREEN_HEIGHT - 49 - 54;
const MaxScreenImageHeight = 7000;

const UserInfoHeight = px2dp(100);
const ToolBarHeight = px2dp(60);

const JokeItemWidth = SCREEN_WIDTH - px2dp(40);
const JokeFontSize = FONT_SIZE(17);

const SpacingHeight = 10;
const DefaultNormalHeight = 49;
const DefaultScrollTopBarHeight = 54;

class BuDeJieMobx extends ConfigStore {
  containerHeight: number =
    System.SCREEN_HEIGHT -
    DefaultNormalHeight -
    Theme.navBarHeight -
    Theme.iPhoneXBottomHeight -
    DefaultScrollTopBarHeight -
    SpacingHeight;

  static async handleJokeTextWidth(text) {
    const heights = await MeasureText.heights({
      texts: [text],
      width: JokeItemWidth,
      fontSize: JokeFontSize,
      fontWeight: 'normal'
    });
    return parseFloat(heights.join());
  }

  @observable
  isRefreshing: boolean = true;
  @observable
  dataSource: Array<RTBDJList>;
  @observable
  maxtime: string = '';

  /**
   * imageHeight: 所有Item中，Image的高度
   * containerHeight: Item内容的高度
   * userInfoHeight: 顶部用户信息的高度
   * itemHeight: Item整体高度
   */

  @action.bound
  async fetchBuDeJieData(type: RTBuDeJieType, value: string) {
    try {
      const dataSource: RTBDJResult = await loadBuDeJieData(type, value);

      const _newData = dataSource.list.filter(async (item: RTBDJList) => {
        const height = (System.SCREEN_WIDTH * item.height) / item.width;
        const isGif = item.is_gif === '1';

        item.imageHeight = height;
        item.isLongPicture = height > this.containerHeight && item.is_gif === '0';
        item.containerHeight = this.containerHeight;

        if (item.isLongPicture || isGif) {
          item.imageHeight = SCREEN_HEIGHT * 0.5;
        }

        item.isLongPictureCanOpened = !(height > this.containerHeight && height > MaxScreenImageHeight && !isGif);

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
          isLongPictureCanOpened,
          weixin_url,
          theme_name,
          is_gif,
          gifFistFrame,
          imageHeight
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
          isLongPictureCanOpened,
          containerHeight,
          weixin_url,
          is_gif,
          type,
          gifFistFrame,
          ...item
        };

        const JokeHeight = await BuDeJieMobx.handleJokeTextWidth(item.text);
        item.itemHeight = UserInfoHeight + JokeHeight + item.imageHeight + px2dp(40);

        item.jokeHeight = JokeHeight;

        // _dataSource.push(item);

        // console.log('ggggggg', item, item.itemHeight);

        // return item;

        // console.log('2222222', item);

        // console.log('itemHeight', UserInfoHeight, JokeHeight, item.imageHeight);

        // item.userInfoData = userInfoData;
        // item.toolBarData = toolBarData;
        // item.jokeData = jokeData;
        // item.pictureData = pictureData;
      });

      const list = dataSource.list;
      const _dataSource: Array = [];

      for (let i = 0; i < list.length; i++) {
        const item: RTBDJList = list[i];

        const height = (System.SCREEN_WIDTH * item.height) / item.width;
        const isGif = item.is_gif === '1';

        item.imageHeight = height;
        item.isLongPicture = height > this.containerHeight && item.is_gif === '0';
        item.containerHeight = this.containerHeight;

        if (item.isLongPicture || isGif) {
          item.imageHeight = SCREEN_HEIGHT * 0.5;
        }

        item.isLongPictureCanOpened = !(height > this.containerHeight && height > MaxScreenImageHeight && !isGif);

        const JokeHeight = await BuDeJieMobx.handleJokeTextWidth(item.text);
        item.itemHeight = UserInfoHeight + JokeHeight + item.imageHeight + px2dp(40);

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
          isLongPictureCanOpened,
          weixin_url,
          theme_name,
          is_gif,
          gifFistFrame,
          imageHeight
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
          isLongPictureCanOpened,
          containerHeight,
          weixin_url,
          is_gif,
          type,
          gifFistFrame,
          ...item
        };

        item.jokeHeight = JokeHeight;
        item.userInfoData = userInfoData;
        item.toolBarData = toolBarData;
        item.jokeData = jokeData;
        item.pictureData = pictureData;

        _dataSource.push(item);
      }

      console.log('_datasource', _dataSource);

      // console.log('_newData', _newData);

      runInAction(() => {
        this.dataSource = _dataSource;
      });
      this.maxtime = dataSource.info.maxid;
    } catch (e) {
      // this.showErrorView(e);
    }
  }
}

export { BuDeJieMobx };
