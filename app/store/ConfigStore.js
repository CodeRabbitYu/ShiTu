/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import { observable, action } from 'mobx';

import { Toast } from 'teaset';
import React from 'react';
import { CustomToast } from '../components';

type ErrorInfo = {
  message: string,
  code: number
};

class ConfigStore {
  @observable
  isError: boolean = false;
  @observable
  isLoading: boolean = false;
  @observable
  errorInfo: ErrorInfo;
  @observable
  loadingType: string;

  static customKey = null;

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
  showToast(text: string) {
    Toast.message(text);
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

}
export { ConfigStore };
