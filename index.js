/**
 * @format
 * @flow
 * Created by Rabbit on 2018/11/28
 */
import { AppRegistry, YellowBox } from 'react-native';

import { configure } from 'mobx';
configure({ enforceActions: 'observed' });

import { Theme } from 'teaset';
import './app/utils/Global';
import DefaultTheme from './app/resource/thems/DefaultTheme';

Theme.set(DefaultTheme);

import App from './app/index';

import { name as appName } from './app.json';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {}
  };
}

YellowBox.ignoreWarnings([
  'Require cycle:',
  'Warning: Expected instance props to match',
  'Warning: ViewPagerAndroid has been extracted from react-native core and will be removed in a future release.',
  'Warning: Slider has been extracted from react-native core and will be removed in a future release.',
  'Warning: Async Storage has been extracted from react-native core and will be removed in a future release.'
]);

// console.ignoredYellowBox = [ 'Warning: isMounted(...)', 'Require cycle: app/utils'];

AppRegistry.registerComponent(appName, () => App);
