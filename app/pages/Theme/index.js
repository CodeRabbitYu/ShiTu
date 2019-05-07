/**
 * @flow
 * Created by Rabbit on 2019-04-29.
 */
import React, { useContext, useState } from 'react';
import { StyleSheet, Switch } from 'react-native';
import BaseContainer from '../../components/BaseContainer';
import { Button } from '../../components';
import { StoreContext } from '../../utils/Tool';
import Themes from '../../resource/thems';
import DefaultTheme from '../../resource/thems/DefaultTheme';
import CustomTheme from '../../resource/thems/CustomTheme';
import { ListRow } from 'teaset';
import BlackTheme from '../../resource/thems/BlackTheme';

export const ThemeScreen = (props: any) => {
  const store = useContext(StoreContext);
  const { themeStore } = store;

  const [state, setState] = useState();
  const [value, setValue] = useState(true);

  const backgroundColor = themeStore.themes.btnColor;
  const labelColor = themeStore.themes.labelTextColor;

  return (
    <BaseContainer
      style={styles.container}
      backButtonPress={() => {
        props.navigation.goBack();
        props.navigation.navigate('ShiTu');
      }}
    >
      <ListRow
        title={'是否开启渐变色导航栏'}
        detail={
          <Switch
            value={value}
            onValueChange={value => {
              console.log(value);
              // themeStore.themes.isGradientNavigationBar = value;
              // DefaultTheme.isGradientNavigationBar = value;
              // CustomTheme.isGradientNavigationBar = value;
              // BlackTheme.isGradientNavigationBar = value;
              // themeStore.setThemes(themeStore.themes);

              themeStore.setSingleThemes('isGradientNavigationBar', value);

              setValue(value);
            }}
          />
        }
      />
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
        title={'更换自定义主题'}
        style={[styles.buttonStyle, { backgroundColor }]}
        titleStyle={{ color: labelColor }}
        onPress={() => {
          CustomTheme.navStartColor = 'orange';
          CustomTheme.navEndColor = 'red';
          CustomTheme.safeAreaViewBottomColor = 'blue';
          CustomTheme.gradientStartColor = 'orange';
          CustomTheme.gradientEndColor = 'red';
          CustomTheme.tabBarColor = '#FF8F00';
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
