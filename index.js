import { AppRegistry } from 'react-native';
import App from './app/index';

console.ignoredYellowBox = [ 'Warning: isMounted(...)' ];

AppRegistry.registerComponent('ShiTu', () => App);
