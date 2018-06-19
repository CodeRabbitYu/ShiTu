/**
 * @flow
 * Created by Rabbit on 2018/4/26.
 */

import React from 'react';

import FastImage from 'react-native-fast-image';
import { Image, StyleSheet, ActivityIndicator, View} from "react-native";
import {observer} from "mobx-react";
import {observable} from 'mobx';

type Size = 'large' | 'small';

type Props = {
  useCustomImage: boolean;
  activityVisible: boolean;
  activitySize: Size;
  ...any;
}

let CustomImage;

@observer
export default class index extends React.Component<Props, any> {

  static defaultProps = {
    useCustomImage: true,
    activityVisible: true,
    activitySize: 'small',
  };

  @observable imageLoading: boolean = true;
  @observable imageLoaded: boolean = true;
  @observable activityVisible: boolean = this.props.activityVisible;

  constructor(props: Props){
    super(props);

    if (props.useCustomImage) {
      CustomImage = FastImage;
    } else {
      CustomImage = FastImage;
    }
    // this.state={
    //   imageLoading: true,
    //   imageLoaded: true,
    //   activityVisible: props.activityVisible
    // }
  }

  imageLoadError(){
    console.log('onError');
    // this.setState({ imageLoading: false, activityVisible: false });

    this.imageLoading = false;
    this.activityVisible = false;

    this.props.onError && this.props.onError()
  }

  imageLoadEnd() {
    // console.log('onLoadEnd');
    this.activityVisible = false;
    this.props.onLoadEnd && this.props.onLoadEnd()
  }

  imageLoadStart() {
    this.activityVisible = true;
    this.props.onLoadStart && this.props.onLoadStart()
  }

  render() {
    const { source, activityVisible, activitySize = 'small', style } = this.props;

    // 瀑布流中的图片组件，如果设置alignItems/alignSelf就会导致加载不出来
    const alignStyle = activityVisible ? {alignItems: 'center'} : null;
		console.log('imageLoading', this.imageLoading);
    return (
      <View style={[styles.customImageView, alignStyle]}>
        <CustomImage

					style={[{flex: 1}, style]}
          source = {
            this.imageLoading
            ?
            source
            :
            { uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png' }
          }
					{...this.props}
          // onLoadStart={this.imageLoadStart.bind(this)}
          // onLoadEnd={this.imageLoadEnd.bind(this)}
          onError={this.imageLoadError.bind(this)}
        />
        {/*<ActivityIndicator style={styles.activityStyle} animating={this.activityVisible} size={activitySize}/>*/}
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
