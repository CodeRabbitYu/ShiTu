/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { Component } from 'react';
import { StyleSheet, ImageBackground, DeviceEventEmitter } from 'react-native';

import { ShiTuMobx } from '../../mobx/ShiTu';

import { GradientButton, PopoverActionSheetItem } from '../../components';
import BaseContainer from '../../components/BaseContainer';
import { System } from '../../utils';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';

import * as Animatable from 'react-native-animatable';
const AnimationButton = Animatable.createAnimatableComponent(GradientButton);
const AnimationImageBackground = Animatable.createAnimatableComponent(ImageBackground);

import { ActionSheet } from 'teaset';
import * as ImagePicker from 'react-native-image-picker';
import { ConfigStore } from '../../store/ConfigStore';
import type { NavigationScreenProp } from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<*>,
  powerStore: PowerStore,
  configStore: ConfigStore
};

const shiTuMobx: ShiTuMobx = new ShiTuMobx();
ActionSheet.ActionSheetView.Item = PopoverActionSheetItem;

function selectedImagePicker(type: string, callBack: Function) {
  ActionSheet.hide();

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

  ImagePicker[launchType](options, imageResponse => {
    // console.log('options', options, imageResponse);

    if (imageResponse.didCancel) return;

    callBack(imageResponse);
  });
}

function openImagePicker(imageResponse) {
  const items = [
    {
      title: '拍照',
      onPress: () => selectedImagePicker('Camera', imageResponse)
    },
    {
      title: '选择相册',
      onPress: () => selectedImagePicker('ImageLibrary', imageResponse)
    }
  ];
  const cancelItem = { title: '取消' };
  ActionSheet.show(items, cancelItem);
}

const ShiTu = inject('configStore', 'powerStore')(
  observer(function(props: Props) {
    const { ShiTuBackgroundImage } = props.powerStore;
    const { showLoading, hideLoading } = props.configStore;
    const { uploadImage, getSearchDetail } = shiTuMobx;

    function openImagePickerAndHandleImageData() {
      openImagePicker(async imageResponse => {
        showLoading();

        const imageData = await uploadImage(imageResponse);

        const params = {
          token: imageData.key
        };

        const searchDetail = await getSearchDetail(params);

        hideLoading();

        props.navigation.navigate('WebView', {
          uri: searchDetail.data.webURL
        });
      });
    }

    return (
      <BaseContainer title={'识兔'} isTopNavigator={true}>
        <AnimationImageBackground
          style={styles.container}
          animation="fadeIn"
          source={{ uri: ShiTuBackgroundImage }}
          blurRadius={System.Android ? 5 : 5}
        >
          <AnimationButton
            title={'点我寻找!'}
            animation="bounceInLeft"
            useNativeDriver
            titleStyle={styles.buttonTitle}
            gradientStyle={styles.button}
            onPress={openImagePickerAndHandleImageData}
            btnStyle={styles.btnStyle}
          />
        </AnimationImageBackground>
      </BaseContainer>
    );
  })
);

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
