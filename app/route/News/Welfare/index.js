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

	actionSheetToSaveImage = (item: RTWeal) => {
		const items = [
			{
				title: '保存图片', onPress: () => System.iOS
					?
					this.welfareMobx.saveImageWithIOS(item.largeUrl)
					:
					this.welfareMobx.saveImageWithAndroid(item.largeUrl)
			},
			{
				title: '设置主屏幕',
				type: 'default',
				onPress: async () => {
					// alert('设置成功');
					await this.props.powerStore.setShiTuBackgroundImage(item.url);
				}
			},
		];
		const cancelItem = {title: '取消'};
		ActionSheet.show(items, cancelItem);
	}


	showPopCustom(item: RTWeal) {

		const overlayView = (
			<Overlay.PopView
				style={{alignItems: 'center', justifyContent: 'center'}}
				overlayOpacity={1}
				type='zoomIn'
				ref={v => this.customPopView = v}
			>
				<Button
					onLongPress={() => this.actionSheetToSaveImage(item)}
					onPress={() => this.customPopView && this.customPopView.close()}>
					<CustomImage source={{uri: item.largeUrl}}
					             resizeMode='cover'
					             style={{backgroundColor: 'white', width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
					/>
				</Button>
			</Overlay.PopView>
		);
		Overlay.show(overlayView);
	}

	renderItem = ({item}: {item: RTWeal, index: number, column: number}) => {
		return (
			<Button
				onPress={() => this.showPopCustom(item)}
			>
				<Image source={{uri: item.url}}
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

		return (
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
			</BaseContainer>
		);
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