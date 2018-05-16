/**
 * @flow
 * Created by Rabbit on 2018/5/16.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {JokeItem} from "./JokeItem";
import {PictureItem} from "./PictureItem";
import type {RTBDJList} from "../../../../servers/News/interfaces";
import { Button } from "../../../../components";

type Props = {
  itemData: RTBDJList;
  itemPress: Function;
  picturePress: Function;
};
export class ContainerItem extends React.PureComponent<Props> {

  renderItem() {
    const { jokeData, pictureData, type } = this.props.itemData;
    /**
     * @desc 全部
     */
    if (type === '1') {
      return(
        <JokeItem jokeData={jokeData}/>
      )
    }

    {/*<Button onPress={() => navigate('BuDeJiePictureDetail', { pictureData: pictureData })}>*/}

    /**
     * @desc 图片
     */
    if (type === '10') {
      return(
        <View>
          <JokeItem jokeData={jokeData}/>
          <PictureItem pictureData={pictureData} picturePress={this.props.picturePress}/>
        </View>
      )
    }
    /**
     * @desc 段子
     */
    if (type === '29') {
      return(
        <JokeItem jokeData={jokeData}/>
      )
    }
    /**
     * @desc 视频
     */
    if (type === '41') {
      return(
        <View>
          <JokeItem jokeData={jokeData}/>
          <PictureItem pictureData={pictureData} picturePress={this.props.picturePress}/>
        </View>
      )
    }
  }

  render() {
    const { itemPress } = this.props;
     return(
       <Button onPress={itemPress}>
         {this.renderItem()}
       </Button>
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});