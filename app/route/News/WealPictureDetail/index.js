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
type State = {
  isHiddenHeader: boolean
}
export class WealPictureDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log(this.props.navigation.state.params.url)
    this.state = {
      isHiddenHeader: false
    }
  }

  static navigationOptions = ({navigation}: any) => {
    const { params } = navigation.state;
    let header;
    if (params && params.isHiddenHeader) {
      header = null;
    }

    return { header }
  }

  componentDidMount() {
    this.setNavBarHidden(true)
  }


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
      path: Dirs.DCIMDir + imageName
    };

    try {
      // 下载图片
      await FetchBolb.config(config).fetch("GET", url);

      // 可能因为模拟器原因，图片并不是同步加载的，使用小米真机基本没有问题，所以下面代码被删除。

      alert('保存成功');
    } catch (e) {
      console.log(e);
      alert('保存失败');
    }
  }

  actionSheetToSaveImage = () => {
    const url = this.props.navigation.state.params.url
    const items = [
      {title: '保存图片', onPress: () => System.iOS ? this.saveImageWithIOS(url) : this.saveImageWithAndroid(url)},
      {title: '设置主屏幕', type: 'default'},
    ];

    const cancelItem = {title: '取消'};
    ActionSheet.show(items, cancelItem);
  }

  showORHideNavBar = () => {
    this.setState({isHiddenHeader: !this.state.isHiddenHeader})
    console.log(this.state.isHiddenHeader);
    this.setNavBarHidden(this.state.isHiddenHeader);
  }

  setNavBarHidden = (isHidden: boolean) => {
    console.log(isHidden);
    this.props.navigation.setParams({ isHiddenHeader: isHidden })
  }

  render() {
    const url = this.props.navigation.state.params.url
    return (
      <Button onLongPress={this.actionSheetToSaveImage}
              onPress={this.showORHideNavBar}
              style={{backgroundColor: 'red', flex: 1}}
      >
        <FastImage style={styles.container}
                   source={{uri: url}}
                   // resizeMode={'contain'}
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