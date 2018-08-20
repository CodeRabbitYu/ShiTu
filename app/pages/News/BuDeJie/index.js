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

import {loadBuDeJieData, loadWealPictureData} from '../../../servers/News';
import { TableList, BaseContainer } from '../../../components';
import type {RTBDJList, RTWeal} from '../../../servers/News/interfaces';
import { BuDeJieMobx } from '../../../mobx/News/BuDeJieMobx';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { BaseItem } from './Components';
import type {NavigationState} from 'react-navigation';
import {ContainerItem} from './Components/Items/ContainerItem';
import {ModalView} from './Components/Views/ModalView';

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
		this.props.navigate('WebView', {uri: item.weixin_url});
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
