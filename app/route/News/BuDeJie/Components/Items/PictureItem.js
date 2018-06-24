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
  ActivityIndicator,
  AccessibilityInfo
} from 'react-native';
import {CustomImage,Button} from '../../../../../components/index';
import { System }  from "../../../../../utils";
import type {Picture} from "../../../../../servers/News/interfaces";

type Props = {
  pictureData: Picture;
  picturePress: Function;
}


const renderPicture = (props: Props) => {
	const { cdn_img, isLongPicture, containerHeight } = props.pictureData;
	if (isLongPicture && containerHeight < 10000) {
		return (
			<View>
				<Image source={{uri: cdn_img}}
										 useCustomImage={true}
										 resizeMode={'cover'}
										 style={[styles.picture, {height: System.SCREEN_HEIGHT * 0.5}]}
				/>
				<View style={styles.longPictureSignView}>
					<Text style={styles.longPictureSignText}>点击查看原图</Text>
				</View>
			</View>
		)
	} else if (containerHeight > 10000) {
		return (
			<View style={styles.promptView}>
				<Text style={styles.promptTitle}>图片可能过大哦，请查看原图</Text>
				<View style={styles.longPictureSignView}>
					<Text style={styles.longPictureSignText}>点击查看原图</Text>
				</View>
			</View>
		)
	} else {
		return (
			<CustomImage source={{uri: cdn_img}}
									 resizeMode={'contain'}
									 style={[styles.picture, {height: containerHeight}]}/>
		)
	}
}

export const PictureItem = (props: Props) => {

	return(
      <Button style={styles.pictureView} onPress={props.picturePress}>
        {renderPicture(props)}
      </Button>
    )
}

const styles = StyleSheet.create({
  pictureView: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  picture: {
    width: System.SCREEN_WIDTH - 20,
  },
	promptView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 300
	},
	promptTitle:{
		fontSize: 20,
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