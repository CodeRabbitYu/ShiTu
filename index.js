import { AppRegistry, YellowBox } from 'react-native';

// import { Theme } from 'teaset';

import { Theme } from './app/components';
import DefaultTheme from './app/resource/thems/DefaultTheme';
Theme.set(DefaultTheme);

import App from './app/index';

console.ignoredYellowBox = [ 'Warning: isMounted(...)' ];
// YellowBox.ignoreWarnings(['Warning: isMounted(...)']);


AppRegistry.registerComponent('ShiTu', () => App);
