/**
 * @flow
 * Created by Rabbit on 2018/6/27.
 */

import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import { NavigationEvents } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';

import { NavigatorBar, LoadingSpinner, ErrorView } from '../index';
import { Theme } from 'teaset';
import { ConfigStore } from '../../store/ConfigStore';
import { getNetInfoStatus, StoreContext } from '../../utils/Tool';

type Props = {
  store?: ConfigStore, // 页面中的mobx状态
  onErrorPress?: Function, // 出错页面的点击事件
  navBar?: any, // 导航条
  children?: any,

  style?: any, // 外层View样式
  navStyle?: any, // 导航条样式
  contentViewStyle?: any, // 包裹层View样式

  isTopNavigator?: boolean, // 是否是顶层页面
  isHiddenNavBar?: boolean,

  errorTitle?: string, //  错误页文本
  imageSource?: string, // 错误页图片
  errorStyle?: string, // 错误View样式

  bottomStyle?: any,
  bottomBackgroundColor?: string,
  bottomHeight?: number,

  onWillFocus?: Function,
  onDidFocus?: Function,
  onWillBlur?: Function,
  onDidBlur?: Function,

  netInfoCallBack?: (network: NetType) => void, // 网络监听回调

  ...NavigatorBar.Props
};

export type NetType = {
  isConnect: boolean, // 是否连接网络
  isWifi: boolean, // 是否是wifi连接
  isCellular: boolean // 是否是流量连接
};



let netInfoListen: any;

const BaseContainer = observer((props: Props) => {
  const store = useContext(StoreContext);
  const { themes } = store.themeStore;
  const {
    style,
    contentViewStyle,
    isTopNavigator,
    isHiddenNavBar,
    onWillFocus,
    onDidFocus,
    onWillBlur,
    onDidBlur
  } = props;

  const backgroundColor = !isTopNavigator && Theme.isIPhoneX ? 'white' : null;
  const marginTop = !isHiddenNavBar ? Theme.statusBarHeight + Theme.navBarContentHeight : 0;

  useEffect(() => {
    NetInfo.getConnectionInfo().then(networkHandle);
    if (netInfoListen) {
      NetInfo.removeEventListener('connectionChange', networkHandle);
    } else {
      netInfoListen = NetInfo.addEventListener('connectionChange', networkHandle);
    }

    return () => {
      props.store && props.store.hideLoading();
      netInfoListen && NetInfo.removeEventListener('connectionChange', networkHandle);
    };
  });

  function networkHandle(netInfo: any) {
    const { netInfoCallBack } = props;
    const network: NetType = getNetInfoStatus(netInfo);

    const { store } = props;
    store && store.setNetInfo(network);
    netInfoCallBack && netInfoCallBack(network);
  }

  function renderContent() {
    const { store, children, onErrorPress, errorTitle, imageSource, errorStyle } = props;
    if (!store) return children;
    const { isLoading, isError, errorInfo } = store;
    // console.log(errorInfo);
    if (isLoading) {
      if (store.loadingType === 'page') {
        return <LoadingSpinner isVisible={store.isLoading} />;
      } else {
        return (
          <View style={{ flex: 1 }}>
            {children}
            <LoadingSpinner isVisible={store.isLoading} />
          </View>
        );
      }
    }
    if (isError)
      return (
        <ErrorView
          errorStyle={errorStyle}
          imageSource={imageSource}
          title={errorInfo.message || errorTitle}
          onErrorPress={onErrorPress}
        />
      );
    return children;
  }

  function renderNavView() {
    const { navBar, isTopNavigator, navStyle, ...navProps } = props;
    let navView = null;
    if (typeof navBar === 'undefined') {
      navView = <NavigatorBar {...navProps} style={navStyle} isTopNavigator={isTopNavigator} />;
    } else {
      navView = navBar;
    }
    return navView;
  }

  function renderBottom() {
    const { bottomStyle, bottomBackgroundColor, bottomHeight = 39, isTopNavigator } = props;

    const backgroundColor = bottomBackgroundColor ? bottomBackgroundColor : themes.safeAreaViewBottomColor;
    const height = !isTopNavigator && Theme.isIPhoneX ? bottomHeight : 0;
    return <View style={[{ height, backgroundColor }, bottomStyle]} />;
  }

  return (
    <View style={[styles.container, style]}>
      {!isHiddenNavBar && renderNavView()}
      <View style={[styles.contentView, { marginTop, backgroundColor }, style, contentViewStyle]}>
        {renderContent()}
        {renderBottom()}
      </View>
      <NavigationEvents
        onWillFocus={onWillFocus}
        onDidFocus={onDidFocus}
        onWillBlur={onWillBlur}
        onDidBlur={onDidBlur}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentView: {
    flex: 1
  }
});

export default BaseContainer;
