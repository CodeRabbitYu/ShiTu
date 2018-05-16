/**
 * @flow
 * Created by Rabbit on 2018/5/16.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image, ScrollView,
} from 'react-native';
import {JokeItem} from "./JokeItem";
import {PictureItem} from "./PictureItem";
import {CustomImage, Button} from '../../../../components';
import type {RTBDJList} from "../../../../servers/News/interfaces";
import {System} from "../../../../utils";

type Props = {
  itemData: RTBDJList;
  // itemPress: Function;
  picturePress: Function;
};
export class ModalView extends React.Component<Props> {

  renderItem() {
    const { jokeData, pictureData, type, isLongPicture, cdn_img, imageHeight } = this.props.itemData;
    /**
     * @desc 全部
     */
    if (type === '1') {
      return(
        <JokeItem jokeData={jokeData}/>
      )
    }
    /**
     * @desc 图片
     */
    if (type === '10') {
      if (isLongPicture) {
        return (
          <ScrollView>
            <Button onPress={this.props.picturePress} activeOpacity={1}>
              <Image source={{uri: cdn_img}}
                // resizeMode={'contain'}
                     style={[styles.picture, {height: imageHeight}]}
              />
            </Button>
          </ScrollView>
        )
      } else {
        return (
          <Button onPress={this.props.picturePress} activeOpacity={1}>
            <CustomImage source={{uri: cdn_img}}
                         resizeMode={'contain'}
                         style={[styles.picture, {height: imageHeight}]}/>
          </Button>
        )
      }
    }
    /**
     * @desc 视频
     */
    if (type === '41') {
      return(
        <Button onPress={this.props.picturePress} activeOpacity={1}>
          <CustomImage source={{uri: cdn_img}}
                       resizeMode={'contain'}
                       style={[styles.picture, {height: imageHeight}]}/>
        </Button>
      )
    }
  }

  render() {
    // const { itemPress } = this.props;
    return(
      <View>
        {this.renderItem()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    width: System.SCREEN_WIDTH,
  },
  longPictureSignView: {
    backgroundColor:'rgba(88, 87, 86, 0.8)',
    height: 40,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: System.SCREEN_WIDTH,
  },
  longPictureSignText: {
    fontSize: 18,
    color: 'white'
  }
});