/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import { Dimensions, PixelRatio, Platform } from 'react-native';
import { FontSize } from './FontSize';
import { Px2Dp } from './Tool';
// import Config from './Config';


const {height, width} = Dimensions.get('window');

import {Theme} from 'teaset';

// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;
// 适配字体
global.FONT_SIZE = FontSize;
// 屏幕适配
global.px2dp = Px2Dp;

// global.Config = Config;

global.Theme = Theme;