/**
 * @flow
 * Created by Rabbit on 2019-03-18.
 */

import { action, observable, runInAction } from 'mobx';
import { ConfigStore } from './ConfigStore';
import FetchBlob from 'rn-fetch-blob';
const Dirs = FetchBlob.fs.dirs;
import CameraRoll from '@react-native-community/cameraroll';
import AsyncStorage from '@react-native-community/async-storage';

class PublicStore extends ConfigStore {
  constructor() {
    super();
  }

  @action.bound
  saveImageWithIOS = async (url: string) => {
    try {
      await CameraRoll.saveToCameraRoll(url, 'photo');
      this.showToast('保存成功');
    } catch (e) {
      this.showToast('保存失败');
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
      FetchBlob.fs.scanFile([{ path: Dirs.DCIMDir + imageName, mime: '' }]);
      this.showToast('保存成功');
    } catch (e) {
      console.log(e);
      this.showToast('保存失败');
    }
  };
}

// const publicStore = new PublicStore();
// export { publicStore };

export { PublicStore };
