/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import { AuthLoadingRouter } from './routers/AuthLoading';
import {View} from 'react-native';
import {Toast} from './components';
import {observer, Provider} from 'mobx-react';
import * as RootStore  from './store/RootStore';

import SplashScreen from 'react-native-splash-screen';


@observer
export default class index extends React.Component<any> {

	toast: Toast;

	constructor(props: Props) {
		super(props);
	}

	async componentDidMount() {
		global.Toast = this.toast;
		SplashScreen.hide();
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
