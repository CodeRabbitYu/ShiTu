/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import { observable, action } from 'mobx';
import { AsyncStorage } from 'react-native';

import { Toast, Theme } from 'teaset';
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

  @action.bound
  async fetchStartUp() {
    const getToken = await AsyncStorage.getItem('User');
    console.log('存在Token', getToken);
    try {
      // const responseData: responseType = await fetchUserData();
      //
      // const data = responseData.data;
      //
      // const session = data.session;
      // console.log('data', data);
      //
      // if (!getToken || getToken === null || getToken === 'null') {
      // 	await AsyncStorage.setItem('Session', session);
      // 	console.log('不存在Token', session, data);
      // 	// if (getSession) alert('不存在');
      // }
    } catch (e) {}
  }
}
export { ConfigStore };
