/**
 * @flow
 * Created by Rabbit on 2018/5/7.
 */

import React from 'react';
import {
	StyleSheet, View,
} from 'react-native';

import { Button, CustomImage } from '../../../components';
import { System } from '../../../utils';
import { ActionSheet } from 'teaset';
import {observer, inject} from 'mobx-react';
import BaseContainer from '../../../components/BaseContainer';
import {WelfareDetailMobx} from '../../../mobx/News/WelfareDetailMobx';
import RootStore from '../../../store/RootStore';
import {ConfigStore} from '../../../store/ConfigStore';

type Props = {
	navigation: any;
	rootStore: RootStore;
	configStore: ConfigStore;
};

@inject('configStore')
@observer
export class WelfareDetail extends React.Component<Props> {
	welfareDetailMobx: WelfareDetailMobx;
	constructor(props: Props) {
		super(props);
		this.welfareDetailMobx = new WelfareDetailMobx();
	}

	componentDidMount() {

	}


	actionSheetToSaveImage = () => {
		const url = this.props.navigation.state.params.url;
		const items = [
			{
				title: '保存图片', onPress: () => System.iOS
					?
					this.welfareDetailMobx.saveImageWithIOS(url)
					:
					this.welfareDetailMobx.saveImageWithAndroid(url)
			},
			{
				title: '设置主屏幕',
				type: 'default',
				onPress: () => {
					// alert('设置成功');

					this.props.configStore.setParams(url);
				}
			},
		];
		const cancelItem = {title: '取消'};
		ActionSheet.show(items, cancelItem);
	}

	navBarIsVisible = () => {
		// this.props.rootStore.welfareDetailMobx.setHiddenNavBar(!this.props.rootStore.welfareDetailMobx.isHiddenNavBar);

		this.welfareDetailMobx.setHiddenNavBar(!this.welfareDetailMobx.isHiddenNavBar);
	}

	render() {
		const url = this.props.navigation.state.params.url;

		// const { isHiddenNavBar } = this.props.rootStore.welfareDetailMobx;
		const { isHiddenNavBar } = this.welfareDetailMobx;

		return (
			<BaseContainer
				isHiddenNavBar={isHiddenNavBar}
			>
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