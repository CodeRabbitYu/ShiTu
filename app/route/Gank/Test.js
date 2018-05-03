/**
 * Created by Rabbit on 2018/5/2.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

import { FlowList } from '../../components'

type Props = {};
export default class Test extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

        


        <FlatList
          data={[]}
          renderItem={({item, index })=><Text>{item}</Text>}

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});