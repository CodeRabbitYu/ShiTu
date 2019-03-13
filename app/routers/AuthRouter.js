/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import React from 'react';

import { createStackNavigator } from 'react-navigation';

import { Login } from '../pages/Login';
import { Register } from '../pages/Login/Register';

export const AuthRouter = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null
      })
    },
    Register: {
      screen: Register,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    defaultNavigationOptions: () => ({
      header: null,
      gesturesEnabled: true
    }),
    // headerTransitionPreset: 'fade-in-place',
    // headerMode: 'float',
    mode: 'modal'
  }
);
