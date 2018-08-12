/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */
import React from 'react';
import {
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Text,
	ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';
const ViewProps = require('ViewPropTypes');


let TouchableComponent;

if (Platform.OS === 'android') {
	TouchableComponent = Platform.Version <= 20 ? TouchableOpacity : TouchableNativeFeedback;
} else {
	TouchableComponent = TouchableOpacity;
}

if (TouchableComponent !== TouchableNativeFeedback) {
	TouchableComponent.SelectableBackground = () => ({});
	TouchableComponent.SelectableBackgroundBorderless = () => ({});
	TouchableComponent.Ripple = () => ({});
	TouchableComponent.canUseNativeForeground = () => false;
}

type Props = {
  onPress: () => any,
  disabled?: ?boolean,
  style?: typeof ViewProps,
  activeOpacity?: number,
  title?: string,
  titleStyle?: Text.propTypes.style,
  touchable?: any,
  ...TouchableWithoutFeedback.propTypes,
}

export default class Button extends React.Component<Props> {

  static propTypes = {
  	onPress: PropTypes.func.isRequired,
  	disabled: PropTypes.bool,
  	style: ViewPropTypes.style,
  	activeOpacity: PropTypes.number,
  	title: PropTypes.string,
  	titleStyle: Text.propTypes.style,
  	touchable: PropTypes.func,
  };

  static SelectableBackground = TouchableComponent.SelectableBackground;
  static SelectableBackgroundBorderless = TouchableComponent.SelectableBackgroundBorderless;
  static Ripple = TouchableComponent.Ripple;
  static canUseNativeForeground = TouchableComponent.canUseNativeForeground;

  render() {
  	let {
  		children,
  		style,
  		foreground,
  		background,
  		useForeground,
  		title,
  		titleStyle,
  		touchable,
  		activeOpacity = .7,
  		...props
  	} = this.props;

  	if (title) {
  		if (title && children) {
  			console.warn(
  				'标题 和 子组件只能存在一个'
  			);
  		}
  		title = <Text style={titleStyle}>{title}</Text>;

  	} else {
  		children = React.Children.only(children);
  	}

  	if (TouchableComponent === TouchableNativeFeedback) {
  		useForeground =
        foreground && TouchableNativeFeedback.canUseNativeForeground();

  		if (foreground && background) {
  			console.warn(
  				'Specified foreground and background for Touchable, only one can be used at a time. Defaulted to foreground.'
  			);
  		}
  		return (
  			<TouchableComponent
  				{...props}
  				useForeground={useForeground}
  				background={(useForeground && foreground) || background}
  				activeOpacity={activeOpacity}
  			>
  				<View style={style}>
  					{title}
  					{children}
  				</View>
  			</TouchableComponent>
  		);
  	} else if (TouchableComponent === TouchableOpacity) {
  		return (
  			<TouchableComponent {...props} style={style} activeOpacity={activeOpacity}>
  				{title}
  				{children}
  			</TouchableComponent>
  		);
  	} else {
  		const Touchable = touchable || TouchableComponent;
  		return (
  			<Touchable {...props} activeOpacity={activeOpacity}>
  				{children}
  			</Touchable>
  		);
  	}
  }
}