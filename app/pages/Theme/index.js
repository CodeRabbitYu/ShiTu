/**
 * @flow
 * Created by Rabbit on 2019-04-29.
 */
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import BaseContainer from '../../components/BaseContainer';
import { Button } from '../../components';
import { StoreContext } from '../../utils/Tool';
import DefaultTheme from '../../resource/thems/DefaultTheme';
import CustomTheme from '../../resource/thems/CustomTheme';

export const ThemeScreen = (props: any) => {
  const store = useContext(StoreContext);
  const { themeStore } = store;

  const [state, setState] = useState();

  const backgroundColor = themeStore.themes.buttonColor;
  const labelColor = themeStore.themes.labelColor;

  return (
    <BaseContainer
      style={styles.container}
      backButtonPress={() => {
        props.navigation.goBack();
        props.navigation.navigate('ShiTu');
      }}
    >
      <Button
        title={'更换黑色主题'}
        style={[styles.buttonStyle, { backgroundColor }]}
        titleStyle={{ color: labelColor }}
        onPress={() => {
          themeStore.setBlackTheme();
          setState({ state });
        }}
      />
      <Button
        title={'更换蓝色主题'}
        style={[styles.buttonStyle, { backgroundColor }]}
        titleStyle={{ color: labelColor }}
        onPress={() => {
          themeStore.setThemes(DefaultTheme);
          setState({ state });
        }}
      />
      <Button
        title={'更换导航栏颜色'}
        style={[styles.buttonStyle, { backgroundColor }]}
        titleStyle={{ color: labelColor }}
        onPress={() => {
          CustomTheme.navColor = 'green';
          themeStore.setThemes(CustomTheme);
          setState({ state });
        }}
      />
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonStyle: {
    height: 44,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
