/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import { createBottomTabNavigator, createStackNavigator, StackViewTransitionConfigs } from 'react-navigation';

import { System } from '../utils/index';
import { CustomIcon, Theme } from '../components/index';

import { ShiTu } from '../pages/ShiTu';
import { News, BuDeJie } from '../pages/News/News';
import { Main } from '../pages/Main';
import WebView from '../pages/STWebView';
import { Login } from '../pages/Login';
import { Register } from '../pages/Login/Register';
import { MainData } from '../pages/MainData';
import { ThemeScreen } from '../pages/Theme';

import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { DeviceEventEmitter, TouchableOpacity } from 'react-native';
import { Badge } from 'teaset';
import { TabOptions } from '../utils/TabOptions';

let badgeNumberListener;


const IOS_MODAL_ROUTES = ['Login'];

const dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = IOS_MODAL_ROUTES.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
  );
  return StackViewTransitionConfigs.defaultTransitionConfig(transitionProps, prevTransitionProps, isModal);
};

const MyTab = createBottomTabNavigator(
  {
    ShiTu: {
      screen: ShiTu,
      navigationOptions: () => TabOptions('识兔', 'ShiTu')
    },
    News: {
      screen: News,
      navigationOptions: () => TabOptions('干货', 'News')
    },
    Main: {
      screen: Main,
      navigationOptions: () => TabOptions('我的', 'Main')
    }
  },
  {
    initialRouteName: 'ShiTu',
    backBehavior: 'none',
    tabBarOptions: {
      tabStyle: {
        // marginTop: 10,
      },
      style: {},
      safeAreaInset: {
        bottom: 'always',
        top: 'never'
      },
      showLabel: false
    }
  }
);

Main.navigationOptions = ({ navigation }) => {
  if (!badgeNumberListener) {
    badgeNumberListener = DeviceEventEmitter.addListener('badgeNumber', (badgeNumber: number) => {
      navigation.setParams({
        badgeNumber: badgeNumber
      });
    });
  }

  const badgeNumber = navigation.state.params && navigation.state.params.badgeNumber;

  const tabBarButtonComponent: any = (props: any) => {
    return [
      <TouchableOpacity {...props} activeOpacity={1} style={{ width: SCREEN_WIDTH / 3 }} key={'tabBar'} />,
      <Badge count={badgeNumber} key={'Badge'} style={{ position: 'absolute', left: SCREEN_WIDTH - 60, top: 5 }} />
    ];
  };
  return { tabBarButtonComponent: tabBarButtonComponent };
};

MyTab.navigationOptions = ({ navigation }) => {
  const routes = navigation.state.routes;
  const params = routes ? routes[navigation.state.index].params : null;

  const headerTitle = params ? params.title : '';

  const headerTitleStyle = {
    fontSize: System.iOS ? 23 : 20,
    color: 'white',
    flex: 1,
    textAlign: 'center',
    paddingTop: System.Android ? 17 : null
  };
  const headerBackTitle = null;
  const headerTintColor = 'white';
  const headerStyle = {
    backgroundColor: Theme.navColor,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    elevation: 0
  };

  // 识兔这里的导航都是手动控制的，所以这里设置为null就可以隐藏了。
  const header = null;

  return {
    headerTitle,
    headerStyle,
    headerTitleStyle,
    headerBackTitle,
    headerTintColor,
    header
  };
};

export const AppRouter = createStackNavigator(
  {
    MyTab: {
      screen: MyTab
    },
    BuDeJie: {
      screen: BuDeJie
    },
    WebView: {
      screen: WebView
    },
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    },
    MainData: {
      screen: MainData
    },
    ThemeScreen: {
      screen: ThemeScreen
    }
  },
  {
    // 快速定制导航条，新版识兔中所有的导航都是重写的，所以这里会将全部的导航置空
    defaultNavigationOptions: () => ({
      header: null,
      gesturesEnabled: true
    }),
    // headerMode: 'screen',
    transitionConfig: iOS
      ? dynamicModalTransition
      : () => ({
          screenInterpolator: StackViewStyleInterpolator.forHorizontal
        }),
    // transitionConfig: iOS ? dynamicModalTransition : StackViewStyleInterpolator.forHorizontal,
    cardOverlayEnabled: true
    // transparentCard: true,
    // headerTransitionPreset: 'fade-in-place',
    // headerMode: 'float',
    // mode: 'modal'
  }
);

// const TabOptions = (tabBarTitle, tabBarIconName) => {
//   const title = tabBarTitle;
//   const tabBarIcon = ({ focused }: { focused: boolean }) => {
//     const color = focused ? Theme.tabBarColor : '#aaa';
//     return (
//       <View style={{ marginTop: 3 }}>
//         <CustomIcon name={tabBarIconName} size={35} color={color} />
//       </View>
//     );
//   };
//   const tabBarVisible = true;
//   return { title, tabBarVisible, tabBarIcon };
// };
