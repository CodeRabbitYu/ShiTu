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
import ToolBarItem from "./ToolBarItem";

type Props = {
  itemData: RTBDJList;
};
export class BaseItem extends React.PureComponent<Props> {


  render() {

    const { text, profile_image, name, passtime } = this.props.itemData;

    return (
      <View style={styles.container}>
        <UserInfoItem profile_image={profile_image} name={name} passtime={passtime}/>

        <Text>{text}</Text>

        <ToolBarItem/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});