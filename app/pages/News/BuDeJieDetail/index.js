/**
 * @flow
 * Created by Rabbit on 2018/5/15.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image, ScrollView,
} from 'react-native';
import type {Picture} from '../../../servers/News/interfaces';

import { CustomImage, Theme } from '../../../components';
import type {NavigationState} from 'react-navigation';
import {System} from '../../../utils';

type Props = {
  pictureData: Picture;
  navigation: NavigationState
}
export class BuDeJieDetail extends React.Component<Props> {

  static navigationOptions = () => {
  	const headerStyle = {
  		backgroundColor: 'black',
  		shadowColor: 'transparent',
  		shadowOpacity: 0,
  		borderBottomWidth: 0,
  		borderBottomColor: 'transparent',
  		elevation: 0,
  	};

  	return { headerStyle };
  }

  renderPicture() {

  	const { cdn_img, isLongPicture, imageHeight } = this.props.navigation.state.params.pictureData;

  	if (isLongPicture) {
  		return (
  			<ScrollView>
  				<CustomImage source={{uri: cdn_img}}
  					// resizeMode={'contain'}
  					style={[styles.picture, {height: imageHeight}]}
  				/>
  			</ScrollView>
  		);
  	} else {
  		return (
  			<CustomImage source={{uri: cdn_img}}
  				resizeMode={'contain'}
  				style={[styles.picture, {height: imageHeight}]}/>
  		);
  	}
  }

  render() {
  	return (
  		<View style={styles.pictureView}>
  			{this.renderPicture()}
  		</View>
  	);
  }
}

const styles = StyleSheet.create({
	pictureView: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
	picture: {
		width: System.SCREEN_WIDTH - 20,
	},
	longPictureSignView: {
		backgroundColor: 'rgba(88, 87, 86, 0.8)',
		height: px2dp(80),
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: System.SCREEN_WIDTH,
	},
	longPictureSignText: {
		fontSize: FONT_SIZE(18),
		color: 'white'
	}
});