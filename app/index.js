/**
 * Created by Rabbit on 2017/4/19.
 */
import { AppRegistry } from 'react-native';
import App from './APP';
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
// 关闭全部的警告
//console.disableYellowBox = true;
// 关闭指定的警告
//console.warn('YellowBox is disabled.');

AppRegistry.registerComponent('ShiTu', () => App);