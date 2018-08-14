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

	constructor(props) {
		super(props);
		this.state = {
			text: '',
		};
	}

	componentDidMount() {
		this.setState({
			text: '33333',
		})
	}

	render() {
		return (
			<BaseContainer style={styles.container} isTopNavigator={true} title={'我的'}>
				<Text>Main</Text>
				<TextInput
					placeholder='11111111'
					style={{height: 44, backgroundColor: 'red'}}
					onChangeText={(text) => this.setState({text: text})}
					value={this.state.text}
					clearButtonMode={'always'}
					
				/>

			</BaseContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});