/**
 * @flow
 * Created by Rabbit on 2018/9/6.
 */

import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

type Props = {
  style: any
};
const CustomToast = (props: Props) => {
  const { style } = props;
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CustomToast;
