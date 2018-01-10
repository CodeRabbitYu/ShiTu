
import { Dimensions, AsyncStorage, PixelRatio, Platform, Alert } from 'react-native';

// 项目中的图片可以通过Images.xxx 获取
// import { Images } from '../Resources/index';

// 统一管理项目中的路由
import { Actions } from "react-native-router-flux";

// 处理安卓，iOS字体不同的类，使用方法 fontSize:FONT_SIZE(20)
import FontSize from './FontSize';
// 处理安卓，iOS宽高的区别，使用方法 width:px2dp(20)
import { px2dp } from './Tool';

// 自定义的StyleSheet
import { StyleSheet } from './StyleSheet'

// teaset中提供的一些常用方法
import { Theme, Toast } from 'teaset';

// 基于react-native-fetch-blob封装的网络请求
import RTRequest from '../Request/Fetch';
// 配置文件，可以放网络请求等
import Config from './Config';

// 通过系统API获得屏幕宽高
let { height, width } = Dimensions.get('window');

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
global.px2dp = px2dp;
// 主题
global.Theme = Theme;
// 网络请求
global.RTRequest = RTRequest;
// 配置
global.Config = Config;
// router跳转的方法
global.Actions = Actions;
// 图片加载
// global.Images = Images;
// 弹出框
global.Alert = Alert;
// 存储
global.AsyncStorage = AsyncStorage;
// 弹框Toast
global.Toast = Toast;
// 自定义StyleSheet
global.StyleSheet = StyleSheet;

