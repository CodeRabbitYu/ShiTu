/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */
import React from 'react';
import { View, ActivityIndicator, DeviceEventEmitter } from 'react-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AppRouter } from './AppRouter';
import { AuthRouter } from './AuthRouter';

type Props = {
  navigation: any
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
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

class AppRouterNavigator extends React.Component<Props> {
  static router = AppRouter.router;
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    DeviceEventEmitter.emit('badgeNumber', 30);
  }

  render() {
    return <AppRouter navigation={this.props.navigation} />;
  }
}

export const AuthLoadingRouter = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      AppRouter: AppRouterNavigator,
      AuthRouter: AuthRouter
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
