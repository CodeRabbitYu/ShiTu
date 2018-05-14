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
import {RTBDJList} from "../../../../servers/News/types";
import {ToolBarItem} from "./ToolBarItem";
import {JokeItem} from "./JokeItem";
import {PictureItem} from "./PictureItem";

type Props = {
  itemData: RTBDJList;
};
export class BaseItem extends React.PureComponent<Props, any> {


  constructor(props: Props) {
    super(props);

    const { text, profile_image, name, passtime, love, hate, repost, comment, cdn_img, height, width } = props.itemData;

    const userInfoData = { profile_image, name, passtime };
    const toolBarData = { love, hate, repost, comment };
    const jokeData = { text };
    const pictureData = { cdn_img, height, width, ...jokeData };

    this.state = {
      userInfoData,
      toolBarData,
      jokeData,
      pictureData
    }
  }

  render() {

    const { userInfoData, toolBarData, jokeData, pictureData } = this.state;
    return (
      <View style={styles.container}>
        <UserInfoItem userInfoData={userInfoData}
                      userInfoPress={()=>alert('123')}/>

        <PictureItem pictureData={pictureData}/>

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