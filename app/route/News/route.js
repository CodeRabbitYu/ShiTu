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


import {System} from '../../utils';
import { Icon, Theme } from '../../components';


import { ShiTu } from '../ShiTu';
import { BuDeJie }  from '../News/BuDeJie';
import { Main } from '../Main';

export const GankTab = createMaterialTopTabNavigator({
	Gank: {
		screen: BuDeJie,
		navigationOptions: () => TabOptions('识兔', 'ShiTu', '识兔'),
	},
	ShiTu: {
		screen: ShiTu,
		navigationOptions: () => TabOptions('识兔111', 'ShiTu', '识兔'),
	},
	Main1: {
		screen: BuDeJie,
		navigationOptions: () => TabOptions('识兔222', 'ShiTu', '识兔'),
	},
	Main2: {
		screen: Main,
		navigationOptions: () => TabOptions('识兔333', 'ShiTu', '识兔'),
	},
	Main3: {
		screen: ShiTu,
		navigationOptions: () => TabOptions('识兔4444', 'ShiTu', '识兔'),
	},
	Main4: {
		screen: Main,
		navigationOptions: () => TabOptions('识兔5555555', 'ShiTu', '识兔'),
	},
	Main5: {
		screen: Main,
		navigationOptions: () => TabOptions('识兔666666666', 'ShiTu', '识兔'),
	},

}, {

	initialRouteName: 'ShiTu',
	swipeEnabled: true,
	animationEnabled: false,
	backBehavior: 'none',

	lazy: true,
	tabBarOptions: {
		lazy: true,
		activeTintColor: '#4ECBFC',
		inactiveTintColor: 'black',
		// upperCaseLabel: false,
		scrollEnabled: true,
		// tabbar的style
		style: {
			height: 44,
			backgroundColor: 'white'
		},
		tabStyle: {
			// height:80,
			// width: 70,
			// backgroundColor: 'red'
		},
		labelStyle: {
			fontSize: 15,
		},
		// 是否显示label，默认为true
		// showLabel: false,
		indicatorStyle: {
			height: 3, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
			backgroundColor: '#4ECBFC',
			// width:30,
			// alignItems:'center',
			// justifyContent:'center',
			// left: 48
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
	return { tabBarLabel, tabBarVisible, };
};