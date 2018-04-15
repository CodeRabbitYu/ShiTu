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
  StatusBar
} from 'react-native';

import * as Animatable from 'react-native-animatable';
const AnimationButton = Animatable.createAnimatableComponent(Button);
const AnimationImageBackground = Animatable.createAnimatableComponent(ImageBackground);

import { Images } from '../../resource';
import { Button, Theme } from '../../components';
import { System } from "../../utils";

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
        <StatusBar translucent={true} backgroundColor={Theme.mainColor}/>
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
