/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Router from './app/router'

export default class App extends Component<{}> {


    onBackPress() {
        if (Actions.state.index === 0) {
            return false
        }
        Actions.pop()
        return true
    }

  render() {
    return (
      <Router />
    );
  }
}

