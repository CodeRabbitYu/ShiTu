/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

type Props = {};
export class Gank extends Component<Props> {


  render() {
    return (
      <View style={styles.container}>
        <Text>Gank</Text>

        <Button title={'123'}
                onPress={()=>alert('123')}
                color={'red'}
                accessibilityLabel="Learn more about this purple button"
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