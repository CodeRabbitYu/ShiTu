/**
 * Created by Rabbit on 2018/5/14.
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {FastImage} from '../../../../components';
import {RTBDJList} from "../../../../servers/News/types";

type Props<RTBDJList> = {
  text: string;
  image0: string;
}
export default class PictureItem extends PureComponent<Props<RTBDJList>> {

  constructor(props: Props<RTBDJList>) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { text, image0 } = props;

    return(
      <View style={styles.jokeView}>
        <Text>{text}</Text>
        <FastImage source={{uri: image0}} style={}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  jokeView: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  jokeText: {
    lineHeight: 22,
    fontSize: 17,
  }
});