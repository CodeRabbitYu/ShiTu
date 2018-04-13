/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

import { Images } from '../../resource';
import { Button, Theme } from '../../components';

import * as Animatable from 'react-native-animatable';
import {System} from "../../utils";
const AnimationButton = Animatable.createAnimatableComponent(Button);
const AnimationImageBackground = Animatable.createAnimatableComponent(ImageBackground);

type Props = {};
export class ShiTu extends Component<Props> {

  componentDidMount() {
  }

  render() {
    return (
      <AnimationImageBackground style={styles.container}
                                animation="fadeIn"
                                source={Images.default}
                                blurRadius={System.Android ? 5 : 8}
      >
        <AnimationButton title={'点我寻找!'}
                         animation="bounceInLeft"
                         useNativeDriver
                         style={styles.button}
                         titleStyle={styles.buttonTitle}
                         onPress={()=>alert('寻找！')}
        />
      </AnimationImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    padding: 10,
    backgroundColor: '#4ECBFC',
    borderRadius: 5,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
  }
});
