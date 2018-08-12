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
} from 'react-navigation';

import { System } from './utils';
import { CustomIcon, Theme } from './components';

import { ShiTu } from './route/ShiTu';
import { News, Welfare, WelfareDetail, BuDeJie, BuDeJieDetail } from './route/News';
import { Main } from './route/Main';
import WebView from './route/WebView';

import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';


const MyTab = createBottomTabNavigator({

	ShiTu: {
		screen: ShiTu,
		navigationOptions: () => TabOptions('识兔', 'ShiTu'),
	},
	News: {
		screen: News,
		navigationOptions: () => TabOptions('干货', 'News'),
	},
	Main: {
		screen: Main,
		navigationOptions: () => TabOptions('我的', 'Main'),
	},
}, {
	initialRouteName: 'ShiTu',
	backBehavior: 'none',
	tabBarOptions: {
		style: {
			height: 49,
			backgroundColor: 'white'
		},
		showLabel: false,
	},

});

export const MyApp = createStackNavigator({
	MyTab: {
		screen: MyTab,
	},
	WelfareDetail: {
		screen: WelfareDetail,
	},
	BuDeJie: {
		screen: BuDeJie,
	},
	BuDeJieDetail: {
		screen: BuDeJieDetail
	},
	WebView: {
  	screen: WebView,
	},

}, {
	// 快速定制导航条，新版识兔中所有的导航都是重写的，所以这里会将全部的导航置空
	navigationOptions: () => ({
		header: null,
		gesturesEnabled: true,
	}),
	// headerMode: 'screen',
	transitionConfig: () => ({
		screenInterpolator: StackViewStyleInterpolator.forHorizontal,
	})
	// navigationOptions: ({navigation}) => NavigatorOptions(navigation),
	// headerTransitionPreset: 'fade-in-place',
	// headerMode: 'float',
	// mode: 'modal'
});

const NavigatorOptions = (navigation) => {

	const routes = navigation.state.routes;

	const params = routes ? routes[navigation.state.index].params : null;

	const headerTitle = params ? params.title : '';

	const headerTitleStyle = {
		fontSize: System.iOS ? 23 : 20,
		color: 'white',
		flex: 1,
		textAlign: 'center',
		paddingTop: System.Android ? 17 : null,
	};
	const headerBackTitle = null;
	const headerTintColor = 'white';
	const headerStyle = {
		backgroundColor: Theme.navColor,
		shadowColor: 'transparent',
		shadowOpacity: 0,
		borderBottomWidth: 0,
		borderBottomColor: 'transparent',
		elevation: 0,
	};

	const header = null;

	return { headerTitle, headerStyle, headerTitleStyle, headerBackTitle, headerTintColor, header };
};

const TabOptions = (tabBarTitle, tabBarIconName) => {
	const title = tabBarTitle;
	const tabBarIcon = (({tintColor, focused}: {tintColor?: string, focused: boolean}) => {
		const color = focused ? Theme.tabBarColor : '#aaa';
		return (
			<CustomIcon name={tabBarIconName} size={30} color={color}/>
		);
	});
	const tabBarVisible = true;
	return { title, tabBarIcon, tabBarVisible };
};