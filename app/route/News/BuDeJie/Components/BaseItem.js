/**
 * @flow
 * Created by Rabbit on 2018/5/9.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import {UserInfoItem} from "./UserInfoItem";
import {RTBDJList, ToolBar, UserInfo, Joke, Picture} from "../../../../servers/News/interfaces";
import {ToolBarItem} from "./ToolBarItem";
import {JokeItem} from "./JokeItem";
import {PictureItem} from "./PictureItem";
import {Button} from "../../../../components";
import type {NavigationState} from "react-navigation";

type Props = {
  itemData: RTBDJList;
  navigate: NavigationState;
  itemPress: Function;
};

type State = {
  userInfoData: UserInfo;
  toolBarData: ToolBar;
  jokeData: Joke;
  pictureData: Picture;
  type: string;
}

export class BaseItem extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    
    const { text, profile_image, name, passtime, love, hate, repost, comment, cdn_img, imageHeight, containerHeight, isLongPicture, type } = props.itemData;

    const userInfoData = { profile_image, name, passtime } ;
    const toolBarData = { love, hate, repost, comment };
    const jokeData = { text };
    const pictureData = { cdn_img, imageHeight, isLongPicture, containerHeight, ...jokeData };

    this.state = {
      userInfoData,
      toolBarData,
      jokeData,
      pictureData,
      type
    }
  }

  renderItem() {
    const { jokeData, pictureData, type } = this.state;
    const { navigate } = this.props;
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
            <PictureItem pictureData={pictureData}/>
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
          <PictureItem pictureData={pictureData}/>
        </View>
      )
    }
  }

  render() {
    const { userInfoData, toolBarData } = this.state;
    return (
      <View style={styles.container}>
        <UserInfoItem userInfoData={userInfoData}
                      userInfoPress={()=>alert('123')}/>
        <Button onPress={this.props.itemPress}>
          {this.renderItem()}
        </Button>
        <ToolBarItem toolBarData={toolBarData}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});