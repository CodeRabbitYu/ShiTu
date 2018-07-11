import { AppRegistry, YellowBox } from 'react-native';

// import { Theme } from 'teaset';

import { Theme } from './app/components';
import DefaultTheme from './app/resource/thems/DefaultTheme';
Theme.set(DefaultTheme);

import App from './app/index';

if (!__DEV__) {
	global.console = {
		info: () => {
		},
		log: () => {
		},
		warn: () => {
		},
		error: () => {
		},
	};
}

// YellowBox.ignoreWarnings(['Warning: isMounted(...)']);

// 关闭指定警告
console.ignoredYellowBox = [ 'Warning: isMounted(...)' ];

// 关闭全部的警告
// console.disableYellowBox = true;

AppRegistry.registerComponent('ShiTu', () => App);
