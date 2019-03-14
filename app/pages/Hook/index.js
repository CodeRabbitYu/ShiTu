/**
 * @flow
 * Created by Rabbit on 2019-03-14.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Main = () => {
  const [title, setTitle] = useState('123');
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          setTitle('4444');
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
