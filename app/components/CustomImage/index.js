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
  ...FastImage.propTypes;
}

let CustomImage = FastImage;

export default class index extends React.Component<Props, any> {

  constructor(props: Props){
    super(props);
    this.state={
      imageLoading: true,
      imageLoaded: true,
      activityVisible: props.activityVisible
    }
  }

  imageLoadError(){
    console.log('error');
    this.setState({ imageLoading: false, activityVisible: false });
  }

  imageLoadEnd() {
    this.setState({ activityVisible: false });
  }

  render() {
    const { source, useCustomImage = false, activitySize = 'small' } = this.props;

    if (!useCustomImage) CustomImage = Image;

    console.log(CustomImage);

    return (
      <View style={styles.customImageView}>
        <CustomImage
          {...this.props}
          source = { this.state.imageLoading
            ?
            source
            :
            { uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png' } }
          onError={this.imageLoadError.bind(this)}
          onLoadEnd={this.imageLoadEnd.bind(this)}
        />
        <ActivityIndicator style={styles.activityStyle} animating={this.state.activityVisible} size={activitySize}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  customImageView: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityStyle: {
    position: 'absolute',

  }
});
