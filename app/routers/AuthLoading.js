/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */
import React from 'react';
import {
	View,
	ActivityIndicator,
} from 'react-native';

import {createSwitchNavigator} from 'react-navigation';
import { AppRouter } from './AppRouter';
import { AuthRouter } from './AuthRouter';

type Props = {
	navigation: any;
};
class AuthLoadingScreen extends React.Component<Props> {
	constructor(props) {
		super(props);
		// this.authAsync();
	}

	componentDidMount() {
		this.props.navigation.navigate('AppRouter');
	}

	authAsync = async () => {
		// const userToken = await AsyncStorage.getItem('userToken');

		// this.props.navigation.navigate(userToken ? 'AppRouter' : 'AuthRouter');

	};

	render() {
		return (
			<View >
				<ActivityIndicator />
			</View>
		);
	}
}

export const AuthLoadingRouter = createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		AppRouter: AppRouter,
		AuthRouter: AuthRouter,
	},
	{
		initialRouteName: 'AuthLoading',
	}
);