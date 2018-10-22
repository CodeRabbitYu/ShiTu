/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';
import { View, ActivityIndicator, SafeAreaView, DeviceEventEmitter } from 'react-native';

import { AuthLoadingRouter } from './routers/AuthLoading';
// import {SafeAreaView} from 'react-navigation';
import { Toast } from './components';
import { Provider } from 'mobx-react';
import * as RootStore from './store/RootStore';

import SplashScreen from 'react-native-splash-screen';

const navigationPersistenceKey = __DEV__ ? 'NavigationStateDEV' : null;

export default class index extends React.Component<any> {
  toast: Toast;

  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    global.Toast = this.toast;
    SplashScreen.hide();
    DeviceEventEmitter.emit('badgeNumber', 30);
  }

  render() {
    return (
      <Provider {...RootStore}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white'
          }}
        >
          <AuthLoadingRouter
              // persistenceKey={navigationPersistenceKey}
              // renderLoadingExperimental={() => <ActivityIndicator size="large" color="black" />}
          />
          <Toast ref={(t: any) => (this.toast = t)} />
        </View>
      </Provider>
    );
  }
}
