/**
 * Created by Rabbit on 2018/4/12.
 */

import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window');

export default {
  width,
  height,
  iOS: Platform.OS === 'ios',
  Android: Platform.OS === 'android',

}