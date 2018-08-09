/**
 * @flow
 * Created by Rabbit on 2018/8/9.
 */



import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
import Button from '../Button';
import { Images } from '../../resource';

type Props = {
	title?: string,
	errorStyle?: string,
	imageSource?: string,
	btnTitle?: string,
	btnTitleStyle?: any,
	imageSourceStyle?: any,
	errorTitleStyle?: any,
	btnStyle?: string,
	onErrorPress?: any,
};
export default class ErrorView extends React.Component<Props> {


	static defaultProps = {
		title: '出错啦，请稍后重试',
		btnTitle: '点击刷新',
		imageSource: null,

	}


	render() {
		const { title, btnTitle, imageSource, errorStyle, errorTitleStyle, btnTitleStyle, btnStyle, imageSourceStyle, onErrorPress } = this.props;

		return (
			<View style={[styles.container, errorStyle]}>
				<Image style={[styles.imageSourceStyle, imageSourceStyle]} source={imageSource ? imageSource : Images.errorImage} />
				<Text style={[styles.errorTitle, errorTitleStyle]}>
					{title}
				</Text>
				<Button style={[styles.btnStyle, btnStyle]} titleStyle={[styles.btnTitleStyle, btnTitleStyle]} title={btnTitle} onPress={onErrorPress}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		height: 200,
	},
	imageSourceStyle: {
		width: px2dp(302),
		height: px2dp(302),
		marginTop: px2dp(169),
		borderRadius: px2dp(100),
	},
	errorTitle: {
		marginTop: px2dp(73),
		fontSize: FONT_SIZE(12),
		color: '#aeaeae',
	},
	btnStyle: {
		width: px2dp(153),
		height: px2dp(48),
		borderWidth: 1,
		borderRadius: px2dp(4),
		borderColor: '#10b0ff',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: px2dp(66),
	},
	btnTitleStyle: {
		color: '#10b0ff',
	}
});