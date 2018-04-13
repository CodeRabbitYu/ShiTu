/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import {
  StackNavigator,
  TabNavigator,
  addNavigationHelpers
} from 'react-navigation';

import { System } from './utils';

import { ShiTu } from './route/ShiTu';
import { Gank } from "./route/Gank";
import { Main } from "./route/Main";

const MyTab = TabNavigator({
  ShiTu: {
    screen: ShiTu,
    navigationOptions: ()=> TabOptions('识兔','识兔'),
  },
  Gank: {
    screen: Gank,
    navigationOptions: ()=> TabOptions('干货','干货'),
  },
  Main:{
    screen: Main,
    navigationOptions: ()=> TabOptions('我的','我的'),
  },
});
export const MyApp = StackNavigator({
  MyTab: {
    screen: MyTab
  }
});

const TabOptions = (tabBarTitle, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const headerTitle = navTitle;
  const headerTitleStyle = {
    fontSize: System.iOS ? 20 : 23,
    color: 'white',
    alignSelf: 'center',
    paddingTop: System.Android ? 17 : null,
  };
  // header的style
  const headerStyle = { backgroundColor:'#4ECBFC' };
  const tabBarVisible = true;
  return { tabBarLabel, headerTitle, headerTitleStyle, headerStyle, tabBarVisible };
};