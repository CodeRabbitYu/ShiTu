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
	ActivityIndicator
} from 'react-native';

import {System} from '../../../utils';
import { MasonryList, BaseContainer } from '../../../components';

import { WealPictureMobx } from '../../../mobx/News';

import { observer} from 'mobx-react';
import { Button, CustomImage } from '../../../components';
import {BuDeJie} from '../index';
import {WealPictureDetail} from '../WealPictureDetail';
import type {NavigationState} from 'react-navigation';
import {RTWeal} from '../../../servers/News/interfaces';
import FastImage from 'react-native-fast-image';

type Props = {
	navigate: NavigationState;
};
@observer
export class WealPicture extends React.Component<Props> {

	WealPictureMobx: WealPictureMobx;

	constructor(props: Props) {
		super(props);
		this.WealPictureMobx = new WealPictureMobx();
	}

	async componentDidMount() {
		await this.WealPictureMobx.fetchWealPictureData(1);
	}

	renderItem = ({item}: {item: RTWeal, index: number, column: number}) => {
		// console.log(item);
		return (
			<Button
				onPress={() => this.props.navigate('WealPictureDetail', {url: item.url, isHiddenHeader: true})}
			>
				<CustomImage source={{uri: item.createdAt}}
				             activityVisible={false}
				             style={[
					             styles.cell,
					             { height: item.height, backgroundColor: 'white'},
				             ]}
				/>
			</Button>
		);
	}

	render() {

		const { dataSource, isRefreshing, refreshData, loadMoreData } = this.WealPictureMobx;

		return (
			<BaseContainer key={'base'} isTopNavigator={true}
			               navBar={<View/>} store={this.WealPictureMobx}
			               isHiddenNavBar={true}
			>
				<MasonryList
					onRefresh={refreshData}
					refreshing={isRefreshing}
					data={dataSource.slice()}
					renderItem={this.renderItem}
					getHeightForItem={({ item }) => item.height + 2}
					numColumns={2}
					initialNumToRender={10}
					keyExtractor={item => item._id}
					ListEmptyComponent={() => <View/>}
					ListHeaderComponent={() => <View/>}
					ListFooterComponent={() =>
						!isRefreshing
							?
							<View style={{height: 50, flex: 1,  alignItems: 'center', justifyContent: 'center'}}>
								<ActivityIndicator size={'small'}/>
							</View>
							:
							null
					}
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