/**
 * Created by Rabbit on 2018/4/13.
 */
import themes from './index';

const mainColor = '#4ECBFC';

export default {
  ...Theme.themes.default,

  themeType: 'default',

  isGradientNavigationBar: true,
  /**
   * 主色调
   */
  mainColor: mainColor,

  /**
   * 导航条颜色
   * 需要关闭渐变色导航
   */
  navColor: mainColor,
  /**
   * 底部Tab颜色
   */
  tabBarColor: mainColor,

  /**
   * 个人中心右上角按钮颜色
   */
  mainPopColor: 'white',

  /**
   * 渐变色按钮初始颜色
   */
  gradientStartColor: 'rgb(13,199,255)',
  /**
   * 渐变色按钮结束颜色
   */
  gradientEndColor: 'rgb(16,174,255)',

  /**
   * 导航栏初始颜色
   */
  navStartColor: 'rgb(13,199,255)',
  /**
   * 导航栏结束颜色
   */
  navEndColor: 'rgb(16,174,255)',

  /**
   * 底部安全区颜色
   */
  safeAreaViewBottomColor: 'white',

  /**
   * 新闻顶部标签选中文字颜色
   */
  newsActiveColor: '#4ECBFC',
  /**
   * 新闻顶部标签文字未选中颜色
   */
  newsInactiveColor: 'black',

  /**
   * 白色
   */
  whiteColor: 'white',

  ...themes
};
