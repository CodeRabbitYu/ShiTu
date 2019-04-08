/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import { observable, action, runInAction } from 'mobx';

import { Toast } from 'teaset';
import React from 'react';
import { CustomToast } from '../components';

type ErrorInfo = {
  message: string,
  code: number
};

export type NetType = {
  isConnect: boolean, // 是否连接网络
  isWifi: boolean, // 是否是wifi连接
  isCellular: boolean // 是否是流量连接
};

class ConfigStore {
  static customKey = null;

  @observable isError: boolean = false;
  @observable isLoading: boolean = false;
  @observable isNetError: boolean = false;
  @observable errorInfo: ErrorInfo;
  @observable loadingType: string;
  @observable netInfo: NetType = {};

  @action.bound
  setNetInfo(netInfo: NetType) {
    runInAction(() => {
      this.netInfo = netInfo;
    });
  }

  @action.bound
  showLoading(text?: string) {
    if (ConfigStore.customKey) return;
    ConfigStore.customKey = Toast.show({
      text: text,
      icon: <CustomToast />,
      position: 'center',
      duration: 1000000
    });
  }

  @action.bound
  hideLoading() {
    if (!ConfigStore.customKey) return;
    Toast.hide(ConfigStore.customKey);
    ConfigStore.customKey = null;
  }

  @action.bound
  showToast(text: string, duration?: number, position?: string) {
    Toast.message(text, duration, position);
  }

  @action.bound
  hideToast() {
    if (!ConfigStore.customKey) return;
    Toast.hide(ConfigStore.customKey);
    ConfigStore.customKey = null;
  }

  @action.bound
  showErrorView(e: ErrorInfo) {
    this.isError = true;
    this.errorInfo = e;
  }

  @action.bound
  hideErrorView() {
    this.isError = false;
  }

  @action.bound
  showNetErrorView() {
    this.isNetError = true;
  }

  @action.bound
  hideNetErrorView() {
    this.isNetError = false;
  }
}
export { ConfigStore };
