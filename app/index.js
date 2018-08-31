/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import { AuthLoadingRouter } from './routers/AuthLoading';
import {View, NativeAppEventEmitter, Alert} from 'react-native';
import {Toast} from './components';
import {observer, Provider} from 'mobx-react';
import * as RootStore  from './store/RootStore';

import SplashScreen from 'react-native-splash-screen';
import Getui from 'react-native-getui';



@observer
export default class index extends React.Component<any> {

	toast: Toast;

	constructor(props: Props) {
		super(props);
	}

	 componentDidMount() {
		global.Toast = this.toast;
		SplashScreen.hide();


		// Getui.initPush(() => {
		// 	console.log('aaaa');
		// });

		Getui.clientId((param) => {

			console.log('clientId', param);

		});

		Getui.version((param) => {
			console.log('version', param);
		});

		const receiveRemoteNotificationSub = NativeAppEventEmitter.addListener(
			'receiveRemoteNotification',
			(notification) => {
				console.log('notification', notification);
				// 消息类型分为 cmd 和 payload 透传消息，具体的消息体格式会有差异
				switch (notification.type) {
				case 'cid':
					Alert.alert('初始化获取到cid', JSON.stringify(notification));
					break;
				case 'cmd':
					Alert.alert('cmd 消息通知', JSON.stringify(notification));
					break;
				case 'payload':
					Alert.alert('payload 消息通知', JSON.stringify(notification));
					break;
					// 新增回调通知到达，点击回调
				case 'notificationArrived':
					Alert.alert('notificationArrived 通知到达', JSON.stringify(notification));
					break;
				case 'notificationClicked':
					Alert.alert('notificationArrived 通知点击', JSON.stringify(notification));
					break;
				default:
				}
			}
		);

		Getui.status((param) => {
			let status = '';
			switch (param) {
			case '0':
				status = '正在启动';
				break;
			case '1':
				status = '启动';
				break;
			case '2':
				status = '停止';
				break;
			}
			console.log('个推', status);
		});

	}

	render() {

		return (
			<Provider {...RootStore}>
				<View style={{backgroundColor: 'transparent', flex: 1}}>
					<AuthLoadingRouter />
					<Toast ref={(t: any) => this.toast = t}/>
				</View>
			</Provider>
		);
	}
}
