/**
 * Created by Rabbit on 2018/5/3.
 */
import React from 'react';

import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  TabBarTop,
  createMaterialTopTabNavigator
} from 'react-navigation';


import {System} from "../../utils";


export const GankTab = createMaterialTopTabNavigator({
  Gank: {
    screen: News,
    navigationOptions: ()=> TabOptions('识兔', 'ShiTu', '识兔'),
  },
  ShiTu: {
    screen: News,
    navigationOptions: ()=> TabOptions('识兔', 'ShiTu', '识兔'),
  },
  Main:{
    screen: News,
    navigationOptions: ()=> TabOptions('识兔', 'ShiTu', '识兔'),
  },

},{

  // initialRouteName: 'Gank',
  tabBarPosition: 'top',
  tabBarComponent: TabBarTop,
  swipeEnabled: true,
  animationEnabled: true,
  backBehavior: 'none',
  lazy: true,
  tabBarOptions: {
    // tabbar的style
    style: {
      height:40,
      // backgroundColor:'white'
    },
    showIcon: false,
    // 是否显示label，默认为true
    // showLabel: false,
    indicatorStyle :{
      height:3, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
      backgroundColor: 'red',
      width:30,
      alignItems:'center',
      justifyContent:'center',
      left: 48
    }
  }
});

const TabOptions = (tabBarTitle, tabBarIconName, navTitle) => {
  const tabBarLabel = tabBarTitle;

  const headerTitle = navTitle;
  const headerTitleStyle = {
    fontSize: System.iOS ? 23 : 20,
    color: 'white',
    alignSelf: 'center',
    paddingTop: System.Android ? 17 : null,
  };
  // header的style
  const headerStyle = { backgroundColor: 'red' };
  const tabBarVisible = true;
  return { tabBarLabel, tabBarVisible };
};