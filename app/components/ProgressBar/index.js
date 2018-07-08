/**
 * @flow
 * Created by Rabbit on 2018/6/25.
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, LayoutAnimation } from 'react-native';

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
		LayoutAnimation.spring();
		setTimeout(() => {
			this.setState({ progress: this.props.progress });
		}, this.state.startDelay);
	}

	UNSAFE_componentWillReceiveProps(nextProps: Props) {
		this.setState({ progress: nextProps.progress });
	}

	UNSAFE_componentWillUpdate() {
		LayoutAnimation.spring();
	}



	render() {
		return (
			<View style={this.props.style}>
				<View style={[styles.flexBox, styles.progressBar, this.props.style]}>
					<View style={[{ flex: this.state.progress },
						{ backgroundColor: this.props.filledColor || '#D50000' }]} />
					<View style={[{ flex: 100 - this.state.progress },
						{ backgroundColor: this.props.unfilledColor || '#FFF' }]} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flexBox: {
		flexDirection: 'row',
	},
	progressBar: {
		overflow: 'hidden',
		height: 14,
		borderWidth: 1,
		borderColor: '#D50000',
		borderRadius: 10,
	}
});

