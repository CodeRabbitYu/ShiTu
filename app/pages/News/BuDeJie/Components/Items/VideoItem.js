/**
 * @flow
 * Created by Rabbit on 2018/8/20.
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { CustomImage, Button } from '../../../../../components';
import type { Picture } from '../../../../../servers/News/interfaces';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  pictureData: Picture,
  videoPress: Function
};
export const VideoItem = (props: Props) => {
  const { cdn_img, imageHeight } = props.pictureData;

  return (
    <Button style={styles.container} onPress={props.videoPress}>
      <View>
        <CustomImage source={{ uri: cdn_img }} style={[styles.picture, { height: imageHeight }]} />
        <View
          style={{
            position: 'absolute',
            left: SCREEN_WIDTH / 2 - 30,
            top: imageHeight / 2 - 30
          }}
        >
          <Icon name={'play-circle'} size={60} color={'white'} />
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: px2dp(20),
    marginVertical: px2dp(10)
  }
});
