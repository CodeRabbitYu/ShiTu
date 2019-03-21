/**
 * @flow
 * Created by Rabbit on 2019-03-22.
 */

import { observable, action, runInAction } from 'mobx';
import { ConfigStore } from '../../store/ConfigStore';
import type { Response } from 'react-native-image-picker';
import { fetchUpLoadToken, upLoadImage, fetchSearchDetail } from '../../servers/ShiTu';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

const ST_BACKGROUND_IMAGE = 'ST_BACKGROUND_IMAGE';

class ShiTuStore extends ConfigStore {
  @observable
  backgroundImageUrl: string = 'https://ww1.sinaimg.cn/bmiddle/0065oQSqly1ftzsj15hgvj30sg15hkbw.jpg';

  constructor() {
    super();
    // this.getBackgroundImageUrl();
  }

  @action.bound
  getBackgroundImageUrl = async () => {
    let image_url;
    const result = await AsyncStorage.getItem(ST_BACKGROUND_IMAGE);

    if (result === null) {
      image_url = 'https://ww1.sinaimg.cn/bmiddle/0065oQSqly1ftzsj15hgvj30sg15hkbw.jpg';
    } else {
      image_url = result;
    }

    console.log('image_url', image_url);

    runInAction(() => {
      this.backgroundImageUrl = image_url;
    });
  };

  @action.bound
  setBackgroundImageUrl = async (url: string) => {
    runInAction(() => {
      this.backgroundImageUrl = url;
    });

    await AsyncStorage.setItem(ST_BACKGROUND_IMAGE, url);
  };

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
    const params = [
      {
        name: 'token',
        data: token
      },
      {
        name: 'key',
        data: key
      },
      {
        name: 'file',
        filename: 'file',
        data: RNFetchBlob.wrap(PATH)
      }
    ];

    return await upLoadImage(params);
  };

  @action.bound
  getSearchDetail = async (params: any) => {
    const searchDetail = await fetchSearchDetail(params);

    console.log('searchDetail', searchDetail);

    return searchDetail;
  };
}

export { ShiTuStore };
