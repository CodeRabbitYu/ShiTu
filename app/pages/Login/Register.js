/**
 * @flow
 * Created by Rabbit on 2018/9/17.
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import BaseContainer from '../../components/BaseContainer';
import Button from '../../components/Button';

type Props = {
  navigation: any
};
export class Register extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <BaseContainer style={styles.container} title={'注册'}>
        <Button
          title={'点我跳转'}
          onPress={() => {
            this.props.navigation.push('Login');
          }}
        />
      </BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
