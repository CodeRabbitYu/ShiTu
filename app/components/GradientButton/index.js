/**
 * @flow
 * Created by Rabbit on 2018/8/12.
 */

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Button';

type Props = {
	startColor?: string,    // 渐变色开始的颜色
	endColor?: string,      // 渐变色结束的颜色
	onPress?: Function,     // 点击时间
	gradientStyle?: any,    // 渐变色的style，属于按钮的外层style，可以控制其中的样式
	children?: any,         // 子组件，不可修改
	btnStyle?: any,         // 按钮的样式
	...Button.prototype,
};
export default class index extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	static defaultProps = {
		startColor: '#0dc7ff',
		endColor: '#10aeff',
	}

	render() {

		const {startColor, endColor, onPress, gradientStyle, btnStyle, children} = this.props;
		return (
			<LinearGradient
				start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
				locations={[0, 1]}
				colors={[startColor, endColor]}
				style={gradientStyle}
			>
				<Button {...this.props} style={btnStyle} onPress={onPress}>
					{children}
				</Button>

			</LinearGradient>
		);
	}
}