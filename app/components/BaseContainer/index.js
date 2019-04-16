/**
 * @flow
 * Created by Rabbit on 2018/6/27.
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { observer } from 'mobx-react';
import { NavigationEvents } from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';
import type { ConnectionType } from '@react-native-community/netinfo';

import { NavigatorBar, LoadingSpinner, ErrorView } from '../index';
import { Theme } from 'teaset';
import { ConfigStore } from '../../store/ConfigStore';

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

type State = {
  netInfo: NetType // 网络状态
};

@observer
class BaseContainer extends Component<Props, State> {
  netInfoListen: any;
  componentWillUnmount() {
    this.props.store && this.props.store.hideLoading();
    this.netInfoListen && NetInfo.removeEventListener('connectionChange', this.networkHandle);
  }

  componentDidMount = async () => {
    // // 添加网络获取判断
    NetInfo.getConnectionInfo().then(this.networkHandle);
    // 添加网络监听
    if (this.netInfoListen) {
      NetInfo.removeEventListener('connectionChange', this.networkHandle);
    } else {
      this.netInfoListen = NetInfo.addEventListener('connectionChange', this.networkHandle);
    }
  };

  networkHandle = (netInfo: any) => {
    const { netInfoCallBack } = this.props;
    const network: NetType = this.getNetInfoStatus(netInfo);

    const { store } = this.props;
    store && store.setNetInfo(network);
    netInfoCallBack && netInfoCallBack(network);
  };

  getNetInfoStatus = (netInfo: any) => {
    const type: ConnectionType = netInfo.type;
    return {
      isConnect: type.toUpperCase() === 'WIFI' || type.toUpperCase() === 'CELLULAR',
      isWifi: type.toUpperCase() === 'WIFI',
      isCellular: type.toUpperCase() === 'CELLULAR'
    };
  };

  renderContent() {
    const { store, children, onErrorPress, errorTitle, imageSource, errorStyle } = this.props;
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
          title={errorInfo.message}
          onErrorPress={onErrorPress}
        />
      );
    return children;
  }

  renderNavView() {
    const { navBar, isTopNavigator, navStyle, ...navProps } = this.props;
    let navView = null;
    if (typeof navBar === 'undefined') {
      navView = <NavigatorBar {...navProps} style={navStyle} isTopNavigator={isTopNavigator} />;
    } else {
      navView = navBar;
    }
    return navView;
  }

  renderBottom() {
    const { bottomStyle, bottomBackgroundColor, bottomHeight = 39, isTopNavigator } = this.props;

    const backgroundColor = bottomBackgroundColor ? bottomBackgroundColor : 'white';
    const height = !isTopNavigator && Theme.isIPhoneX ? bottomHeight : 0;
    return <View style={[{ height, backgroundColor }, bottomStyle]} />;
  }

  render() {
    const {
      style,
      contentViewStyle,
      isTopNavigator,
      isHiddenNavBar,
      onWillFocus,
      onDidFocus,
      onWillBlur,
      onDidBlur
    } = this.props;

    const backgroundColor = !isTopNavigator && Theme.isIPhoneX ? 'white' : null;
    const marginTop = !isHiddenNavBar ? Theme.statusBarHeight + Theme.navBarContentHeight : 0;

    return (
      <View style={[styles.container, style]}>
        {!isHiddenNavBar && this.renderNavView()}
        <View style={[styles.contentView, { marginTop, backgroundColor }, style, contentViewStyle]}>
          {this.renderContent()}
          {this.renderBottom()}
        </View>
        <NavigationEvents
          onWillFocus={onWillFocus}
          onDidFocus={onDidFocus}
          onWillBlur={onWillBlur}
          onDidBlur={onDidBlur}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentView: {
    flex: 1
  }
});

export default BaseContainer;
