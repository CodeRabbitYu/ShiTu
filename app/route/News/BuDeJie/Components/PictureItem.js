/**
 * @flow
 * Created by Rabbit on 2018/5/14.
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {FastImage} from '../../../../components';
import { System }  from "../../../../utils";
import type {Picture} from "../../../../servers/News/interfaces";

type Props = {
  pictureData: Picture;
}

export class PictureItem extends React.PureComponent<Props> {
  
  renderPicture() {
    const { cdn_img, isLongPicture, imageHeight } = this.props.pictureData;

    if (isLongPicture) {
      return (
        <View>
          <Image source={{uri: cdn_img}}
                     // resizeMode={'contain'}
                     style={[styles.picture, {height: imageHeight}]}
          />
          <View style={styles.longPictureSignView}>
            <Text style={styles.longPictureSignText}>点击查看原图</Text>
          </View>
        </View>
      )
    } else {
      return (
        <FastImage source={{uri: cdn_img}}
                   style={[styles.picture, {height: imageHeight}]}/>
      )
    }
  }

  render() {
    const { text } = this.props.pictureData;
    return(
      <View style={styles.pictureView}>
        <Text style={styles.jokeText}>{text}</Text>
        {this.renderPicture()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pictureView: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  jokeText: {
    lineHeight: 22,
    fontSize: 17,
  },
  picture: {
    width: System.SCREEN_WIDTH - 20,
    marginTop: 5,
  },
  longPictureSignView: {
    backgroundColor:'rgba(88, 87, 86, 0.8)',
    height: 40,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: System.SCREEN_WIDTH,
  },
  longPictureSignText: {
    fontSize: 18,
    color: 'white'
  }
});