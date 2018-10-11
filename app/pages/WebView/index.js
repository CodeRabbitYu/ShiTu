/**
 * @flow
 * Created by Rabbit on 2018/6/19.
 */

import React from 'react';
import { StyleSheet, Text, View, Image, WebView, Alert } from 'react-native';
import { ProgressBar, Button } from '../../components';
import { System } from '../../utils';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from 'teaset';
import BaseContainer from '../../components/BaseContainer';
import { inject } from 'mobx-react';

type Props = {
  uri?: string,
  navigation: any,
  configStore: any
};

type State = {
  active: boolean,
  uri: string,
  isGoBack: boolean,
  isForWard: boolean
};

@inject('configStore')
export default class index extends React.Component<Props, State> {
  webView: WebView;

  constructor(props: Props) {
    super(props);

    const { uri } = this.props.navigation.state.params;
    this.state = {
      active: false,
      isGoBack: false,
      isForWard: false,
      uri: uri
    };
  }

  componentWillUnmount() {
    this.props.configStore.hideLoading();
  }

  reload = () => {
    console.log('刷新');
    this.webView.reload();
  };
  goForward = () => {
    console.log('去前面的页面');
    this.state.isForWard ? this.webView.goForward() : null;
  };

  goBack = () => {
    console.log('返回上级页面');
    this.state.isGoBack ? this.webView.goBack() : null;
  };

  close = () => {
    console.log('关闭');
    const { goBack } = this.props.navigation;
    goBack();
  };

  onShouldStartLoadWithRequest = (data: any) => {
    console.log('_onShouldStartLoadWithRequest', data);
    // return true;
  };

  onNavigationStateChange = (navState: any) => {
    // console.log(navState);
    // 可以跳转新页面，但这个只是测试代码
    // if(navState.url !== this.state.url){
    //     // this.props.navigation.navigate('')
    //     this.props.navigation.navigate('WebViewDetail', {
    //         data: navState.url,
    //         isVisible: true
    //     });
    // }

    console.log('onNavigationStateChange');
    this.setState({
      isGoBack: navState.canGoBack,
      isForWard: navState.canGoForward,
      uri: navState.url
    });
  };

  renderError = () => {
    return (
      <Button onPress={this.reload}>
        <Text>出错啦！请点击刷新页面</Text>
      </Button>
    );
  };

  onLoad = () => {
    console.log('加载中');
  };
  onLoadEnd = () => {
    console.log('加载结束，成功或失败都会走到这里');
    this.props.configStore.hideLoading();
  };
  onLoadStart = () => {
    console.log('开始加载');
    this.props.configStore.showLoading();
  };
  onError = () => {
    this.props.configStore.hideLoading();
    Alert.alert(
      '加载失败',
      null,
      [
        {
          text: '取消',
          onPress: () => this.props.navigation.goBack(),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  };

  renderActionButton = () => {
    return (
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        // 是否自动打开
        // 						active={System.iOS ? false : this.state.active}
        active={false}
        // 是否展示阴影
        // 						hideShadow={System.iOS ? true : true}
        position="right"
        spacing={10}
        offsetY={isIPhoneX ? 34 + 44 : 44}
        // offsetX={10}
        size={50}
        backdrop={false}
        degrees={90}
        // outRangeScale={1}
        autoInactive={false}
      >
        <ActionButton.Item
          buttonColor={'#F8D168'}
          style={styles.actionItemStyle}
          size={40}
          hideShadow={false}
          onPress={this.reload}
        >
          <Icon name="ios-refresh" style={[styles.actionButtonIcon, { fontSize: 20 }]} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={this.state.isForWard ? '#1abc9c' : '#dddddd'}
          onPress={this.goForward}
          size={40}
          // hideShadow={false}
          style={styles.actionItemStyle}
        >
          <Icon name="ios-arrow-forward" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={this.state.isGoBack ? '#3498db' : '#dddddd'}
          onPress={this.goBack}
          size={40}
          style={styles.actionItemStyle}
        >
          <Icon name="ios-arrow-back" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor={'#9b59b6'} onPress={this.close} size={40} style={styles.actionItemStyle}>
          <Icon name="md-close-circle" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  };

  render() {
    return (
      <BaseContainer style={styles.container} bottomHeight={10}>
        <WebView
          ref={ref => (this.webView = ref)}
          style={styles.webView}
          source={{ uri: this.state.uri }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={false}
          onNavigationStateChange={this.onNavigationStateChange}
          // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          renderError={this.renderError}
          onLoad={this.onLoad}
          onLoadEnd={this.onLoadEnd}
          onLoadStart={this.onLoadStart}
          onError={this.onError}
        />

        {this.renderActionButton()}
      </BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: System.SCREEN_HEIGHT,
    width: System.SCREEN_WIDTH
  },
  webView: {
    height: System.SCREEN_HEIGHT,
    width: System.SCREEN_WIDTH,
    // marginTop: 0,
    backgroundColor: 'white'
    // marginBottom:40,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 20,
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center'
  },
  actionItemStyle: {
    height: 20,
    width: 20
  },
  bottomViewStyle: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    width: System.SCREEN_WIDTH,
    flexDirection: 'row',
    flex: 1
  },
  bottomButtonStyle: {
    width: System.SCREEN_WIDTH / 4,
    height: 40
  },
  bottomIconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5
  }
});
