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
const MAX_SCREEN_IMAGE_HEIGHT = 7000;

/*
 * 顶部UserInfo的高度， px2dp(100)为整体预估高度， px2dp(10)为距离顶部的margin高度
 */
const USER_INFO_HEIGHT = px2dp(100) + px2dp(10);

/**
 * 文字有marginVertical: px2dp(10)属性
 */
const JOKE_SPACE_HEIGHT = px2dp(20);

/**
 *  px2dp(20) 为底部间距高度
 */
const ITEM_HEIGHT_SPACE_HEIGHT = px2dp(10) + JOKE_SPACE_HEIGHT;

const DEFAULT_SPACE_HEIGHT = 10;
const DEFAULT_TAB_BAR_HEIGHT = 49;
const DEFAULT_SCROLL_TOP_BAR_HEIGHT = 54;

const JOKE_ITEM_WIDTH = SCREEN_WIDTH - px2dp(40);
const JOKE_FONT_SIZE = FONT_SIZE(17);

class BuDeJieMobx extends ConfigStore {
  static async handleJokeTextWidth(text) {
    const heights = await MeasureText.heights({
      texts: [text],
      width: JOKE_ITEM_WIDTH,
      fontSize: JOKE_FONT_SIZE,
      fontWeight: 'normal'
    });
    return parseFloat(heights.join());
  }

  static async handleLargeListData(parameters) {
    const { data, type } = parameters;

    const containerHeight =
      SCREEN_HEIGHT -
      DEFAULT_TAB_BAR_HEIGHT -
      Theme.navBarHeight -
      Theme.iPhoneXBottomHeight -
      DEFAULT_SCROLL_TOP_BAR_HEIGHT -
      DEFAULT_SPACE_HEIGHT;

    const dataSource: Array = [];

    const largeListData = { items: [] };
    const _containerHeight = containerHeight;

    for (let i = 0; i < data.length; i++) {
      const item: RTBDJList = data[i];

      const height = (System.SCREEN_WIDTH * item.height) / item.width;
      const isGif = item.is_gif === '1';

      item.imageHeight = height;
      item.isLongPicture = height > _containerHeight && item.is_gif === '0';
      item.containerHeight = _containerHeight;

      if (item.isLongPicture || isGif) {
        item.imageHeight = SCREEN_HEIGHT * 0.5;
      }

      item.isLongPictureCanOpened = !(height > _containerHeight && height > MAX_SCREEN_IMAGE_HEIGHT && !isGif);

      const JokeHeight = await BuDeJieMobx.handleJokeTextWidth(item.text);
      const ImageHeight = item.imageHeight;
      // const ImageHeight = 0;
      item.itemHeight = USER_INFO_HEIGHT + JokeHeight + ImageHeight + ITEM_HEIGHT_SPACE_HEIGHT;

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

      const userInfoData = { profile_image, name, passtime, theme_name, type };

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

      item.userInfoData = userInfoData;
      item.toolBarData = toolBarData;
      item.jokeData = jokeData;
      item.pictureData = pictureData;

      dataSource.push(item);

      largeListData.items.push(item);
    }
    return { largeListData, dataSource };
  }

  @observable
  isRefreshing: boolean = true;
  @observable
  dataSource: Array<RTBDJList>;
  @observable
  maxtime: string = '';
  @observable
  largeListData: Array = [{ items: [] }];

  constructor(type) {
    super();
    console.log('type------', type);
  }

  /**
   * imageHeight: 所有Item中，Image的高度
   * containerHeight: Item内容的高度
   * userInfoHeight: 顶部用户信息的高度
   * itemHeight: Item整体高度
   */
  @action.bound
  async fetchBuDeJieData(type: RTBuDeJieType, value: string) {
    console.log('value', type, value);
    try {
      const buDeJieData: RTBDJResult = await loadBuDeJieData(type, value);

      const { largeListData, dataSource } = await BuDeJieMobx.handleLargeListData({
        data: buDeJieData.list,
        type: type
      });

      console.log('largeListData', largeListData);

      if (value === '') {
        console.log('第一次加载？value', value);
        runInAction(() => {
          this.dataSource = dataSource;
          this.largeListData = [largeListData];
          this.maxtime = buDeJieData.info.maxid;
        });
      } else {
        console.log('加载更多？value', value);
        console.log('largeListData-----', this.largeListData[0].items);
        runInAction(() => {
          this.dataSource = this.dataSource.concat(dataSource);
          this.largeListData = this.largeListData.concat([largeListData]);
          this.maxtime = buDeJieData.info.maxid;
        });
      }

      console.log('this.largeListData.slice', this.largeListData.slice());

    } catch (e) {
      this.showErrorView(e);
    }
  }

}

export { BuDeJieMobx };
