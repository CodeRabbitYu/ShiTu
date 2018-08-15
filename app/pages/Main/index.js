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
	TextInput,

} from 'react-native';
import BaseContainer from '../../components/BaseContainer';

import { MyTextInput, Button, GradientButton } from '../../components';

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

	componentDidMount() {}

	login = (type) => {

		if (type === 'router') {
			this.props.navigation.navigate('AuthRouter', {type});
		} else {
			this.props.navigation.navigate('Login', {type});
		}

	}

	render() {
		return (
			<BaseContainer style={styles.container} isTopNavigator={true} title={'我的'}>
				<View style={{alignItems: 'center'}}>
					<GradientButton
						title={'切换路由的登录方式'}
						onPress={() => this.login('router')}
						gradientStyle={styles.gradientStyle}
						titleStyle={styles.btnTitleStyle}
						btnStyle={styles.btnStyle}
					/>
					<GradientButton
						title={'直接跳转的登录方式'}
						onPress={() => this.login('navigate')}
						gradientStyle={styles.gradientStyle}
						titleStyle={styles.btnTitleStyle}
						btnStyle={styles.btnStyle}
					/>
				</View>

				<TextInput
					placeholder='11111111'
					style={{height: 44, backgroundColor: 'red', marginTop: 10}}
					onChangeText={(text) => this.setState({text: text})}
					value={this.state.text}
					clearButtonMode={'always'}
					onChange={(e) => {
						console.log('nativeEvent', e.nativeEvent);
					}}

				/>

				<Button title={'提交'} onPress={() => {

				}}/>

			</BaseContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gradientStyle: {
		borderRadius: 10,
		marginTop: 10
	},
	btnStyle: {
		height: 44,
		width: SCREEN_WIDTH / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTitleStyle: {
		color: 'white'
	},
});