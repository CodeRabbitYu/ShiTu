/**
 * @flow
 * Created by Rabbit on 2019-04-30.
 */

import React, { useContext } from 'react';

import { View } from 'react-native';
import { CustomIcon } from '../../components';

export const TabOptions = function(tabBarTitle: string, tabBarIconName: string) {
  const title = tabBarTitle;
  const tabBarIcon = ({ focused }: { focused: boolean }) => {
    const color = focused ? Theme.tabBarColor : '#aaa';
    return (
      <View style={{ marginTop: 3 }}>
        <CustomIcon name={tabBarIconName} size={35} color={color} />
      </View>
    );
  };
  const tabBarVisible = true;
  return { title, tabBarVisible, tabBarIcon };
};
