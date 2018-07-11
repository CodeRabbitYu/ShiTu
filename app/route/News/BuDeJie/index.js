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
import { TableList } from '../../../components';
import type {RTBDJList, RTWeal} from '../../../servers/News/interfaces';
import { BuDeJieMobx } from '../../../mobx/News/BuDeJieMobx';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { BaseItem } from './Components';
import type {NavigationState} from 'react-navigation';
import {ContainerItem} from './Components/Items/ContainerItem';
import {ModalView} from './Components/Views/ModalView';

import { AlbumView } from 'teaset';
import {Picture} from '../../../servers/News/interfaces';

type Props = {
  type: number;
  navigate: NavigationState
};


@observer
export class BuDeJie extends React.Component<any, any> {

  BuDeJieMobx: BuDeJieMobx;

  @observable isVisible: boolean = false;
  @observable itemData: RTBDJList;

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


		// this.setVisible(true);
		// this.itemData = item;
	}

  renderItem = ( {item, index}: any ) => {
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


  setVisible = (isVisible: boolean) => {
  	this.isVisible = isVisible;
  }

  render() {
  	// console.log('11111111');
  	return [
  		<TableList
  			key={'TableList'}
  			style={{backgroundColor: 'white'}}
  			onFetch={this.onFetch}
  			renderItem={this.renderItem}
  			keyExtractor={(item) => item.id}
  			initialNumToRender={10}
  			paginationType={'value'}
  		/>,

  	];
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

});