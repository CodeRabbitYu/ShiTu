/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import BaseContainer from '../../components/BaseContainer';

// import { observer, inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import { Welfare } from './Welfare';
import { BuDeJie } from './BuDeJie';
// import { BuDeJieDetail } from './BuDeJieDetail';

import type { NavigationState } from 'react-navigation';
import type { RTBuDeJieType } from '../../servers/News';
import { StoreContext } from '../../utils/Tool';
import { BaseItem } from './BuDeJie/Components/BaseItem';
import { BuDeJieMobx } from '../../mobx/News';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

type typeItem = {
  title: string,
  type: RTBuDeJieType | string
};

const typeArr: Array<typeItem> = [
  { title: '全部', type: 1 },
  { title: '视频', type: 41 },
  { title: '图片', type: 10 },
  { title: '笑话', type: 29 },
  { title: '福利', type: '福利' }
];

type State = NavigationState<{
  key: string,
  title: string
}>;

class News extends React.Component<{}, State> {
  static title = 'Scrollable top bar';
  static backgroundColor = '#3f51b5';
  static appbarElevation = 0;

  constructor(props: {}) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'ALL', title: '全部', type: 1 },
        { key: 'VIDEO', title: '视频', type: 41 },
        { key: 'PICTURE', title: '图片', type: 10 },
        { key: 'JOKE', title: '笑话', type: 29 },
        { key: 'WELFARE', title: '福利', type: '福利' }
      ]
    };
  }
  _handleIndexChange = index =>
    this.setState({
      index
    });

  _renderTabBar = props => {
    console.log('props', props);
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
        activeColor={'#4ECBFC'}
        inactiveColor={'black'}
        // renderIndicator={() => (
        //   <View style={{backgroundColor: 'red', height: 1, width: SCREEN_WIDTH / 4 }}/>
        // )}
      />
    );
  };

  // _renderScene = SceneMap({
  //   albums: Welfare,
  //   contacts: BuDeJie,
  //   article: BuDeJie,
  //   chat: BuDeJie
  // });

  _renderScene = ({route, jumpTo}) => {
    // console.log('route', route);
    switch (route.key) {
      case 'WELFARE':
        return <Welfare jumpTo={jumpTo} navigation={this.props.navigation} type={route.type} />;
      default:
        return <BuDeJie jumpTo={jumpTo} navigation={this.props.navigation} type={route.type} />;
      // case 'ALL':
      //   return
      // case 'VIDEO':
      //   return <BuDeJie jumpTo={jumpTo} navigation={this.props.navigation} type={route.type} />;
      // case 'PICTURE':
      //   return <BuDeJie jumpTo={jumpTo} navigation={this.props.navigation} type={route.type} />;
      // case 'JOKE':
      //   return <BuDeJie jumpTo={jumpTo} navigation={this.props.navigation} type={route.type} />;
      //
    }
  };

  render() {
    return (
      <BaseContainer title={'百思不得姐'} isTopNavigator={true}>
        <TabView
          // style={this.props.style}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          lazy={true}
          swipeDistanceThreshold={SCREEN_WIDTH / 10}
          initialLayout={{ width: SCREEN_WIDTH }}
        />
      </BaseContainer>
    );
  }
}

const News1 = observer(function(props) {
  const store = useContext(StoreContext);
  const { configStore, publicStore, shiTuStore } = store;
  const { navigation } = props;

  // console.log('store', store);

  return (
    <BaseContainer title={'百思不得姐'} isTopNavigator={true}>
      <ScrollableTabView
        renderTabBar={() => <DefaultTabBar />}
        // renderTabBar={() => <ScrollableTabView.DefaultTabBar />}
        tabBarActiveTextColor="#4ECBFC"
        tabBarInactiveTextColor="black"
        tabBarBackgroundColor="white"
        tabBarUnderlineStyle={{ backgroundColor: '#4ECBFC', height: 2 }}
        tabBarTextStyle={{ fontSize: 15 }}
      >
        {typeArr.map((item, i) => {
          if (i === 4) {
            return (
              <Welfare
                tabLabel={item.title}
                key={i}
                configStore={configStore}
                publicStore={publicStore}
                shiTuStore={shiTuStore}
              />
            );
          } else {
            return (
              <BuDeJie
                type={item.type}
                tabLabel={item.title}
                key={i}
                navigation={navigation}
                configStore={configStore}
                publicStore={publicStore}
              />
            );
          }
        })}
      </ScrollableTabView>
    </BaseContainer>
  );
});

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: 'white'
  },
  tab: {
    width: SCREEN_WIDTH / 5
  },
  indicator: {
    backgroundColor: '#4ECBFC'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

export { News, Welfare, BuDeJie };
