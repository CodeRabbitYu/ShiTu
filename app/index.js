/**
 * Created by Rabbit on 2017/4/19.
 */
import { AppRegistry } from 'react-native';
import App from './APP';

if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}

AppRegistry.registerComponent('ShiTu', () => App);