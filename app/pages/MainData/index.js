/**
 * @flow
 * Created by Rabbit on 2018/10/15.
 */

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, RefreshControl } from 'react-native';
import BaseContainer from '../../components/BaseContainer';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Theme } from 'teaset';
import NavigatorBar from '../../components/NavigatorBar';

type Props = {};
export class MainData extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const navHeight = Theme.statusBarHeight + Theme.navBarContentHeight;
    return (
      <BaseContainer style={styles.container} title={'我的资料'} bottomHeight={0}>
        <HeaderImageScrollView
          maxHeight={200}
          minHeight={navHeight}
          fadeOutForeground
          overScrollMode="never"
          overlayColor="red"
          maxOverlayOpacity={0.4}
          renderTouchableFixedForeground={() => (
            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => console.log('tap!!')} style={styles.button}>
                <Text style={styles.buttonText}>Click Me!</Text>
              </TouchableOpacity>
            </View>
          )}
          scrollViewBackgroundColor="#ddddff"
          refreshControl={
            <RefreshControl
              refreshing={false}
              // onRefresh={this._onRefresh.bind(this)}
              tintColor="red"
            />
          }
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>Cat</Text>
            </View>
          )}
          foregroundParallaxRatio={1}
        >
          <View style={{ height: 100, backgroundColor: '#4CAF50' }} />
          <View style={{ height: 100, backgroundColor: '#F44336' }} />
          <View style={{ height: 100, backgroundColor: '#009688' }} />
          <View style={{ height: 100, backgroundColor: '#03A9F4' }} />
          <View style={{ height: 100, backgroundColor: '#FF9800' }} />
          <View style={{ height: 100, backgroundColor: '#673AB7' }} />
          <View style={{ height: 100, backgroundColor: '#795548' }} />
          <View style={{ height: 100, backgroundColor: '#FFEB3B' }} />
        </HeaderImageScrollView>
      </BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24
  }
});
