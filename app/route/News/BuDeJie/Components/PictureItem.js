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
import { System }  from "../../../../utils";
import type {Picture} from "../../../../servers/News/interfaces";


type Props = {
  pictureData: Picture;
}
export class PictureItem extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);

    let imageHeight = System.SCREEN_WIDTH * props.pictureData.height / props.pictureData.width;
    // console.log(imageHeight);
    this.state={
      imageHeight: imageHeight,
    };
  }

  render() {
    const { text, cdn_img } = this.props.pictureData;

    return(
      <View style={styles.jokeView}>
        <Text style={styles.jokeText}>{text}</Text>
        <FastImage source={{uri: cdn_img}} style={{width: System.SCREEN_WIDTH - 20, height: this.state.imageHeight}}/>
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