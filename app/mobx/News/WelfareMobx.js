/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import { observable, action, runInAction } from 'mobx';
import type { RTGankResult, RTWeal } from '../../servers/News/interfaces';
import { fetchWelfareData } from '../../servers/News';
import { System } from '../../utils';
import FetchBlob from 'rn-fetch-blob';
import { CameraRoll } from 'react-native';
import { ConfigStore } from '../../store/ConfigStore';
const Dirs = FetchBlob.fs.dirs;
type loadDataType = 'refreshing' | 'load more' | string;

class WelfareMobx extends ConfigStore {
  @observable
  isRefreshing: boolean = true;
  @observable
  dataSource: Array<RTWeal> = [];
  @observable
  page: number = 1;

  @action.bound
  saveImageWithIOS = async (url: string) => {
    try {
      await CameraRoll.saveToCameraRoll(url, 'photo');
      alert('保存成功');
    } catch (e) {
      alert('保存失败');
    }
  };

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
      FetchBlob.fs.scanFile([{ path: Dirs.DCIMDir + imageName, mime: '' }])
      alert('保存成功');
    } catch (e) {
      console.log(e);
      alert('保存失败');
    }
  };

  @action.bound
  async loadWelfareData(type: loadDataType = 'refreshing') {
    this.showLoading();
    this.page = type === 'refreshing' ? 1 : this.page + 1;

    try {
      const data = await fetchWelfareData(this.page);

      const results = data.results;

      const defaultHeights = [216, 245, 263, 234, 259, 222];

      results.map((item: RTWeal) => {
        const imageWidth = System.SCREEN_WIDTH / 2 - 15;
        const id = item._id;
        const hexId = parseInt(id.substring(id.length - 2), 16);
        item.height = defaultHeights[hexId % 6];
        item.width = imageWidth;
        item.largeUrl = item.url;
        item.url = WelfareMobx.handleImageToSmallSize(item.url);
      });

      if (type === 'load more') {
        runInAction(() => {
          this.dataSource = this.dataSource.concat(results);
        });
      } else {
        runInAction(() => {
          this.page = 1;
          this.dataSource = results;
        });
      }
      // console.log('page', this.page);
      // console.log('isRefreshing', this.isRefreshing);
    } catch (e) {
      this.showToast(e);
      console.log(e);
    } finally {
      this.hideLoading();
      runInAction(() => {
        this.isRefreshing = false;
      });
    }
  }

  static handleImageToSmallSize(url: string) {
    // thumbnail|缩略，quare|方形缩略图, thumb180, wap360, small|小图, bmiddle|中图，mw600|600, wap720, mw720|720, mw1024|1024, large|原图。
    return url.replace('large', 'wap360');
  }
}

export { WelfareMobx };
