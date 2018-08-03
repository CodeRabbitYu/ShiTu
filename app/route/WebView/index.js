/**
 * @flow
 * Created by Rabbit on 2018/6/19.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	WebView,
	Alert
} from 'react-native';
import { ProgressBar } from '../../components';
import {System} from '../../utils';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Theme} from 'teaset';
import BaseContainer from '../../components/BaseContainer';

type Props = {
	uri?: string,
	navigation: any,
};

type State = {
	progress: number,
	active: boolean,
	uri: string,
	isGoBack: boolean,
	isForWard: boolean,
}

const WEBVIEW_REF = 'webview';

export default class index extends React.Component<Props, State> {

	setInterval: any;

	constructor(props: Props) {
		super(props);

		const { uri } = this.props.navigation.state.params;
		this.state = {
			progress: 0,
			active: false,
			isGoBack: false,
			isForWard: false,
			uri: uri
		};
	}

	componentWillUnmount() {
		this.setState({progress: 0});
		this.setInterval && clearInterval(this.setInterval);
	}


	_reload = () => {
		console.log('刷新');
		this.refs[WEBVIEW_REF].reload();
	};
	_goForward = () => {
		console.log('去前面的页面');
		this.state.isForWard ? this.refs[WEBVIEW_REF].goForward() : null;
	};

	_goBack = () => {
		console.log('返回上级页面');
		this.state.isGoBack ? this.refs[WEBVIEW_REF].goBack() : null;
	};

	_close = () => {
		console.log('关闭');
		const {goBack} = this.props.navigation;
		goBack();
	};

	_onShouldStartLoadWithRequest = (data) => {
		console.log('_onShouldStartLoadWithRequest', data);
		// return true;
	}

	_renderLoading = () => {
		return (
			<ProgressBar
				progress={this.state.progress}
				style={{
					height: 10,
					width: System.SCREEN_WIDTH,
				}}
				filledColor="#C9DE00"
				unfilledColor="white"
			/>
		);
	};

	_onNavigationStateChange = (navState) => {
		// console.log(navState);
		// 可以跳转新页面，但这个只是测试代码
		// if(navState.url !== this.state.url){
		//     // this.props.navigation.navigate('')
		//     this.props.navigation.navigate('WebViewDetail', {
		//         data: navState.url,
		//         isVisible: true
		//     });
		// }

		console.log('onNavigationStateChange');
		this.setState({
			isGoBack: navState.canGoBack,
			isForWard: navState.canGoForward,
			uri: navState.url,
		});
	};

	_onLoadStart = () => {
		console.log('开始加载');
		this.setInterval && clearInterval(this.setInterval);

		this.setState({
			progress: 0,
			active: false,
		});
		this.setInterval = setInterval(() => {
			if (this.state.progress > 80) {
				return;
			}
			this.setState({
				progress: this.state.progress + 0.1,
			});

			if (this.state.progress >= 100) {
				this.setInterval && clearInterval(this.setInterval);
			}
		});
	}

	_onLoadEnd = () => {
		console.log('加载结束，成功或失败都会走到这里');
		this.setInterval && clearInterval(this.setInterval);
		this.setState({
			progress: 100,
			// active:true
		});

	}

	_onError = () => {
		this.setInterval && clearInterval(this.setInterval);
		Alert.alert(
			'加载失败',
			null,
			[
				// {text: '刷新', onPress: () => this._reload(),style: 'destructive'},
				{text: '取消', onPress: () => this.props.navigation.goBack(), style: 'cancel'},
			],
			{ cancelable: false }
		);
	}


	_renderActionButton = () => {
		return (
			<ActionButton buttonColor="rgba(231,76,60,1)"
				// 是否自动打开
				// 						active={System.iOS ? false : this.state.active}
				active={false}

				// 是否展示阴影
				// 						hideShadow={System.iOS ? true : true}
				position="right"
				spacing={10}
				// offsetY={10}
				// offsetX={10}
				size={50}
				backdrop={false}
				degrees={90}
				// outRangeScale={1}
				autoInactive={false}
				onPress={() => { console.log('点击Action了'); }}
			>
				<ActionButton.Item buttonColor={'#F8D168'}
													 style={styles.actionItemStyle}
													 size={40}
													 hideShadow={false}
													 onPress={this._reload}
				>
					<Icon name="ios-refresh-outline" style={[styles.actionButtonIcon, {fontSize: 20}]}/>
				</ActionButton.Item>
				<ActionButton.Item buttonColor={this.state.isForWard ? '#1abc9c' : '#dddddd'}
													 onPress={this._goForward}
													 size={40}
													 // hideShadow={false}
													 style={styles.actionItemStyle} >
					<Icon name="ios-arrow-forward-outline" style={styles.actionButtonIcon} />
				</ActionButton.Item>
				<ActionButton.Item buttonColor={this.state.isGoBack ? '#3498db' : '#dddddd'}
													 onPress={this._goBack}
													 size={40}
													 style={styles.actionItemStyle}>
					<Icon name="ios-arrow-back-outline" style={styles.actionButtonIcon} />
				</ActionButton.Item>
				<ActionButton.Item buttonColor={'#9b59b6'}
													 onPress={this._close}
													 size={40}
													 style={styles.actionItemStyle}
				>
					<Icon name="md-close-circle" style={styles.actionButtonIcon} />
				</ActionButton.Item>
			</ActionButton>
		);
	};

	renderProgressBar = () => {
		return (
			<ProgressBar
				progress={this.state.progress}
				style={{
					height: 100,
					width: System.SCREEN_WIDTH,
					backgroundColor: 'white',
				}}
				filledColor='blue'
				unfilledColor='white'
			/>
		);
	}

	render() {
		return (
			<BaseContainer style={styles.container}>
				<WebView
					ref={WEBVIEW_REF}
					style={styles.webView}
					source={{uri: this.state.uri}}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					scalesPageToFit={true}
					automaticallyAdjustContentInsets={false}
					onNavigationStateChange={this._onNavigationStateChange}
					renderLoading={this._renderLoading}
					startInLoadingState={true}
					// onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
					onLoadStart={this._onLoadStart}
					// onLoad={() => {
					// 	this.setState({progress: 0});
					// 	console.log('加载完成');
					// }}
					onLoadEnd={this._onLoadEnd}
					onError={this._onError}
				/>

				{this._renderActionButton()}

			</BaseContainer>
		);
	}
}


const ActionButtonItem = ({iconName, onPress, buttonColor}: {iconName: string, onPress?: Function, buttonColor: string}) => (
	<ActionButton.Item buttonColor={'red'}
											 onPress={onPress}
											 size={40}
											 hideShadow={false}
											 style={styles.actionItemStyle} >
		<View style={{height: 30, width: 30, backgroundColor: 'red'}}/>
		{/* <Icon name={iconName} style={styles.actionButtonIcon} />*/}
	</ActionButton.Item>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		height: System.SCREEN_HEIGHT,
		width: System.SCREEN_WIDTH,
	},
	webView: {
		height: System.Android ? 200 : System.SCREEN_HEIGHT,
		width: System.SCREEN_WIDTH,
		marginTop: System.Android ? 24 : 0,
		backgroundColor: 'white'
		// marginBottom:40,
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 20,
		color: 'white',
		alignSelf: 'center',
		alignItems: 'center',
	},
	actionItemStyle: {
		height: 20,
		width: 20,
	},
	bottomViewStyle: {
		position: 'absolute',
		bottom: 0,
		height: 40,
		width: System.SCREEN_WIDTH,
		flexDirection: 'row',
		flex: 1,
	},
	bottomButtonStyle: {
		width: System.SCREEN_WIDTH / 4,
		height: 40,
	},
	bottomIconStyle: {
		alignSelf: 'center',
		justifyContent: 'center',
		marginTop: 5,

	}
});