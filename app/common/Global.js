/**
 * Created by Rabbit on 2017/4/20.
 */
import React, { Component } from 'react';
import { Dimensions, StyleSheet, PixelRatio, Platform } from 'react-native';
import FontSize from '../component/TextSize';
import Colors from '../component/Colors';
import { px2dp } from './Tool';

import ImageResizer from 'react-native-image-resizer';

let {height, width} = Dimensions.get('window');

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
// 常用颜色
global.COLORS = Colors;
// 适配字体
global.FONT_SIZE = FontSize;
// 用户登录状态
global.TOKEN = false;
// 屏幕适配
global.px2dp = px2dp;
// 图片压缩
global.ImageResizer = ImageResizer;
// TabBarIcon图标大小
global.TabBarIcon = {
    width:35,
    height:35,
};



