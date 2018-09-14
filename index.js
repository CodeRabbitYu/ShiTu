/** @format */

import {AppRegistry, YellowBox} from 'react-native';

import { configure } from 'mobx';
configure({ enforceActions: 'observed' });

import { Theme } from 'teaset';
import './app/utils/Global';
import DefaultTheme from './app/resource/thems/DefaultTheme';

Theme.set(DefaultTheme);

// import App from './app/index';

import applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
import initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty';
+Object.assign(babelHelpers, { applyDecoratedDescriptor, initializerDefineProperty })

const App = require('./app/index').default;


import {name as appName} from './app.json';

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

YellowBox.ignoreWarnings(['Require cycle:']);

// console.ignoredYellowBox = [ 'Warning: isMounted(...)', 'Require cycle: app/utils'];

AppRegistry.registerComponent(appName, () => App);
