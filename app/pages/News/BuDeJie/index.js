/**
 * @flow
 * Created by Rabbit on 2019-03-05.
 */

import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

import BaseContainer from '../../../components/BaseContainer';

import type { RTBDJList, RTWeal } from '../../../servers/News/interfaces';
import { BuDeJieMobx } from '../../../mobx/News/BuDeJieMobx';
import { observer, useObservable } from 'mobx-react-lite';
import { BaseItem } from './Components/BaseItem';
import type { NavigationState } from 'react-navigation';
import { ActionSheet, Overlay } from 'teaset';
import { Button, CustomImage } from '../../../components';

import { Picture } from '../../../servers/News/interfaces';
import PlaceholderView from './Components/Views/PlaceholderView';
import type { RTBuDeJieType } from '../../../servers/News';

import { LargeList, WaterfallList } from 'react-native-largelist-v3';
import { System } from '../../../utils';
import { PublicStore } from '../../../store/PublicStore';
// import { ChineseWithLastDateFooter } from 'react-native-spring-scrollview/Customize';

type Props = {
  type: RTBuDeJieType | string,
  navigation: NavigationState,
  publicStore: PublicStore
};

function actionSheetToSaveImage(url: string, props: Props) {
  const { saveImageWithIOS, saveImageWithAndroid } = props.publicStore;
  const items = [
    {
      title: '保存图片',
      onPress: () => (System.iOS ? saveImageWithIOS(url) : saveImageWithAndroid(url))
    }
  ];
  const cancelItem = { title: '取消' };
  ActionSheet.show(items, cancelItem);
}
const BuDeJie = observer(function(props: Props) {
  const { navigation, type } = props;
  const buDeJieMobx = useObservable(new BuDeJieMobx());
  const { largeListData, maxtime = '', fetchBuDeJieData } = buDeJieMobx;

  const waterfallRef: WaterfallList = useRef();
  const customOverlayRef: Overlay = useRef();

  useEffect(() => {
    fetchBuDeJieData(type, '');
  }, []);

  function picturePress(item: Picture, props: Props) {
    if (item.isLongPicture || !item.is_gif) {
      navigation.navigate('WebView', { uri: item.weixin_url });
    } else {

      const height = isIPhoneX ? SCREEN_HEIGHT - 44 - 49 : SCREEN_HEIGHT;

      const overlayView = (
        <Overlay.PopView
          style={{ alignItems: 'center', justifyContent: 'center' }}
          overlayOpacity={1}
          ref={customOverlayRef}
        >
          <Button
            onPress={() => customOverlayRef && customOverlayRef.current.close()}
            onLongPress={() => actionSheetToSaveImage(item.cdn_img, props)}
          >
            <CustomImage
              source={{ uri: item.cdn_img }}
              resizeMode={'contain'}
              style={{
                backgroundColor: 'black',
                width: SCREEN_WIDTH,
                height: height
              }}
            />
          </Button>
        </Overlay.PopView>
      );
      Overlay.show(overlayView);
    }
  }

  function videoPress(item: Picture) {
    navigation.navigate('WebView', { uri: item.weixin_url });
  }

  function renderItem({ section, row }: { section: number, row: number }) {
    const item = largeListData[section].items[row];
    return (
      <BaseItem
        itemData={item}
        itemPress={() => {
          alert(item.text);
        }}
        picturePress={() => picturePress(item, props)}
        videoPress={() => videoPress(item)}
      />
    );
  }

  return (
    <BaseContainer isHiddenNavBar={true} isTopNavigator={true} store={buDeJieMobx}>
      <LargeList
        style={styles.container}
        data={largeListData}
        ref={waterfallRef}
        heightForIndexPath={({ section, row }: { section: number, row: number }) => {
          const item: RTBDJList = largeListData[section].items[row];
          return item.itemHeight;
        }}
        renderIndexPath={renderItem}
        onRefresh={async () => {
          await fetchBuDeJieData(type, '');
          waterfallRef.current.endRefresh();
        }}
        // loadingFooter={ChineseWithLastDateFooter}
        onLoading={async () => {
          await fetchBuDeJieData(type, maxtime);
          waterfallRef.current.endLoading();
        }}
      />
    </BaseContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#EEE'
  }
});

export { BuDeJie };
