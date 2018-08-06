/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import { MyApp } from './router';
import {View} from 'react-native';
import {Toast, LoadingSpinner} from './components';
import {observer, Provider} from 'mobx-react';
import RootStore  from './store/RootStore';
import {ConfigStore}  from './store/ConfigStore';


@observer
export default class index extends React.Component<any> {

	toast: Toast;
	rootStore: RootStore;
	configStore: ConfigStore;


	constructor(props: Props) {
		super(props);

		// this.rootStore = new RootStore();
		this.configStore = new ConfigStore();

	}

	render() {

		return (
			<Provider configStore={this.configStore}>
				<View style={{backgroundColor: 'transparent', flex: 1}}>
					<MyApp />
					<Toast ref={(t: any) => this.toast = t}/>
					<LoadingSpinner isVisible={this.configStore.isLoading}/>
				</View>
			</Provider>
		);
	}
}
