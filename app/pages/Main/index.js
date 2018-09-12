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
import Icon from 'react-native-vector-icons/Ionicons';
import {Label, ListRow, PopoverPicker} from 'teaset';

const badegeNumber = 30;
const badegeRadius = badegeNumber / 2;

type Props = {
	navigation: any,
	defaultValue: string,
};
export class Main extends Component<Props> {

	constructor(props) {
		super(props);

		this.items = [
			'扫一扫',
			'加好友/群',
			'首付款',
			'高能舞室',
		];

		this.state = {
			value: '',
			defaultValue: '测试默认value' || this.props.defaultValue,
			selectedIndex: null,
			modalSelectedIndex: null,

		};
	}


	componentDidMount() {



		this.setState({
			isReady: true
		});
	}

	login = (type) => {

		if (type === 'router') {
			this.props.navigation.navigate('AuthRouter', {type});
		} else {
			this.props.navigation.navigate('Login', {type});
		}

	}

	openModalPress = (popView) => {

		const blackStyle = {
			backgroundColor: '#fff',
			// paddingTop: 8,
			// paddingBottom: 8,
			paddingLeft: 12,
			paddingRight: 12,
		};

		popView.measure((x, y, width, height, pageX, pageY) => {

			PopoverPicker.show(
				{x: pageX + 1, y: pageY, width, height},
				this.items,
				this.state.modalSelectedIndex,
				(item, index) => this.setState({modalSelectedIndex: index}),
				{showArrow: true,
					align: 'end',
					popoverStyle: blackStyle,
					overlayOpacity: 0.3,
					directionInsets: -3,
				}
			);
		});
	}

	renderRightView = () => {
		return (
			<Button onPress={() => this.openModalPress(this.popView)} >
				<View ref={e => this.popView = e} style={{marginRight: px2dp(20)}}>
					<Icon name={'md-add'} size={30} color={'white'}/>
				</View>
			</Button>
		);
	}

	render() {
		return (
			<BaseContainer style={styles.container} isTopNavigator={true} title={'我的'}
			               rightView={this.renderRightView()}
			               onWillBlur={(payload) => {
			               	  console.log('页面将要失去焦点', payload);
			               }}
			               onDidBlur={(payload) => {
				               console.log('页面已经失去焦点', payload);
			               }}
			               onWillFocus={(payload) => {
			               	  console.log('页面将要获得焦点', payload);
			               }}
			               onDidFocus={(payload) => {
				               console.log('页面已经获得焦点', payload);
			               }}

			>

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

				<MyTextInput
					placeholder='iOS无法输入中文解决方式'
					style={{height: 44, backgroundColor: 'red', marginTop: 10}}
					onChangeText={(text) => this.setState({text: text})}
					value={this.state.defaultValue}
					defaultValue={this.state.defaultValue}
					clearButtonMode={'always'}
					onChange={(e) => {
						console.log('nativeEvent', e.nativeEvent);
					}}

				/>
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