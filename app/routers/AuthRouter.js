/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import React from 'react';

import {
	createStackNavigator,
} from 'react-navigation';

import { Login } from '../pages/Login';


export const AuthRouter = createStackNavigator({
	Login: {
		screen: Login
	}

}, {
	navigationOptions: () => ({
		header: null,
		gesturesEnabled: true,
	}),
	// headerTransitionPreset: 'fade-in-place',
	// headerMode: 'float',
	mode: 'modal'
});
