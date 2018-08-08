/**
 * @flow
 * Created by Rabbit on 2018/6/27.
 */

import React, {Component} from 'react';
import {
	View,
	StyleSheet
} from 'react-native';

import {observer} from 'mobx-react';
import {SafeAreaView} from 'react-navigation';

import { NavigatorBar, LoadingSpinner, ErrorView } from '../index';
import { Theme } from 'teaset';


type Props = {
	store?: Object,							// 页面中的mobx状态
	onErrorPress?: Function,	  // 出错页面的点击事件
	navBar?: any,								// 导航条
	children?: any,

	style?: any,								// 外层View样式
	navStyle?: any,							// 导航条样式
	contentViewStyle?: any,			// 包裹层View样式

	isTopNavigator?: boolean,		// 是否是顶层页面
	isHiddenNavBar?: boolean,

	errorTitle?: string,   //  错误页文本
	imageSource?: string,  // 错误页图片
	errorStyle?: string, // 错误View样式

	bottomStyle?: any,
	bottomBackgroundColor?: string,
	bottomHeight?: number,

	...NavigatorBar.Props
}

@observer
export default class BaseContainer extends Component<Props> {

	componentWillUnmount() {
		// Toast.close(0);
	}

	renderContent() {
		const {store, children, onErrorPress, errorTitle, imageSource, errorStyle} = this.props;
		if (!store) return children;
		const {isLoading, isError, errorInfo} = store;
		// console.log(errorInfo);
		if (isLoading) {
			 if (store.loadingType === 'page') {
				 return <LoadingSpinner isVisible={store.isLoading}/>;
			 } else {
				 return (
				 	<View style={{flex: 1}}>
					  {children}
					  <LoadingSpinner isVisible={store.isLoading}/>
				 </View>);
			 }
		}
		if (isError) return <ErrorView errorStyle={errorStyle} imageSource={imageSource}
		                               title={errorInfo.message}
		                               onErrorPress={onErrorPress}/>;
		return children;
	}


	renderNavView() {
		const {navBar, isTopNavigator, navStyle, ...navProps} = this.props;
		let navView = null;
		if (typeof navBar === 'undefined') {
			navView = <NavigatorBar {...navProps} style={navStyle} isTopNavigator={isTopNavigator} />;
		} else  {
			navView = navBar;
		}
		return navView;
	}

	renderBottom() {
		const { bottomStyle, bottomBackgroundColor, bottomHeight = 39, isTopNavigator} = this.props;

		const backgroundColor = bottomBackgroundColor ? bottomBackgroundColor : 'white';
		const height = !isTopNavigator && Theme.isIPhoneX ? bottomHeight : 0;
		return (
			<View style={[{height, backgroundColor}, bottomStyle]}/>
		);
	}


	render() {
		const {style, contentViewStyle, isTopNavigator, isHiddenNavBar} = this.props;

		const backgroundColor = !isTopNavigator && Theme.isIPhoneX ? 'white' : null;
		const marginTop = !isHiddenNavBar ? Theme.statusBarHeight + Theme.navBarContentHeight : 0;

		return <SafeAreaView style={[styles.container, style]}
		                     forceInset={{ bottom: 'never', top: 'never' }}
		>
			{ !isHiddenNavBar && this.renderNavView() }
			<View style={[styles.contentView, {marginTop, backgroundColor}, style, contentViewStyle]}>
				{this.renderContent()}
				{/* {this.renderBottom()}*/}
			</View>
		</SafeAreaView>;
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	contentView: {
		flex: 1
	},
});