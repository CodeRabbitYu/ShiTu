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
import { News, WealPicture, WealPictureDetail, BuDeJie, BuDeJiePictureDetail } from './route/News';
import { Main } from './route/Main';
import WebView from './route/WebView';

import { GankTab } from './route/News/route';

import Sample from './test/sample';
import {Text} from 'react-native';

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
	initialRouteName: 'News',
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
	},
	BuDeJie: {
		screen: BuDeJie,
	},
	BuDeJiePictureDetail: {
		screen: BuDeJiePictureDetail
	},
	WebView: {
  	screen: WebView,
	},
	Sample: {
		screen: Sample,
	},

}, {
	navigationOptions: ({navigation}) => NavigatorOptions(navigation),
	headerTransitionPreset: 'fade-in-place',
	headerMode: 'float',
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

	return { headerTitle, headerStyle, headerTitleStyle, headerBackTitle, headerTintColor };
};

const TabOptions = (tabBarTitle, tabBarIconName) => {
	const title = tabBarTitle;
	const tabBarIcon = (({tintColor, focused}) => {
		const color = focused ? Theme.tabBarColor : '#aaa';
		return (
			<CustomIcon name={tabBarIconName} size={30} color={color}/>
		);
	});
	const tabBarVisible = true;
	return { title, tabBarIcon, tabBarVisible };
};