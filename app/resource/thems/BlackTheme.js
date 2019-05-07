/**
 * @flow
 * Created by Rabbit on 2018/4/13.
 */

import themes from './DefaultTheme';

const mainColor = 'black';

export default {
  ...themes,
  ...Theme.themes.black,

  themeType: 'black',

  mainColor: mainColor,

  navColor: mainColor,
  tabBarColor: mainColor,

  mainPopColor: 'white',

  navStartColor: 'red',
  navEndColor: mainColor,

  gradientStartColor: mainColor,
  gradientEndColor: mainColor,

  safeAreaViewBottomColor: mainColor,

  newsActiveColor: 'white',

  newsInactiveColor: 'red',

  whiteColor: 'black',

  btnColor: mainColor
};
