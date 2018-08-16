/**
 * @flow
 * Created by Rabbit on 2018/6/26.
 */
import React, {Component} from 'react';
import {View, ActivityIndicator, Modal} from 'react-native';

import { observer } from 'mobx-react';

type Props = {
	isVisible?: boolean,
}
@observer
export default class LoadingSpinner extends Component<Props> {


	render() {
		const { isVisible } = this.props;

		return (
			<Modal
				transparent={true}
				onRequestClose={() => {}}
				visible={isVisible}
				animationType={'fade'}
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={{  justifyContent: 'center', alignItems: 'center', width: 80, height: 80, backgroundColor: '#333', borderRadius: 10 }}>
						<ActivityIndicator size='large' color='white' />
					</View>
				</View>
			</Modal>
		);
	}
}