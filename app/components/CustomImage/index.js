/**
 * @flow
 * Created by Rabbit on 2018/4/26.
 */

import React from 'react';

import FastImage from 'react-native-fast-image';
import { Image, StyleSheet, View, Animated } from 'react-native';
import { observer } from 'mobx-react';
// import {observable, action} from 'mobx';

type Props = {
  ...Image.propTypes
};

@observer
class CustomImage extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageLoading: true
    };
  }

  imageLoadError() {
    console.log('onError');
    // this.imageLoadedError = true;
    this.setState({ imageLoading: false });

    this.props.onError && this.props.onError();
  }

  onLoad = () => {
    const minimumWait = 100;
    const staggerNonce = 200 * Math.random();

    setTimeout(
      () => {
        Animated.timing(placeholderOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: Android ? false : true,
        }).start();
      },
      Platform.OS === 'android' ? 0 : Math.floor(minimumWait + staggerNonce)
    );
  };

  render() {
    let { source } = this.props;
    const { style, resizeMode } = this.props;

    source = this.state.imageLoading
      ? source
      : {
          uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png'
        };
    return (
      <View style={[styles.customImageView]}>
        <FastImage
          {...this.props}
          style={style}
          source={source}
          resizeMode={this.state.imageLoading ? resizeMode : 'contain'}
          onError={this.imageLoadError.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customImageView: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default CustomImage;
