/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  NativeModules,
  DeviceInfo,
  DeviceEventEmitter
} from 'react-native';

import { ShiTuMobx } from '../../mobx/ShiTu';

import { GradientButton, PopoverActionSheetItem } from '../../components';
import BaseContainer from '../../components/BaseContainer';
import { System } from '../../utils';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';

import * as Animatable from 'react-native-animatable';
const AnimationButton = Animatable.createAnimatableComponent(GradientButton);
const AnimationImageBackground = Animatable.createAnimatableComponent(ImageBackground);

import { ActionSheet, Theme } from 'teaset';
import * as ImagePicker from 'react-native-image-picker';
import { ConfigStore } from '../../store/ConfigStore';
import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<*>,
  powerStore: PowerStore,
  configStore: ConfigStore
};

type State = {
  aaa: string
};

@inject('configStore', 'powerStore')
@observer
class ShiTu extends Component<Props, State> {
  shiTuMobx: ShiTuMobx;

  constructor(props: Props) {
    super(props);
    ActionSheet.ActionSheetView.Item = PopoverActionSheetItem;
    this.shiTuMobx = new ShiTuMobx();

    this.state = {
      aaa: ''
    };
  }

  componentDidMount() {
    this.state.aaa;

    DeviceEventEmitter.emit('badgeNumber', 20);
  }

  selectedImagePicker = (type: string) => {
    const options = {
      quality: 0.5,
      allowsEditing: false,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'ShiTu'
      }
    };

    const launchType = `launch${type}`;

    ImagePicker[launchType](options, async imageResponse => {
      this.props.configStore.showLoading();

      const imageData = await this.shiTuMobx.uploadImage(imageResponse);

      const params = {
        token: imageData.key
      };

      const searchDetail = await this.shiTuMobx.getSearchDetail(params);

      this.props.configStore.hideLoading();

      this.props.navigation.navigate('WebView', {
        uri: searchDetail.data.webURL
      });
    });
  };

  openImagePicker = async () => {
    const items = [
      {
        title: '拍照',
        onPress: () => this.selectedImagePicker('Camera')
      },
      {
        title: '选择相册',
        onPress: () => this.selectedImagePicker('ImageLibrary')
      }
    ];
    const cancelItem = { title: '取消' };
    ActionSheet.show(items, cancelItem);
  };

  render() {
    return (
      <BaseContainer title={'识兔'} isTopNavigator={true}>
        <AnimationImageBackground
          style={styles.container}
          animation="fadeIn"
          source={{ uri: this.props.powerStore.ShiTuBackgroundImage }}
          blurRadius={System.Android ? 5 : 5}
        >
          <AnimationButton
            title={'点我寻找!'}
            animation="bounceInLeft"
            useNativeDriver
            titleStyle={styles.buttonTitle}
            gradientStyle={styles.button}
            onPress={this.openImagePicker}
            btnStyle={styles.btnStyle}
          />
        </AnimationImageBackground>
      </BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    borderRadius: 5
  },
  btnStyle: {
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 2
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16
  }
});

export { ShiTu };
