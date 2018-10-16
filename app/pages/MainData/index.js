/**
 * @flow
 * Created by Rabbit on 2018/10/15.
 */

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import BaseContainer from '../../components/BaseContainer';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

type Props = {};
export class MainData extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderImageScrollView
          maxHeight={300}
          minHeight={80}
          fadeOutForeground
          overScrollMode="never"
          overlayColor="#4A148C"
          maxOverlayOpacity={0.9}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>Cat</Text>
            </View>
          )}
          foregroundParallaxRatio={3}
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
      </View>
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
