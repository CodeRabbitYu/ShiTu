/**
 * @flow
 * Created by Rabbit on 2019-05-05.
 */
import { Theme } from 'teaset';

export default {
  /**
   * 是否开启异形屏适配
   */
  fitIPhoneX: true,
  /**
   * 导航栏高度
   */
  navBarHeight: Theme.statusBarHeight + Theme.navBarContentHeight,
  /**
   * iphoneX底部高度
   */
  iPhoneXBottomHeight: Theme.isIPhoneX ? 39 : 0,
  /**
   * 透明色
   */
  transparentColor: 'transparent',

  /**
   * 是否开启渐变色导航栏
   * 默认开启
   */
  isGradientNavigationBar: true
};
