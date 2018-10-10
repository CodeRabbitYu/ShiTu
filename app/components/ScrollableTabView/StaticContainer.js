import React from 'react';

export default class StaticContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.shouldUpdate;
  }

  render() {
    const child = this.props.children;
    if (child === null || child === false) {
      return null;
    }
    return React.Children.only(child);
  }
}
