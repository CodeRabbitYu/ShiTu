/**
 * @flow
 * Created by Rabbit on 2018/5/21.
 */

import React from 'react';

import { NavigationBar, Theme } from 'teaset';
import LinearGradient from 'react-native-linear-gradient';

import { withNavigation } from 'react-navigation';
import { System } from '../../utils';

export type Props = {
  leftView?: any,
  backButtonPress?: any,
  isTopNavigator?: ?boolean,
  isNotBackground?: boolean,
  background?: any,
  ...NavigationBar.props
};

class NavigatorBar extends React.PureComponent<Props> {
  static defaultProps = {
    isTopNavigator: false,
    isNotBackground: false
  };

  constructor(props: Props) {
    super(props);
  }

  backButtonPress = () => {
    const { backButtonPress } = this.props;
    if (backButtonPress) {
      backButtonPress();
    } else {
      this.props.navigation.goBack();
    }
  };

  renderLeftView = () => {
    const { isTopNavigator, leftView } = this.props;
    let left;
    if (isTopNavigator || leftView) {
      left = leftView;
    } else {
      left = <NavigationBar.BackButton title="返回" onPress={this.backButtonPress} />;
    }
    return left;
  };

  render() {
    return (
      <NavigationBar
        leftView={this.renderLeftView()}
        // background={
        //   !this.props.isNotBackground ? (
        //     <LinearGradient
        //       start={{ x: 0.0, y: 0.25 }}
        //       end={{ x: 0.5, y: 1.0 }}
        //       locations={[0, 1]}
        //       // colors={['rgb(13,199,255)', 'rgb(16,174,255)']}
        //       colors={['rgb(255,255,255)', 'rgb(16,174,255)']}
        //       style={{
        //         height: Theme.statusBarHeight + Theme.navBarContentHeight
        //       }}
        //     />
        //   ) : (
        //     this.props.background
        //   )
        // }
        titleStyle={{
          fontSize: System.iOS ? 23 : 20,
          color: 'white',
          fontWeight: 'bold'
        }}
        statusBarStyle={'light-content'}
        {...this.props}
      />
    );
  }
}

export default withNavigation(NavigatorBar);

// const styles = StyleSheet.create({
// 	container: {
// 		// flex: 1,
// 		...StyleSheet.absoluteFill,
// 		height: 64,
//
// 		backgroundColor: 'red',
// 	},
// });
