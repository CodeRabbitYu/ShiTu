/**
 * @flow
 * Created by Rabbit on 2018/5/9.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RTBDJList, ToolBar, UserInfo, Joke, Picture } from '../../../../servers/News/interfaces';
import { ContainerItem } from './Items/ContainerItem';
import type { NavigationState } from 'react-navigation';

import { UserInfoView } from './Views/UserInfoView';
import { ToolBarView } from './Views/ToolBarView';

type Props = {
  itemData: RTBDJList,
  navigate: NavigationState,
  itemPress: Function,
  picturePress: Function,
  videoPress: Function
};

const BaseItem = (props: Props) => {
  const { userInfoData } = props.itemData;
  const { itemData, itemPress, picturePress, videoPress } = props;

  // console.log('itemData', itemData);

  return (
    <View>
      <UserInfoView userInfoData={userInfoData} />
      <ContainerItem
        itemData={itemData}
        itemPress={itemPress}
        picturePress={picturePress}
        videoPress={videoPress}
      />
      {/*<ToolBarView toolBarData={toolBarData} />*/}
      <View style={styles.bottomViewStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomViewStyle: {
    backgroundColor: '#c0c0c0',
    height: px2dp(10)
  }
});

export { BaseItem };
