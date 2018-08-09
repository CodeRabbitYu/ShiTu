/**
 * @flow
 * Created by Rabbit on 2018/5/16.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image, ScrollView, ActivityIndicator,
} from 'react-native';
import {JokeItem} from '../Items/JokeItem';
import {PictureItem} from '../Items/PictureItem';
import {CustomImage, Button} from '../../../../../components/index';
import type {RTBDJList} from '../../../../../servers/News/interfaces';
import {System} from '../../../../../utils/index';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

type Props = {
  itemData: RTBDJList;
  picturePress: Function;
};

@observer
export class ModalView extends React.Component<Props> {


  @observable isVisible: boolean = true;

  setActivityVisible = (isVisible: boolean) => {
  	console.log('isVisible', isVisible);
  	this.isVisible = false;
  }

  renderItem() {
  	const { jokeData, pictureData, type, isLongPicture, cdn_img, imageHeight } = this.props.itemData;
  	/**
     * @desc 全部
     */
  	if (type === '1') {
  		return (
  			<JokeItem jokeData={jokeData}/>
  		);
  	}
  	/**
     * @desc 图片
     */
  	if (type === '10') {
  		if (isLongPicture) {
  			return (
  				<ScrollView>
  					<Button onPress={this.props.picturePress} activeOpacity={1}>
  						<CustomImage source={{uri: cdn_img}}
  							// resizeMode={'contain'}
  							activityVisible={false}
  							onLoadEnd={() => this.setActivityVisible(false)}
  							style={[styles.picture, {height: imageHeight}]}
  						/>
  					</Button>
  				</ScrollView>
  			);
  		} else {
  			return (
  				<Button onPress={this.props.picturePress} activeOpacity={1}>
  					<CustomImage source={{uri: cdn_img}}
  						resizeMode={'contain'}
  						activityVisible={false}
  						onLoadEnd={() => this.setActivityVisible(false)}
  						style={[styles.picture, {height: imageHeight}]}/>
  				</Button>
  			);
  		}
  	}
  	/**
     * @desc 视频
     */
  	if (type === '41') {
  		return (
  			<Button onPress={this.props.picturePress} activeOpacity={1}>
  				<CustomImage source={{uri: cdn_img}}
  					resizeMode={'contain'}
  					style={[styles.picture, {height: imageHeight}]}/>
  			</Button>
  		);
  	}
  }

  render() {
  	return (
  		<View style={styles.container}>
  			{this.renderItem()}
  			<ActivityIndicator size={'large'} animating={this.isVisible} style={styles.activityStyle}/>
  		</View>
  	);
  }
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	picture: {
		width: System.SCREEN_WIDTH,
	},
	activityStyle: {
		position: 'absolute',
	}

});