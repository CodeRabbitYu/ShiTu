/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { useContext, useEffect } from 'react';

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

const News = observer(function(props) {

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

export { News, Welfare, BuDeJie };
