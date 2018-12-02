/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  BackHandler,
  DeviceEventEmitter
} from 'react-native';

import { Button, GradientButton, PopoverPickerViewItem } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Label, ListRow, PopoverPicker, Badge } from 'teaset';
import BaseContainer from '../../components/BaseContainer';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

type Props = {
  navigation: any,
  defaultValue: string
};

export class Main extends Component<Props, any> {
  items: Array<any>;
  popView: any;
  badgeNumber: number = 10;

  // static navigationOptions = ({ navigation }: { navigation: any }) => {
  //   const badgeNumber = navigation.state.params && navigation.state.params.badgeNumber;
  //
  //   const tabBarButtonComponent = (props: any) => {
  //     console.log('tabBarButtonComponent', props);
  //     return [
  //       <TouchableOpacity {...props} activeOpacity={1} style={{ width: SCREEN_WIDTH / 3 }} key={'tabBar'} />,
  //       <Badge
  //         count={badgeNumber}
  //         key={'Badge'}
  //         style={{ position: 'absolute', left: SCREEN_WIDTH - 60, top: 5 }}
  //       />
  //     ];
  //   };
  //   return { tabBarButtonComponent };
  // };

  static navigationOptions = {};

  constructor(props: Props) {
    super(props);
    PopoverPicker.PopoverPickerView.Item = PopoverPickerViewItem;
    this.items = ['扫一扫', '加好友/群', '首付款', '高能舞室'];

    this.state = {
      selectedIndex: null,
      modalSelectedIndex: null
    };
  }

  onBackButtonPressAndroid = () => {
    return true;
  };

  login = (type: string) => {
    if (type === 'router') {
      this.props.navigation.navigate('AuthRouter', { type });
    } else {
      this.props.navigation.navigate('Login', { type });
    }
  };

  openModalPress = (popView: any) => {
    const blackStyle = {
      backgroundColor: '#fff',
      paddingLeft: 12,
      paddingRight: 12
    };

    popView.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        { x: pageX + 1, y: pageY, width, height },
        this.items,
        this.state.modalSelectedIndex,
        (item, index) => this.setState({ modalSelectedIndex: index }),
        {
          showArrow: true,
          align: 'end',
          popoverStyle: blackStyle,
          overlayOpacity: 0.3,
          directionInsets: -3
        }
      );
    });
  };

  renderRightView = () => {
    return (
      <Button onPress={() => this.openModalPress(this.popView)}>
        <View ref={e => (this.popView = e)} style={{ marginRight: px2dp(20) }}>
          <Icon name={'md-add'} size={30} color={'white'} />
        </View>
      </Button>
    );
  };

  addBadgeNumber = () => {
    DeviceEventEmitter.emit('badgeNumber', this.badgeNumber++);
  };

  render() {
    return (
      <BaseContainer
        style={styles.container}
        isTopNavigator={true}
        title={'我的'}
        rightView={this.renderRightView()}
        onWillBlur={payload => {
          BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
          console.log('Main页面将要失去焦点', payload);
        }}
        onDidBlur={payload => {
          console.log('Main页面已经失去焦点', payload);
        }}
        onWillFocus={payload => {
          console.log('Main页面将要获得焦点', payload);
        }}
        onDidFocus={payload => {
          BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
          console.log('Main页面已经获得焦点', payload);
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <GradientButton
            title={'切换路由的登录方式'}
            onPress={() => this.login('router')}
            gradientStyle={styles.gradientStyle}
            titleStyle={styles.btnTitleStyle}
            btnStyle={styles.btnStyle}
          />
          <GradientButton
            title={'直接跳转的登录方式'}
            onPress={() => this.login('navigate')}
            gradientStyle={styles.gradientStyle}
            titleStyle={styles.btnTitleStyle}
            btnStyle={styles.btnStyle}
          />
          <GradientButton
            title={'添加通知数量'}
            onPress={this.addBadgeNumber}
            gradientStyle={styles.gradientStyle}
            titleStyle={styles.btnTitleStyle}
            btnStyle={styles.btnStyle}
          />
          <GradientButton
            title={'我的资料'}
            onPress={() => this.props.navigation.navigate('MainData')}
            gradientStyle={styles.gradientStyle}
            titleStyle={styles.btnTitleStyle}
            btnStyle={styles.btnStyle}
          />
        </View>

        <TextInput style={{ backgroundColor: 'red', height: 44 }} />
      </BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradientStyle: {
    borderRadius: 10,
    marginTop: 10
  },
  btnStyle: {
    height: 44,
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTitleStyle: {
    color: 'white'
  }
});
