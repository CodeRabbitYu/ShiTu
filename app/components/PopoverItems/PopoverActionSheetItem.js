/**
 * @flow
 * Created by Rabbit on 2018/10/15.
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Theme from 'teaset/themes/Theme';

type Props = {
  type: 'default' | 'cancel',
  title: string,
  topSeparator: 'none' | 'full' | 'indent',
  bottomSeparator: 'none' | 'full' | 'indent',
  disabled: boolean,
  ...TouchableOpacity
};

export default class ActionSheetItem extends Component<Props> {
  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    type: 'default',
    topSeparator: 'none',
    bottomSeparator: 'none',
    disabled: false
  };

  buildProps() {
    let { style, title, topSeparator, bottomSeparator, activeOpacity, ...others } = this.props;

    const { type, disabled, onPress } = this.props;

    style = [
      {
        backgroundColor: type === 'cancel' ? Theme.asCancelItemColor : Theme.asItemColor,
        paddingLeft: Theme.asItemPaddingLeft,
        paddingRight: Theme.asItemPaddingRight,
        paddingTop: Theme.asItemPaddingTop,
        paddingBottom: Theme.asItemPaddingBottom,
        minHeight: Theme.asItemMinHeight,
        overflow: 'hidden',
        justifyContent: 'center'
      }
    ].concat(style);

    let textStyle, separatorStyle;
    if (type === 'cancel') {
      textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'red',
        fontSize: Theme.asCancelItemFontSize,
        textAlign: Theme.asCancelItemTitleAlign,
        opacity: disabled ? Theme.asItemDisabledOpacity : 1,
        overflow: 'hidden'
      };
      separatorStyle = {
        backgroundColor: Theme.asCancelItemSeparatorColor,
        height: Theme.asCancelItemSeparatorLineWidth
      };
    } else {
      textStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: Theme.asItemTitleColor,
        fontSize: Theme.asItemFontSize,
        textAlign: Theme.asItemTitleAlign,
        opacity: disabled ? Theme.asItemDisabledOpacity : 1,
        overflow: 'hidden'
      };
      separatorStyle = {
        backgroundColor: Theme.asItemSeparatorColor,
        height: Theme.asItemSeparatorLineWidth
      };
    }

    if ((title || title === '' || title === 0) && !React.isValidElement(title)) {
      title = (
        <Text style={textStyle} numberOfLines={1}>
          {title}
        </Text>
      );
    }

    const indentViewStyle = {
      backgroundColor: StyleSheet.flatten(style).backgroundColor,
      paddingLeft: Theme.asItemPaddingLeft
    };
    switch (topSeparator) {
      case 'none':
        topSeparator = null;
        break;
      case 'full':
        topSeparator = <View style={separatorStyle} />;
        break;
      case 'indent':
        topSeparator = (
          <View style={indentViewStyle}>
            <View style={separatorStyle} />
          </View>
        );
        break;
    }
    switch (bottomSeparator) {
      case 'none':
        bottomSeparator = null;
        break;
      case 'full':
        bottomSeparator = <View style={separatorStyle} />;
        break;
      case 'indent':
        bottomSeparator = (
          <View style={indentViewStyle}>
            <View style={separatorStyle} />
          </View>
        );
        break;
    }

    if (disabled) activeOpacity = 1;

    this.props = {
      style,
      type,
      title,
      topSeparator,
      bottomSeparator,
      disabled,
      activeOpacity,
      onPress,
      ...others
    };
  }

  render() {
    this.buildProps();

    const { style, title, topSeparator, bottomSeparator, ...others } = this.props;
    return (
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        {topSeparator}
        <TouchableOpacity style={style} {...others}>
          {title}
        </TouchableOpacity>
        {bottomSeparator}
      </View>
    );
  }
}
