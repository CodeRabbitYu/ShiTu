/**
 * @flow
 * Created by Rabbit on 2019-03-14.
 */
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StoreContext } from '../../utils/Tool';

export function Hook() {
  // console.log('context', props, context);

  // const StoreContext = React.createContext();
  const store = useContext(StoreContext);

  console.log('store', store);

  const [title, setTitle] = useState('123');
  return (
    <View style={[styles.container]}>
      <Text
        onPress={() => {
          setTitle(store.publicStore.aaa);
        }}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
