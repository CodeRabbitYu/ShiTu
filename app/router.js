/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import {
  StackNavigator,
  TabBarBottom,
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialBottomTabNavigator
} from 'react-navigation';

import { System } from './utils';
import { Icon, Theme } from './components';

import { ShiTu } from './route/ShiTu';
import { News, WealPicture, WealPictureDetail, BuDeJie } from "./route/News";
import { Main } from "./route/Main";

import { GankTab } from './route/News/route';

import Sample from './test/sample';

const MyTab = createBottomTabNavigator({

  ShiTu: {
    screen: ShiTu,
    navigationOptions: ()=> TabOptions('识兔', 'ShiTu'),
  },
  Gank: {
    screen: News,
    navigationOptions: () => TabOptions('干货', 'Gank'),
  },
  Main: {
    screen: Main,
    navigationOptions: ()=> TabOptions('我的', 'Main'),
  },
},{
  initialRouteName: 'Gank',
  backBehavior: 'none',
  tabBarOptions: {
    style: {
      height: 49,
      backgroundColor: 'white'
    },
    showLabel: false,
  }
});

export const MyApp = createStackNavigator({
  MyTab: {
    screen: MyTab,
  },
  WealPictureDetail: {
    screen: WealPictureDetail,
    // navigationOptions: () => ({header: null})
  },
  BuDeJie: {
    screen: BuDeJie,
  },
  Sample: {
    screen: Sample,
  }
},{
  navigationOptions: ({navigation}) => NavigatorOptions(navigation)
});

const NavigatorOptions = (navigation) => {

  // console.log(navigation);

  const routes = navigation.state.routes;

  const params = routes ? routes[navigation.state.index].params : null;

  const headerTitle = params ? params.title : ''

  const headerTitleStyle = {
    fontSize: System.iOS ? 23 : 20,
    color: 'white',
    alignSelf: 'center',
    paddingTop: System.Android ? 17 : null,
  };
  const headerStyle = { backgroundColor: Theme.navColor };
  return {headerTitle, headerStyle, headerTitleStyle }
}

const TabOptions = (tabBarTitle, tabBarIconName) => {
  const title = tabBarTitle;
  const tabBarIcon = (({tintColor,focused})=> {
    const color = focused ? Theme.tabBarColor : '#aaa';
    return(
      <Icon name={tabBarIconName} size={30} color={color}/>
    )
  });
  const tabBarVisible = true;
  return { title, tabBarIcon, tabBarVisible };
};