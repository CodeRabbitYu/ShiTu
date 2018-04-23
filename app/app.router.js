/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import {
  StackNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation';

import { System } from './utils';
import { Icon, Theme } from './components';

import { ShiTu } from './route/ShiTu';
import { Gank } from "./route/Gank";
import { Main } from "./route/Main";
import { News } from "./route/Gank/news";

import Sample from './test/sample';

const MyTab = TabNavigator({
  Gank: {
    screen: News,
    navigationOptions: ()=> TabOptions('干货', 'Gank', '干货'),
  },
  ShiTu: {
    screen: ShiTu,
    navigationOptions: ()=> TabOptions('识兔', 'ShiTu', '识兔'),
  },

  Main:{
    screen: Main,
    navigationOptions: ()=> TabOptions('我的', 'Main', '我的'),
  },
},{

  initialRouteName: 'Gank',
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarBottom,
  swipeEnabled: false,
  animationEnabled: false,
  backBehavior: 'none',
  lazy: true,
  tabBarOptions: {
    // tabbar的style
    style: {
      height:49,
      backgroundColor:'white'
    },
    showIcon: true,
    // 是否显示label，默认为true
    showLabel: System.iOS && false,
    indicatorStyle :{
      height:0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
    }
  }
});
export const MyApp = StackNavigator({
  MyTab: {
    screen: MyTab,
  },
  Sample: {
    screen: Sample,
  }
});

const TabOptions = (tabBarTitle, tabBarIconName, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = (({tintColor,focused})=> {
    const color = focused ? Theme.tabBarColor : '#aaa';
    return(
      <Icon name={tabBarIconName} size={30} color={color}/>
    )
  });
  const headerTitle = navTitle;
  const headerTitleStyle = {
    fontSize: System.iOS ? 23 : 20,
    color: 'white',
    alignSelf: 'center',
    paddingTop: System.Android ? 17 : null,
  };
  // header的style
  const headerStyle = { backgroundColor: Theme.navColor };
  const tabBarVisible = true;
  return { tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle, tabBarVisible };
};