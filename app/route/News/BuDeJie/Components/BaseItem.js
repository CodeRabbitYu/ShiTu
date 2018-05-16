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
import {ContainerItem} from "./ContainerItem";
import {Button} from "../../../../components";
import type {NavigationState} from "react-navigation";

type Props = {
  itemData: RTBDJList;
  navigate: NavigationState;
  itemPress: Function;
  picturePress: Function;
};

type State = {
  userInfoData: UserInfo;
  toolBarData: ToolBar;
  jokeData: Joke;
  pictureData: Picture;
  type: string;
}

export class BaseItem extends React.PureComponent<Props, State> {

  render() {

    const { userInfoData, toolBarData } = this.props.itemData;

    return (
      <View style={styles.container}>
        <UserInfoItem userInfoData={userInfoData}/>
        <ContainerItem itemData={this.props.itemData}
                       itemPress={this.props.itemPress}
                       picturePress={this.props.picturePress}
        />
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