/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,

} from 'react-native';
import BaseContainer from '../../components/BaseContainer';

import { MyTextInput as TextInput } from '../../components';

const badegeNumber = 30;
const badegeRadius = badegeNumber / 2;

type Props = {
  navigation: any
};
export class Main extends Component<Props> {

	componentDidMount() {

	}

	render() {
		return (
			<BaseContainer style={styles.container} isTopNavigator={true} title={'我的'}>
				<Text>Main</Text>
				{/*<TextInput placeholder='11111111' style={{height: 44, backgroundColor: 'red'}}/>*/}

			</BaseContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});