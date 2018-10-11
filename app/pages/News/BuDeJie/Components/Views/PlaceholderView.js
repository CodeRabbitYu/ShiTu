/**
 * @flow
 * Created by Rabbit on 2018/9/2.
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Placeholder from 'rn-placeholder';

type Props = {
  type: 'image' | 'joke' | 'video' | 'all'
};
export default class PlaceholderView extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ paddingHorizontal: px2dp(20), paddingVertical: px2dp(10) }}>
        <UserInfoPlaceHolderView />
        <ContentPlaceHolderView type={this.props.type} />
        <ToolBarPlaceHolderView />
      </View>
    );
  }
}

const ContentPlaceHolderView = ({ type }: { type: type }) => {
  if (type === 10) {
    return (
      <View style={styles.contentView}>
        <Placeholder.Line
          textSize={FONT_SIZE(20)}
          // color="#ff0000"
          width="70%"
          animate={'fade'}
        />
        <View style={{ marginTop: px2dp(20) }} />
        <Placeholder.Box height={px2dp(400)} width="100%" radius={5} animate={'fade'} />
      </View>
    );
  }

  if (type === 29) {
    return (
      <View style={styles.contentView}>
        <Placeholder.Paragraph
          lineNumber={8}
          textSize={FONT_SIZE(20)}
          lineSpacing={7}
          // color="#ff0000"
          width="100%"
          lastLineWidth="50%"
          firstLineWidth="100%"
          animate={'fade'}
        />
      </View>
    );
  }

  if (type === 41) {
    return (
      <View style={styles.contentView}>
        <Placeholder.Line
          textSize={FONT_SIZE(18)}
          // color="#ff0000"
          width="70%"
          animate={'fade'}
        />
        <View style={{ marginTop: px2dp(20) }} />
        <Placeholder.Box height={px2dp(400)} width="100%" radius={5} animate={'fade'} />
      </View>
    );
  }

  return (
    <View style={styles.contentView}>
      <Placeholder.Line
        textSize={FONT_SIZE(20)}
        // color="#ff0000"
        width="70%"
        animate={'fade'}
      />
      <View style={{ marginTop: px2dp(20) }} />
      <Placeholder.Box height={px2dp(400)} width="100%" radius={5} animate={'fade'} />
    </View>
  );
};

const ToolBarPlaceHolderView = () => {
  return (
    <View style={styles.toolBar}>
      <ToolBarItem />
      <ToolBarItem />
      <ToolBarItem />
      <ToolBarItem />
    </View>
  );
};

const ToolBarItem = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Placeholder.Box height={px2dp(50)} width={SCREEN_WIDTH * 0.234} animate={'fade'} radius={5} />
      <View style={{ marginLeft: px2dp(2) }} />
    </View>
  );
};

const UserInfoPlaceHolderView = () => {
  return (
    <View style={styles.userInfo}>
      <View style={styles.icon}>
        <Placeholder.Media size={px2dp(80)} hasRadius animate={'fade'} />
      </View>

      <View style={styles.userInfoContent}>
        <Placeholder.Line
          textSize={FONT_SIZE(20)}
          // color="#ff0000"
          width="60%"
          animate={'fade'}
        />
        <View style={{ marginTop: px2dp(10) }} />
        <Placeholder.Line textSize={FONT_SIZE(16)} width="30%" animate={'fade'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    marginTop: px2dp(20)
  },
  userInfoContent: {
    height: px2dp(80),
    marginLeft: px2dp(16),
    width: SCREEN_WIDTH - px2dp(80) - px2dp(40 + 16),
    paddingVertical: px2dp(5)
  },
  contentView: {
    paddingVertical: px2dp(24)
  },

  toolBar: {
    height: px2dp(60),
    width: SCREEN_WIDTH - px2dp(40),
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth / 2,
    borderTopColor: '#ddd',
    // backgroundColor: 'blue',
    paddingVertical: px2dp(10)
  }
});
