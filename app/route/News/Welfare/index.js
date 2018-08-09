/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ActivityIndicator,
	Modal, TouchableWithoutFeedback
} from 'react-native';
import { MasonryList, BaseContainer } from '../../../components';

import { WelfareMobx } from '../../../mobx/News';

import { observer} from 'mobx-react';
import { Button, CustomImage } from '../../../components';
import type {NavigationState} from 'react-navigation';
import {RTWeal} from '../../../servers/News/interfaces';
import {System} from '../../../utils';
import {ActionSheet, Overlay} from 'teaset';
import {inject} from 'mobx-react';
import {PowerStore} from '../../../store/PowerStore';

type Props = {
	navigate: NavigationState;
	powerStore: PowerStore;
};

@inject('powerStore')
@observer
export class Welfare extends React.Component<Props> {

	welfareMobx: WelfareMobx;

	constructor(props: Props) {
		super(props);
		this.welfareMobx = new WelfareMobx();
	}

	async componentDidMount() {
		await this.welfareMobx.fetchWelfareData(1);
	}

	setModalViewData = (isModalVisible, url, largeUrl) => {
		this.welfareMobx.setModalViewData(isModalVisible, url, largeUrl);
	}

	actionSheetToSaveImage = () => {
		const { imageUrl } = this.welfareMobx;

		const items = [
			{
				title: '保存图片', onPress: () => System.iOS
					?
					this.welfareMobx.saveImageWithIOS(imageUrl)
					:
					this.welfareMobx.saveImageWithAndroid(imageUrl)
			},
			{
				title: '设置主屏幕',
				type: 'default',
				onPress: async () => {
					// alert('设置成功');
					await this.props.powerStore.setShiTuBackgroundImage(imageUrl);
				}
			},
		];
		const cancelItem = {title: '取消'};
		ActionSheet.show(items, cancelItem);
	}


	showPopCustom(imageSource, fromView) {


		console.log('sssssssssss', fromView);

		fromView.measure((x, y, width, height, pageX, pageY) => {
			const overlayView = (
				<Overlay.PopView
					style={{alignItems: 'center', justifyContent: 'center'}}
					overlayOpacity={1}
					type='custom'
					animated={false}
					customBounds={{x: pageX, y: pageY, width, height}}
					ref={v => this.customPopView = v}
				>
					<TouchableWithoutFeedback
						onLongPress={this.actionSheetToSaveImage}
						onPress={() => this.customPopView && this.customPopView.close()}>
						<CustomImage source={{uri: imageSource}} resizeMode='cover' style={{backgroundColor: 'red', width: SCREEN_WIDTH, height: SCREEN_HEIGHT
						}}/>
					</TouchableWithoutFeedback>
				</Overlay.PopView>
			);
			Overlay.show(overlayView);
		});
	}

	renderItem = ({item}: {item: RTWeal, index: number, column: number}) => {
		return (
			<Button
				// onPress={() => this.props.navigate('WelfareDetail', {url: item.url, largeUrl: item.largeUrl})}

				onPress={() => this.showPopCustom(item.url, this.itemImage)}
				// onPress={() => this.setModalViewData(true, item.url, item.largeUrl)}
			>
				<Image source={{uri: item.url}}
				       ref={v => this.itemImage = v}
				             style={[
					             styles.cell,
					             { height: item.height, backgroundColor: 'white'},
				             ]}
				/>
			</Button>
		);
	}

	renderFooterComponent = () => {
		const { isRefreshing } = this.welfareMobx;
		return (
			!isRefreshing &&
			<View style={{height: 50, flex: 1,  alignItems: 'center', justifyContent: 'center'}}>
				<ActivityIndicator size={'small'}/>
			</View>
		);
	}

	render() {

		const { dataSource, isRefreshing, refreshData, loadMoreData } = this.welfareMobx;

		return [
			<BaseContainer key={'base'}
			               isHiddenNavBar={true}
			               store={this.welfareMobx}
			>
				<MasonryList
					onRefresh={refreshData}
					style={{backgroundColor: 'white'}}
					refreshing={isRefreshing}
					data={dataSource.slice()}
					renderItem={this.renderItem}
					getHeightForItem={({ item }) => item.height + 2}
					numColumns={2}
					initialNumToRender={10}
					keyExtractor={item => item._id}
					ListEmptyComponent={() => <View/>}
					ListHeaderComponent={() => <View/>}
					ListFooterComponent={this.renderFooterComponent}
					onEndReachedThreshold={0.1}
					onEndReached={loadMoreData}
				/>
			</BaseContainer>,
			<Modal key={'Modal'}
			       animationType={'fade'}
			       visible={this.welfareMobx.isModalVisible}
			>

				<Button onLongPress={this.actionSheetToSaveImage}
				        onPress={() => this.setModalViewData(false, '', '')}
				        style={{backgroundColor: 'white', flex: 1}}
				        activeOpacity={0.9}
				>
					<CustomImage style={styles.container}
					             source={{uri: this.welfareMobx.imageLargeUrl}}
					             resizeMode={'cover'}
					/>
				</Button>

			</Modal>
		];
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cell: {
		margin: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});