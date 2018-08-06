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

import { WelfareMobx } from '../../../mobx/News';

import { observer} from 'mobx-react';
import { Button, CustomImage } from '../../../components';
import type {NavigationState} from 'react-navigation';
import {RTWeal} from '../../../servers/News/interfaces';
import FastImage from 'react-native-fast-image';

type Props = {
	navigate: NavigationState;
};
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

	renderItem = ({item}: {item: RTWeal, index: number, column: number}) => {
		return (
			<Button
				onPress={() => this.props.navigate('WelfareDetail', {url: item.url, isHiddenHeader: true})}
			>
				<CustomImage source={{uri: item.url}}
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
			               // style={{backgroundColor: 'red'}}
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