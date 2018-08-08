/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import { MyApp } from './router';
import {View} from 'react-native';
import {Toast, LoadingSpinner} from './components';
import {observer, Provider} from 'mobx-react';
import * as RootStore  from './store/RootStore';


@observer
export default class index extends React.Component<any> {

	toast: Toast;

	constructor(props: Props) {
		super(props);
	}

	render() {

		return (
			<Provider {...RootStore}>
				<View style={{backgroundColor: 'transparent', flex: 1}}>
					<MyApp />
					<Toast ref={(t: any) => this.toast = t}/>
					<LoadingSpinner isVisible={RootStore.configStore.isLoading}/>
				</View>
			</Provider>
		);
	}
}
