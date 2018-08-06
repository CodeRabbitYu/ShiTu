import { AppRegistry, YellowBox, Text, TextInput } from 'react-native';

import { configure } from 'mobx';
configure({ enforceActions: true });

import { Theme } from 'teaset';
import './app/utils';
import DefaultTheme from './app/resource/thems/DefaultTheme';
import {addCustomProps} from './app/utils';

// 处理iOS系统文字
addCustomProps(Text, {allowFontScaling: false});
addCustomProps(TextInput, {allowFontScaling: false});

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
console.ignoredYellowBox = [ 'Warning: isMounted(...)', ];

// 关闭全部的警告
// console.disableYellowBox = true;

AppRegistry.registerComponent('ShiTu', () => App);
