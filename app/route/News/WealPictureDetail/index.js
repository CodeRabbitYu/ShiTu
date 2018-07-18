/**
 * @flow
 * Created by Rabbit on 2018/5/7.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	CameraRoll
} from 'react-native';

import { Button, CustomImage } from '../../../components';
import { System } from '../../../utils';
import { ActionSheet } from 'teaset';
import {observer} from 'mobx-react';
import BaseContainer from '../../../components/BaseContainer';
import {WealPictureDetailMobx} from '../../../mobx/News/WealPictureDetailMobx';

type Props = {
	navigation: any;
};
type State = {
	isHiddenHeader: boolean
}
@observer
export class WealPictureDetail extends React.Component<Props, State> {
	wealPictureDetailMobx: WealPictureDetailMobx
	constructor(props: Props) {
		super(props);
		this.wealPictureDetailMobx = new WealPictureDetailMobx();
		this.state = {
		};
	}

	static navigationOptions = ({navigation}: any) => {
		return { header: null };
	}

	componentDidMount() {
		console.log(this.props);
		// this.setNavBarHidden(true);
	}


	actionSheetToSaveImage = () => {
		const url = this.props.navigation.state.params.url;
		const items = [
			{
				title: '保存图片', onPress: () => System.iOS
					?
					this.wealPictureDetailMobx.saveImageWithIOS(url)
					:
					this.wealPictureDetailMobx.saveImageWithAndroid(url)
			},
			{
				title: '设置主屏幕',
				type: 'default',
				onPress: () => {
					alert('设置成功');
				}
			},
		];
		const cancelItem = {title: '取消'};
		ActionSheet.show(items, cancelItem);
	}

	navBarIsVisible = () => {
		// this.setState({isHiddenHeader: !this.state.isHiddenHeader});
		this.wealPictureDetailMobx.setHiddenNavBar(!this.wealPictureDetailMobx.isHiddenNavBar);
	}
	//
	// setNavBarHidden = (isHidden: boolean) => {
	// 	console.log(isHidden);
	// 	this.props.navigation.setParams({ isHiddenHeader: isHidden });
	// }

	render() {
		const url = this.props.navigation.state.params.url;

		const { isHiddenNavBar } = this.wealPictureDetailMobx;

		return (
			<BaseContainer isHiddenNavBar={isHiddenNavBar}>
				<Button onLongPress={this.actionSheetToSaveImage}
				        onPress={this.navBarIsVisible}
				        style={{backgroundColor: 'white', flex: 1}}
				        activeOpacity={0.9}
				>
					<CustomImage style={styles.container}
					             source={{uri: url}}
					             resizeMode={'cover'}
					/>
				</Button>
			</BaseContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'red'
		height: System.SCREEN_HEIGHT,
		width: System.SCREEN_WIDTH
	},
});