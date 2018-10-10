/**
 * @flow
 * Created by Rabbit on 2018/7/11.
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';
const { width } = Dimensions.get('window');

const basePx = Platform.OS === 'ios' ? 750 : 720;

export const Px2Dp = function px2dp(px: number): number {
  const layoutSize = (px / basePx) * width;

  return PixelRatio.roundToNearestPixel(layoutSize);
};
