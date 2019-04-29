/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import BaseContainer from '../../components/BaseContainer';

import { observer, useObserver } from 'mobx-react-lite';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import { Welfare } from './Welfare';
import { BuDeJie } from './BuDeJie';

import { StoreContext } from '../../utils/Tool';

import { TabView, TabBar } from 'react-native-tab-view';

type typeItem = {
  title: string,
  type: string,
  key: number
};

const typeArr: Array<typeItem> = [
  { key: 'ALL', title: '全部', type: 1 },
  { key: 'VIDEO', title: '视频', type: 41 },
  { key: 'PICTURE', title: '图片', type: 10 },
  { key: 'JOKE', title: '笑话', type: 29 },
  { key: 'WELFARE', title: '福利', type: '福利' }
];

const typeData = {
  index: 0,
  routes: typeArr
};

const News = observer(props => {
  const store = useContext(StoreContext);
  const { navigation } = props;
  const { publicStore, shiTuStore } = store;

  const [type, setType] = useState(typeData);

  function _handleIndexChange(index) {
    const _type = {
      index: index,
      routes: typeArr
    };
    setType(_type);
  }

  function _renderTabBar(props) {
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
      />
    );
  }

  function _renderScene({ route, jumpTo }: { route: typeItem, jumpTo: Function }) {
    // console.log('route', route);
    if (route.key === 'WELFARE') {
      return (
        <Welfare
          jumpTo={jumpTo}
          navigation={navigation}
          type={route.type}
          publicStore={publicStore}
          shiTuStore={shiTuStore}
        />
      );
    } else {
      return <BuDeJie jumpTo={jumpTo} navigation={navigation} type={route.type} publicStore={publicStore} />;
    }
  }

  return useObserver(() => (
    <BaseContainer title={'百思不得姐'} isTopNavigator={true}>
      <TabView
        navigationState={type}
        renderScene={_renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={_handleIndexChange}
        lazy={true}
        swipeDistanceThreshold={SCREEN_WIDTH / 10}
        initialLayout={{ width: SCREEN_WIDTH }}
      />
    </BaseContainer>
  ));
});

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
