import { AppRegistry } from 'react-native';

// import { Theme } from 'teaset';

import { Theme } from './app/components';
import DefaultTheme from './app/resource/thems/DefaultTheme';
Theme.set(DefaultTheme);

import App from './app/index';

// import SampleSSS from './app/sampleSSS';

console.ignoredYellowBox = [ 'Warning: isMounted(...)' ];

AppRegistry.registerComponent('ShiTu', () => App);
