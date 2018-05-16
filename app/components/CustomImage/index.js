/**
 * @flow
 * Created by Rabbit on 2018/4/26.
 */

import React from 'react';

import FastImage from 'react-native-fast-image';
import {View, StyleSheet, Image} from "react-native";

export default class index extends FastImage<any, any> {

  constructor(props: any){
    super(props);
    this.state={
      imageLoading : true,
    }
  }

  ImageLoading_Error(){
    console.log('error');
    this.setState({ imageLoading: false });
  }

  render() {
    const { source } = this.props
    return (
      <FastImage
        {...this.props}
        source = { this.state.imageLoading
          ?
          source
          :
          { uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png' } }
        onError={this.ImageLoading_Error.bind(this)}
      />

    );
  }
}

const styles = StyleSheet.create({
  MainContainer : {
    // flex:1,
    backgroundColor: 'blue'
  },
});
