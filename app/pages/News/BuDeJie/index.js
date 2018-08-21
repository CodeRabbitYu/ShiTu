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
	FlatList,
	Modal,
	ActivityIndicator
} from 'react-native';

import { TableList, BaseContainer } from '../../../components';
import type {RTBDJList, RTWeal} from '../../../servers/News/interfaces';
import { BuDeJieMobx } from '../../../mobx/News/BuDeJieMobx';
import { observer } from 'mobx-react';
import { BaseItem } from './Components';
import type {NavigationState} from 'react-navigation';
import { Overlay } from 'teaset';
import { Button, CustomImage } from '../../../components';

import {Picture} from '../../../servers/News/interfaces';

type Props = {
	type: number;
	navigate: NavigationState
};

@observer
export class BuDeJie extends React.Component<Props, any> {

	buDeJieMobx: BuDeJieMobx;

	constructor(props: Props) {
		super(props);
		this.buDeJieMobx = new BuDeJieMobx();
	}

	onFetch = async ( value: any = this.buDeJieMobx.maxtime, startFetch: Function, abortFetch: Function) => {
		try {
			await this.buDeJieMobx.fetchBuDeJieData(this.props.type, value);
			startFetch(this.buDeJieMobx.dataSource.slice(), 20);
		} catch (e) {
			abortFetch();
			console.log(e);
		}
	}

	picturePress = (item: Picture) => {

		if (item.isLongPicture || item.is_gif) {
			this.props.navigate('WebView', {uri: item.weixin_url});
		} else {
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
						<Image source={{uri: item.cdn_img}}
							// resizeMode='cover'
							     style={{backgroundColor: 'white', width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
						/>
					</Button>
				</Overlay.PopView>
			);
			Overlay.show(overlayView);
		}
	}

	videoPress = (item: Picture) => {
		this.props.navigate('WebView', {uri: item.weixin_url});
	}

	renderItem = ( {item}: {item: RTBDJList, index: number} ) => {
		const { navigate } = this.props;
		return (
			<BaseItem itemData={item}
			          navigate={navigate}
			          itemPress={() => {
				          alert(item.text);
			          }}
			          picturePress={() => this.picturePress(item)}
			          videoPress={() => this.videoPress(item)}
			/>
		);
	}

	render() {
		return (
			<BaseContainer store={this.buDeJieMobx}
			               isHiddenNavBar={true}
			>
				<TableList
					style={{backgroundColor: 'white'}}
					onFetch={this.onFetch}
					renderItem={this.renderItem}
					keyExtractor={(item) => item.id}
					initialNumToRender={10}
					paginationType={'value'}
				/>
			</BaseContainer>

		);
	}
}
