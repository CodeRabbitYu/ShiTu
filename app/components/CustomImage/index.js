/**
 * @flow
 * Created by Rabbit on 2018/4/26.
 */

import React from 'react';

import FastImage from 'react-native-fast-image';
import { Image, StyleSheet, ActivityIndicator, View} from "react-native";

type Size = 'large' | 'small';

type Props = {
  useCustomImage: boolean;
  activityVisible: boolean;
  activitySize: Size;
  ...any;
}

let CustomImage;

export default class index extends React.Component<Props, any> {

  static defaultProps = {
    useCustomImage: true
  };

  constructor(props: Props){
    super(props);

    if (props.useCustomImage) {
      CustomImage = FastImage;
    } else {
      CustomImage = Image;
    }
    this.state={
      imageLoading: true,
      imageLoaded: true,
      activityVisible: props.activityVisible
    }
  }

  imageLoadError(){
    console.log('onError');
    this.setState({ imageLoading: false, activityVisible: false });
    this.props.onError && this.props.onError()
  }

  imageLoadEnd() {
    // console.log('onLoadEnd');
    this.setState({ activityVisible: false });
    this.props.onLoadEnd && this.props.onLoadEnd()
  }

  render() {
    const { source, activityVisible, activitySize = 'small' } = this.props;

    // 瀑布流中的图片组件，如果设置alignItems/alignSelf就会导致加载不出来
    const alignStyle = activityVisible ? {alignItems: 'center'} : null;

    return (
      <View style={[styles.customImageView, alignStyle]}>
        <CustomImage
          {...this.props}
          source = {
            this.state.imageLoading
            ?
            source
            :
            { uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png' }
          }
          onLoadEnd={this.imageLoadEnd.bind(this)}
          onError={this.imageLoadError.bind(this)}
        />
        <ActivityIndicator style={styles.activityStyle} animating={this.state.activityVisible} size={activitySize}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  customImageView: {
    flex: 1,
    justifyContent: 'center',
  },
  activityStyle: {
    position: 'absolute',
  }
});
