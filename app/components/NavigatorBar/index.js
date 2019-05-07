/**
 * @flow
 * Created by Rabbit on 2018/5/21.
 */

import React, { useContext } from 'react';

import { NavigationBar, Theme } from 'teaset';
import LinearGradient from 'react-native-linear-gradient';

import { System } from '../../utils';
import { StoreContext } from '../../utils/Tool';
import NavigationModule from '../../utils/NavigationModule';

export type Props = {
  leftView?: any,
  backButtonPress?: any,
  isTopNavigator?: ?boolean,
  isNotBackground?: boolean,
  background?: any,
  ...NavigationBar
};

const NavigatorBar = (props: Props) => {
  const store = useContext(StoreContext);
  const { themes } = store.themeStore;

  const { isNotBackground = false } = props;

  function backButtonPress() {
    const { backButtonPress } = props;
    if (backButtonPress) {
      backButtonPress();
    } else {
      NavigationModule.goBack();
    }
  }

  function renderLeftView() {
    const { isTopNavigator, leftView } = props;
    let left;
    if (isTopNavigator || leftView) {
      left = leftView;
    } else {
      left = <NavigationBar.BackButton title="返回" onPress={backButtonPress} />;
    }
    return left;
  }

  const isGradientNavigationBar: boolean = themes.isGradientNavigationBar;

  // console.log('isGradientNavigationBar', themes.isGradientNavigationBar);
  // console.log('!props.isNotBackground', !props.isNotBackground);

  return (
    <NavigationBar
      leftView={renderLeftView()}
      background={
        isGradientNavigationBar ? (
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 1]}
            colors={[Theme.navStartColor, Theme.navEndColor]}
            // colors={['red', Theme.navEndColor]}
            style={{
              height: Theme.statusBarHeight + Theme.navBarContentHeight
            }}
          />
        ) : (
          props.background
        )
      }
      titleStyle={{
        fontSize: System.iOS ? 23 : 20,
        color: 'white',
        fontWeight: 'bold'
      }}
      statusBarStyle={'light-content'}
      {...props}
    />
  );
};

export default NavigatorBar;

// const styles = StyleSheet.create({
// 	container: {
// 		// flex: 1,
// 		...StyleSheet.absoluteFill,
// 		height: 64,
//
// 		backgroundColor: 'red',
// 	},
// });
