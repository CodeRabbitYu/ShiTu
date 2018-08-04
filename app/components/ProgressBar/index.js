/**
 * @flow
 * Created by Rabbit on 2018/6/25.
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, LayoutAnimation, InteractionManager } from 'react-native';
import {Theme} from 'teaset';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
	startDelay?: number,
	progress: number,
	style?: any,
	filledColor?: string,
	unfilledColor?: string,
}

type State = {
	progress: number,
	startDelay: any,
}

export default class ProgressBar extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			progress: 0,
			startDelay: this.props.startDelay || 300,
		};
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.timer = setTimeout(() => {
				this.setState({ progress: this.props.progress });

			}, this.props.startDelay);
			// LayoutAnimation.spring();
		});
	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
		this.setState({ progress: 100 });
	}

	UNSAFE_componentWillReceiveProps(nextProps: Props) {
		this.setState({ progress: nextProps.progress });
	}

	render() {
		return (
			<View style={[styles.flexBox, styles.progressBar, this.props.style]}>

				<View style={[{ flex: this.state.progress },
					{ backgroundColor: 'rgba(79, 181, 250, 1)' }]} />
				<View style={[{ flex: 100 - this.state.progress },
					{ backgroundColor: this.props.unfilledColor }]} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flexBox: {
		flexDirection: 'row',
		// flex: 1,
		// backgroundColor: 'white',
	},
	progressBar: {
		overflow: 'hidden',
		height: 20,
		backgroundColor: 'white',
	}
});

