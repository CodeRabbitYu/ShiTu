/**
 * @flow
 * Created by Rabbit on 2018/6/26.
 */
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Animated,
	Dimensions,
	Text,
} from 'react-native';

export const DURATION = {
	LENGTH_SHORT: 500,
	FOREVER: 0,
};

const {height} = Dimensions.get('window');

type positionType = 'top' | 'center' | 'bottom'

type Props = {
	style?: any,
	// position?: positionType,
	textStyle?: any,
	positionValue: number | any,
	fadeInDuration?: number,
	fadeOutDuration?: number,
	opacity?: number,
	defaultCloseDelay?: number,
}

type State = {
	isShow: boolean,
	text: string,
	opacityValue: any,
}

export default class Toast extends Component<Props, State> {

	static defaultProps = {
		// position: 'center',
		positionValue: 120,
		fadeInDuration: 500,
		fadeOutDuration: 500,
		opacity: 1
	}


	duration: number | any;
	callback: ?Function;
	isShow: boolean;
	timer: any;
	position: positionType;


	constructor(props: Props) {
		super(props);
		this.state = {
			isShow: false,
			text: '',
			opacityValue: new Animated.Value(this.props.opacity),
		};
	}

	show(text: string, position?: positionType = 'bottom', duration?: number, callback?: Function ) {
		this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
		this.callback = callback;
		this.position = position;
		this.setState({
			isShow: true,
			text: text,
		});

		Animated.timing(
			this.state.opacityValue,
			{
				toValue: this.props.opacity,
				duration: this.props.fadeInDuration,
			}
		).start(() => {
			this.isShow = true;
			if (duration !== DURATION.FOREVER) this.close();
		});
	}

	close( duration?: number | any ) {
		let delay = typeof duration === 'undefined' ? this.duration : duration;

		if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

		if (!this.isShow && !this.state.isShow) return;
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			Animated.timing(
				this.state.opacityValue,
				{
					toValue: 0.0,
					duration: this.props.fadeOutDuration,
				}
			).start(() => {
				this.setState({
					isShow: false,
				});
				this.isShow = false;
				if (typeof this.callback === 'function') {
					this.callback();
				}
			});
		}, delay);
	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}

	render() {
		let pos;
		switch (this.position) {
		case 'top':
			pos = this.props.positionValue;
			break;
		case 'center':
			pos = height / 2;
			break;
		case 'bottom':
			pos = height - this.props.positionValue;
			break;
		}

		const view = this.state.isShow ?
			<View
				style={[styles.container, { top: pos }]}
				pointerEvents="none"
			>
				<Animated.View
					style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
				>
					{React.isValidElement(this.state.text) ? this.state.text : <Text style={[styles.text, this.props.textStyle]}>{this.state.text}</Text>}
				</Animated.View>
			</View> : null;
		return view;
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		elevation: 999,
		alignItems: 'center',
		zIndex: 10000,

	},
	content: {
		backgroundColor: 'black',
		borderRadius: 5,
		padding: 10,
	},
	text: {
		color: 'white',
		textAlign: 'center',
	}
});
