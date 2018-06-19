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

type Props = {};
export default class index extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		// this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});