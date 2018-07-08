/**
 * @flow
 * Created by Rabbit on 2018/5/21.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image, Platform,
} from 'react-native';
import HeaderTitle from 'react-navigation/src/views/Header/HeaderTitle';

type Props = {
  headerTitle: any;
  headerTitleStyle: any;
};
export default class index extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);
		// this.state = {};
	}

  renderTitleComponent = () => {
  	const headerTitle = this.props.headerTitle;

  	const titleString = this._getHeaderTitleString(props.scene);

  	const titleStyle = this.props.headerTitleStyle;
  	const color = options.headerTintColor;
  	const allowFontScaling = options.headerTitleAllowFontScaling;

  	// On iOS, width of left/right components depends on the calculated
  	// size of the title.
  	const onLayoutIOS =
      Platform.OS === 'ios'
      	? e => {
      		this.setState({
      			widths: {
      				...this.state.widths,
      				[props.scene.key]: e.nativeEvent.layout.width,
      			},
      		});
      	}
      	: undefined;

  	const RenderedHeaderTitle =
      headerTitle && typeof headerTitle !== 'string'
      	? headerTitle
      	: HeaderTitle;
  	return (
  		<RenderedHeaderTitle
  			onLayout={onLayoutIOS}
  			allowFontScaling={allowFontScaling == null ? true : allowFontScaling}
  			style={[color ? { color } : null, titleStyle]}
  		>
  			{titleString}
  		</RenderedHeaderTitle>
  	);
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