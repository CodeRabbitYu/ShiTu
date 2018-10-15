/**
 * @flow
 * Created by Rabbit on 2018/10/9.
 */

import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Theme from 'teaset/themes/Theme';

type Props = {
  style: any,
  title: any,
  accessory: any,
  selected: any,
  props: any
};
export default class PopoverPickerViewItem extends React.Component<Props> {
  buildProps() {
    let { style, title, accessory, ...props } = this.props;
    const { selected } = this.props;

    const accessorySource = require('teaset/icons/check.png');

    style = [
      {
        backgroundColor: Theme.poppItemColor,
        paddingLeft: Theme.poppItemPaddingLeft,
        paddingRight: Theme.poppItemPaddingRight,
        paddingTop: Theme.poppItemPaddingTop,
        paddingBottom: Theme.poppItemPaddingBottom,
        borderColor: Theme.poppItemSeparatorColor,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }
    ].concat(style);
    const imageStyle = {
      width: Theme.poppAccessoryWidth,
      height: Theme.poppAccessoryHeight,
      tintColor: Theme.poppAccessoryCheckColor
    };
    accessory = (
      <View style={{ paddingLeft: Theme.poppAccessoryPaddingLeft }}>
        <Image style={imageStyle} source={selected ? accessorySource : null} />
      </View>
    );
    if (typeof title === 'string' || typeof title === 'number') {
      const titleStyle = {
        color: Theme.poppItemTitleColor,
        fontSize: Theme.poppItemFontSize,
        overflow: 'hidden',
        flexGrow: 1,
        flexShrink: 1
      };
      title = (
        <Text style={titleStyle} numberOfLines={1}>
          {title}
        </Text>
      );
    }

    this.props = { style, title, accessory, selected, ...props };
  }

  render() {
    this.buildProps();

    const { title, accessory, ...props } = this.props;
    return (
      <TouchableOpacity {...props}>
        {title}
        {accessory}
      </TouchableOpacity>
    );
  }
}
