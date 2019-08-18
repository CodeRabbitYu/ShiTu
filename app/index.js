/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, DeviceEventEmitter, BackHandler, ToastAndroid, StyleSheet } from 'react-native';

import { AuthLoadingRouter } from './routers/AuthLoading';
import * as rootStore from './store/RootStore';

import SplashScreen from 'react-native-splash-screen';
import { StoreContext } from './utils/Tool';
import NavigationModule from './utils/NavigationModule';

const navigationPersistenceKey = __DEV__ ? 'NavigationStateDEV' : null;
let lastBackPressed: number;

function index() {
  useEffect(() => {
    SplashScreen.hide();
    // themeStore.setBlackTheme();
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressAndroid);
    };
  });

  function onBackButtonPressAndroid() {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  }

  return (
    <StoreContext.Provider value={rootStore}>
      <View style={styles.container}>
        <AuthLoadingRouter
          // persistenceKey={navigationPersistenceKey}
          renderLoadingExperimental={() => <ActivityIndicator size="large" color="black" />}
          ref={navigatorRef => {
            NavigationModule.setNavigatorRef(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState) => {
            const AppRouter = currentState.routes[1];
            if (AppRouter.routes && AppRouter.routes.length > 1) {
              BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressAndroid);
            } else {
              BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid);
            }
          }}
        />
      </View>
    </StoreContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default index;
