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

	BuDeJieMobx: BuDeJieMobx;

	constructor(props: Props) {
		super(props);
		this.BuDeJieMobx = new BuDeJieMobx();
	}

	onFetch = async ( value: any = this.BuDeJieMobx.maxtime, startFetch: Function, abortFetch: Function) => {
		try {
			await this.BuDeJieMobx.fetchBuDeJieData(this.props.type, value);
			startFetch(this.BuDeJieMobx.dataSource.slice(), 20);
		} catch (e) {
			abortFetch();
			console.log(e);
		}
	}


	picturePress = (item: Picture) => {
		this.props.navigate('WebView', {uri: item.weixin_url});
	}

	renderItem = ( {item}: {item: RTBDJList, index: number} ) => {
		const { navigate } = this.props;
		return (
			<BaseItem itemData={item}
			          navigate={navigate}
			          itemPress={() => {
				          alert('itemPress');
			          }}
			          picturePress={() => this.picturePress(item)}
			/>
		);
	}


	render() {
		return [
			<BaseContainer key={'base'} isTopNavigator={true}
			               store={this.BuDeJieMobx}
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

		];
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

});