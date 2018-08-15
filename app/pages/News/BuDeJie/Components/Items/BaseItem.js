/**
 * @flow
 * Created by Rabbit on 2018/5/9.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';

import {RTBDJList, ToolBar, UserInfo, Joke, Picture} from '../../../../../servers/News/interfaces';
import {JokeItem} from './JokeItem';
import {PictureItem} from './PictureItem';
import {ContainerItem} from './ContainerItem';
import {Button} from '../../../../../components/index';
import type {NavigationState} from 'react-navigation';

import {UserInfoView} from '../Views/UserInfoView';
import {ToolBarView} from '../Views/ToolBarView';

type Props = {
  itemData: RTBDJList;
  navigate: NavigationState;
  itemPress: Function;
  picturePress: Function;
};

export const BaseItem = (props: Props) => {
	const { userInfoData, toolBarData } = props.itemData;
	const { itemData, itemPress, picturePress} = props;

	return (
		<View style={styles.container}>
			<UserInfoView userInfoData={userInfoData}/>
			<ContainerItem itemData={itemData}
										 itemPress={itemPress}
										 picturePress={picturePress}
			/>
			<ToolBarView toolBarData={toolBarData}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: px2dp(20),
	},
});