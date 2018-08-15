/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';

import { Button, GradientButton} from '../../components';
import {observer} from 'mobx-react';
import {LoginMobx} from '../../mobx/Login';
import BaseContainer from '../../components/BaseContainer';

type Props = {
	sec: number,
	navigation: any,
};
// TODO 上线时时间改为60
const sec = 7;

@observer
export class Login extends React.Component<Props, any> {
	loginMobx: LoginMobx;
	timer: any;
	numberRef: any;
	codeRef: any;

	constructor(props: Props) {
		super(props);
		this.loginMobx = new LoginMobx();
		this.state = ({
			sec: sec,
		});
	}

	componentDidMount() {
	}



	changeSeconds = () => {
		this.timer = setTimeout(() => {
			if (this.state.sec < 1) {
				clearTimeout(this.timer);
				this.setState({
					sec: sec,
				});
			}
			else {
				this.changeSeconds();
				this.setState({
					sec: this.state.sec - 1,
				});
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	getVerifyCode = async () => {
		this.numberRef.blur();
		this.codeRef.blur();
		if (this.state.sec === sec) {
			const reg = new RegExp('^[0-9]*$');
			const regLen = new RegExp('^1\\d{10}$');
			const mobile = this.loginMobx.params['mobile'];
			if (reg.test(mobile) && regLen.test(mobile)) {
				this.setState({
					sec: this.state.sec - 1,
				});
				this.changeSeconds();
			}
			else {
				Toast.show('手机号格式不正确');
				return false;
			}
			try {
				await this.loginMobx.sendCode(this.loginMobx.params);
			}
			catch (e) {
				Toast.show(e.message);
			}
		}
	}

	login = async () => {
		this.numberRef.blur();
		this.codeRef.blur();


		this.props.navigation.navigate('AppRouter');

	}

	render() {

		const { params } = this.props.navigation.state;

		const isTopNavigator = !params && true;

		return (
			<BaseContainer title='登录' isTopNavigator={isTopNavigator} style={styles.container}>
				<ScrollView style={styles.scrollView} keyboardShouldPersistTaps={'always'}>
					<View style={styles.textInputBox}>
						<View style={[styles.textInputView, styles.phoneInputView]}>
							<TextInput style={[styles.textInput, styles.phoneInput]}
							           ref={(ref) => this.numberRef = ref}
							           maxLength={11}
							           keyboardType='numeric'
							           placeholder='请输入您的手机号'
							           underlineColorAndroid="transparent"
							           onChangeText={(text) => {
								           this.loginMobx.setLoginData(text, 'mobile');
							           }} />
							<TouchableOpacity activeOpacity={1} onPress={this.getVerifyCode} style={styles.sendCodeView}>
								{this.state.sec === sec ? (
									<Text style={styles.sendCode}>发送验证码</Text>
								) : (
									<Text style={styles.sendCodeOn}>已发送({this.state.sec}s)</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.textInputBox}>
						<View style={styles.textInputView}>
							<TextInput style={[styles.textInput, styles.codeInput]}
							           ref={(ref) => this.codeRef = ref}
							           keyboardType='numeric'
							           placeholder='请输入验证码'
							           underlineColorAndroid='transparent'
							           secureTextEntry={false}
							           onChangeText={(text) => {
								           this.loginMobx.setLoginData(text, 'code');
							           }} />
						</View>

						<GradientButton
							titleStyle={{color: 'white', fontSize: FONT_SIZE(17)}}
							btnStyle={styles.submitBtnStyle}
							gradientStyle={styles.gradientStyle}
							onPress={this.login}
							title='登录'
						/>
					</View>
				</ScrollView>
			</BaseContainer>
		);
	}
}

const styles = StyleSheet.create({
	statusBar: {
		color: 'black',
	},
	container: {
		backgroundColor: 'white',
	},
	scrollView: {
		backgroundColor: 'white',
		flex: 1,
		paddingTop: px2dp(60)
	},
	textInputBox: {
		width: SCREEN_WIDTH,
	},
	textInputView: {
		height: px2dp(80),
		marginVertical: px2dp(20),
		borderStyle: 'solid',
		borderBottomWidth: px2dp(1),
		borderColor: '#cacaca',
		marginHorizontal: px2dp(70),
		alignItems: 'center',
		justifyContent: 'center',
	},
	phoneInputView: {
		flexDirection: 'row',
	},
	phoneInput: {
		flex: 2,
		marginHorizontal: px2dp(20)
	},
	sendCodeView: {
		flex: 1,
		height: px2dp(50),
		marginVertical: px2dp(15),
		justifyContent: 'center',
		alignItems: 'center',
		borderStyle: 'solid',
		borderLeftWidth: px2dp(1),
		borderColor: '#848484',
	},
	sendCode: {
		color: '#2d2d2d',
	},
	sendCodeOn: {
		color: '#bfbfbf',
	},
	textInput: {
		height: px2dp(80),
	},
	codeInput: {
		flex: 1,
		width: SCREEN_WIDTH - px2dp(180),
		marginHorizontal: px2dp(20),
	},
	loginBtnView: {
		width: SCREEN_WIDTH,
		backgroundColor: 'white',
	},

	inputStyle: {
		height: px2dp(88),
		// backgroundColor: 'red',
		marginTop: 20,
		marginHorizontal: px2dp(20)
	},
	codeView: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: px2dp(40),
		marginRight: px2dp(20),
	},
	codeTxt: {
		// backgroundColor: 'red'
		fontSize: 16
	},
	loginStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 100,
		backgroundColor: 'orange',
		height: px2dp(88),
		marginHorizontal: px2dp(20),
		borderRadius: 5
	},
	gradientStyle: {
		marginTop: px2dp(100),
		marginHorizontal: px2dp(70),
		borderRadius: 20
	},
	submitBtnStyle: {
		width: SCREEN_WIDTH - px2dp(140),
		height: px2dp(80),
		borderRadius: px2dp(10),
		justifyContent: 'center',
		alignItems: 'center',
	}
});