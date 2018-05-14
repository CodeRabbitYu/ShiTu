/**
 * @flow
 * Created by Rabbit on 2018/5/14.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {RTBDJList} from "../../../../servers/News/types";

export const JokeItem = (props: RTBDJList) => {
  const { text } = props;
  return(
    <View style={styles.jokeView}>
      <Text style={styles.jokeText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  jokeView: {
    marginHorizontal: 10,
    // marginTop: 3,
    marginVertical: 5,
  },
  jokeText: {
    lineHeight: 22,
    fontSize: 17,
  }
});