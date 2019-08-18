/**
 * @flow
 * Created by Rabbit on 2018/5/14.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomImage, Button } from '../../../../../components';
import { System } from '../../../../../utils';
import type { Picture } from '../../../../../servers/News/interfaces';

type Props = {
  pictureData: Picture,
  picturePress: Function
};
// https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png

const renderPicture = (props: Props) => {
  const {
    cdn_img,
    isLongPicture,
    imageHeight,
    is_gif,
    gifFistFrame,
    isLongPictureCanOpened,
  } = props.pictureData;

  const isLongPictureCanOpenedAndNoGif = isLongPictureCanOpened && is_gif === '0';

  if (isLongPicture) {
    if (isLongPictureCanOpenedAndNoGif) {
      return (
        <View>
          <CustomImage
            source={{ uri: cdn_img }}
            resizeMode={'cover'}
            style={[styles.picture, { height: imageHeight }]}
          />
          <View style={styles.longPictureSignView}>
            <Text style={styles.longPictureSignText}>点击查看原图</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.promptView}>
          <Text style={styles.promptTitle}>图片可能过长哦，请点击查看原图</Text>
          <View style={styles.longPictureSignView}>
            <Text style={styles.longPictureSignText}>点击查看原图</Text>
          </View>
        </View>
      );
    }
  } else if (is_gif === '1') {
    return (
      <CustomImage
        source={{ uri: gifFistFrame }}
        resizeMode={'contain'}
        style={[styles.picture, { height: imageHeight }]}
        // onLoadEnd={() => this.gifError = false}
        // onError={() => this.gifError = true}
      />
    );
  } else {
    return (
      <CustomImage
        source={{ uri: cdn_img }}
        // resizeMode={'contain'}
        style={[styles.picture, { height: imageHeight }]}
      />
    );
  }
};

const GifSignView = () => {
  return (
    <View style={styles.gifView}>
      <Text style={styles.gifText}>GIF图</Text>
    </View>
  );
};

export const PictureItem = (props: Props) => {
  const { is_gif } = props.pictureData;

  return (
    <Button style={styles.pictureView} onPress={props.picturePress}>
      <View>
        {renderPicture(props)}
        {is_gif === '1' && <GifSignView />}
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  gifView: {
    borderRadius: px2dp(30),
    height: px2dp(50),
    width: px2dp(100),
    position: 'absolute',
    top: px2dp(20),
    right: px2dp(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  gifText: {
    color: 'white',
    fontSize: FONT_SIZE(14),
    fontWeight: 'bold'
  },
  pictureView: {
    paddingHorizontal: px2dp(20)
    // backgroundColor: 'green'
    // paddingVertical: px2dp(10)
  },
  picture: {
    width: System.SCREEN_WIDTH - px2dp(40)
  },
  promptView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: px2dp(600),
    height: System.SCREEN_HEIGHT * 0.5
  },
  promptTitle: {
    fontSize: FONT_SIZE(20)
  },
  longPictureSignView: {
    backgroundColor: 'rgba(88, 87, 86, 0.8)',
    height: px2dp(80),
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: System.SCREEN_WIDTH - px2dp(40)
  },
  longPictureSignText: {
    fontSize: FONT_SIZE(18),
    color: 'white'
  }
});
