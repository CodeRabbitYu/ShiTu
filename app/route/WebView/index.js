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
} from 'react-native';

type Props = {
	uri: string,
	navigation: any,
};
export default class index extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		// this.state = {};
	}

	render() {

		const { uri } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>
				<WebView source={{uri: uri}}
								 style={{flex: 1, backgroundColor: 'red'}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});