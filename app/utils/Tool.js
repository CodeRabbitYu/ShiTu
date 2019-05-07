/**
 * @flow
 * Created by Rabbit on 2018/7/11.
 */

import React from 'react';
import { Dimensions, Platform, PixelRatio } from 'react-native';
import type { ConnectionType } from '@react-native-community/netinfo';
const { width } = Dimensions.get('window');

const basePx = Platform.OS === 'ios' ? 750 : 720;

export const Px2Dp = function px2dp(px: number): number {
  const layoutSize = (px / basePx) * width;

  return PixelRatio.roundToNearestPixel(layoutSize);
};

export const getNetInfoStatus = (netInfo: any) => {
  const type: ConnectionType = netInfo.type;
  return {
    isConnect: type.toUpperCase() === 'WIFI' || type.toUpperCase() === 'CELLULAR',
    isWifi: type.toUpperCase() === 'WIFI',
    isCellular: type.toUpperCase() === 'CELLULAR'
  };
};

export const StoreContext = React.createContext({});
