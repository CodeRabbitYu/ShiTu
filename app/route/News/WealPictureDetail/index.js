/**
 * @flow
 * Created by Rabbit on 2018/5/7.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  CameraRoll
} from 'react-native';

import { Button, FastImage } from "../../../components";
import { System } from "../../../utils";
import { ActionSheet } from 'teaset';
import FetchBolb from 'react-native-fetch-blob';
const Dirs = FetchBolb.fs.dirs

type Props = {
  navigation: any;
};
export class WealPictureDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    console.log(this.props.navigation.state.params.url)
  }

  static navigationOptions = ({navigation}: any) => ({
    header: null
  })

  saveImageWithIOS = async (url: string) => {
    try {
      let imageData = await  CameraRoll.saveToCameraRoll(url, 'photo');
      console.log(imageData);
      alert('保存成功');
    } catch (e) {
      alert('保存失败');
    }
  }


  saveImageWithAndroid = async (url: string) => {

    // url最后一个反斜线的位置
    const lastIndex = url.lastIndexOf('/');
    // 通过位置得到图片名称
    const imageName = url.substr(lastIndex);

    const config = {
      fileCache: true,
      path: Dirs.PictureDir + imageName
    };

    try {
      // 下载图片
      const imageData = await FetchBolb.config(config).fetch("GET", url);
      // 拼接保存的图片地址
      const imagePath = 'file://' + imageData.data;
      // 保存图片
      await CameraRoll.saveToCameraRoll(imagePath, 'photo');
      // 删除下载的图片
      await FetchBolb.fs.unlink(imageData.data);
      alert('保存成功');
    } catch (e) {
      console.log(e);
      alert('保存失败');
    }
  }

  actionSheetToSaveImage = (url: string) => {
    const items = [
      {title: '保存图片', onPress: () => System.iOS ? this.saveImageWithIOS(url) : this.saveImageWithAndroid(url)},
      {title: '设置主屏幕', type: 'default'},
    ];

    const cancelItem = {title: '取消'};
    ActionSheet.show(items, cancelItem);
  }

  render() {
    const url = this.props.navigation.state.params.url

    return (
      <Button onPress={()=> this.actionSheetToSaveImage(url)}>
        <FastImage style={styles.container}
                   source={{uri: url}}
                   resizeMode={'contain'}
        />
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: System.SCREEN_HEIGHT,
    width: System.SCREEN_WIDTH
  },
});