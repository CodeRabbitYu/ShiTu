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
	TouchableOpacity,
	BackHandler,
	DeviceEventEmitter
} from 'react-native';

import { MyTextInput, Button, GradientButton } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {Label, ListRow, PopoverPicker, Badge} from 'teaset';
import Theme from 'teaset/themes/Theme';
import BaseContainer from '../../components/BaseContainer';

type Props = {
	navigation: any,
	defaultValue: string,
};

class Item extends Component<any> {
	// static propTypes = {
	// 	...TouchableOpacity.propTypes,
	// 	title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
	// 	selected: PropTypes.bool,
	// };

	buildProps() {
		let {style, title, accessory, selected, ...others} = this.props;

		style = [{
			backgroundColor: Theme.poppItemColor,
			paddingLeft: Theme.poppItemPaddingLeft,
			paddingRight: Theme.poppItemPaddingRight,
			paddingTop: Theme.poppItemPaddingTop,
			paddingBottom: Theme.poppItemPaddingBottom,
			borderColor: 'red',
			borderBottomWidth: 1,
			flexDirection: 'row',
			alignItems: 'center',
		}].concat(style);
		const imageStyle = {
			width: Theme.poppAccessoryWidth,
			height: Theme.poppAccessoryHeight,
			tintColor: Theme.poppAccessoryCheckColor,
		};
		accessory = (
			<View style={{paddingLeft: Theme.poppAccessoryPaddingLeft}}>
				{/* <Image style={imageStyle} source={selected ? require('teaset/icons/check.png') : null} />*/}
			</View>
		);
		if (typeof title === 'string' || typeof title === 'number') {
			const titleStyle = {
				color: Theme.poppItemTitleColor,
				fontSize: Theme.poppItemFontSize,
				overflow: 'hidden',
				flexGrow: 1,
				flexShrink: 1,
			};
			title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
		}

		this.props = {style, title, accessory, selected, ...others};
	}

	render() {
		this.buildProps();

		const {title, accessory, ...others} = this.props;
		return (
			<TouchableOpacity {...others}>
				{title}
				{accessory}
			</TouchableOpacity>
		);
	}
}

export class Main extends Component<Props, any> {

	items: Array<any>;
	popView: any;
	input: any;
	badgeNumber: number = 10;
	listener: DeviceEventEmitter;

	static navigationOptions = ({navigation}: {navigation: any}) => {

		const badgeNumber = navigation.state.params && navigation.state.params.badgeNumber;

		const tabBarButtonComponent = (props: any) => {
			return [
				<TouchableOpacity {...props} activeOpacity={1}
				                  style={{width: SCREEN_WIDTH / 3, marginTop: 10}}
				                  key={'tabBar'}/>,
				<Badge count={badgeNumber} key={'Badge'} style={{position: 'absolute', left: SCREEN_WIDTH - 50, top: 5}}/>
			];
		}
		return {tabBarButtonComponent};
	}

	_didFocusSubscription: any;
	_willBlurSubscription: any;

	constructor(props: Props) {
		super(props);

		this.items = [
			// {title: '扫一扫', style: {backgroundColor: 'red'}},
			// {title: '加好友/群', style: {backgroundColor: 'red'}},
			// {title: '首付款', style: {backgroundColor: 'red'}},
			// {title: '高能舞室', style: {backgroundColor: 'red'}},
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
		this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
			BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
		);
	}

	componentDidMount() {

		this.listener = DeviceEventEmitter.addListener('badgeNumber', (badgeNumber: number) => {
			// console.log(badgeNumber);
			// alert(badgeNumber);

			this.props.navigation.setParams({
				badgeNumber: badgeNumber,
			});

		});



		this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
			BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
		);
	}

	onBackButtonPressAndroid = () => {
		alert('123');

		return true;
	};


	componentWillUnmount() {
		this._didFocusSubscription && this._didFocusSubscription.remove();
		this._willBlurSubscription && this._willBlurSubscription.remove();
		this.listener.remove();
	}


	login = (type: string) => {

		if (type === 'router') {
			this.props.navigation.navigate('AuthRouter', {type});
		} else {
			this.props.navigation.navigate('Login', {type});
		}

	}

	openModalPress = (popView: any) => {

		const blackStyle = {
			backgroundColor: '#fff',
			// paddingTop: 8,
			// paddingBottom: 8,
			paddingLeft: 12,
			paddingRight: 12,
		};

		PopoverPicker.PopoverPickerView.Item = Item;

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

	addBadgeNumber = () => {

		DeviceEventEmitter.emit('badgeNumber', this.badgeNumber++);

		// this.props.navigation.setParams({
		// 	badgeNumber: this.badgeNumber++,
		// });
	}

	render() {
		return (
			<BaseContainer style={styles.container} isTopNavigator={true} title={'我的'}
			               rightView={this.renderRightView()}
			               onWillBlur={(payload) => {
			               	  console.log('Main页面将要失去焦点', payload);
			               }}
			               onDidBlur={(payload) => {
				               console.log('Main页面已经失去焦点', payload);
			               }}
			               onWillFocus={(payload) => {
			               	  console.log('Main页面将要获得焦点', payload);
			               }}
			               onDidFocus={(payload) => {
				               console.log('Main页面已经获得焦点', payload);
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

					<GradientButton
						title={'添加通知数量'}
						onPress={this.addBadgeNumber}
						gradientStyle={styles.gradientStyle}
						titleStyle={styles.btnTitleStyle}
						btnStyle={styles.btnStyle}
					/>
				</View>


				

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