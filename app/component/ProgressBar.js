import React, { Component } from 'react'
import { Text, View, StyleSheet, LayoutAnimation } from 'react-native'

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      startDelay: this.props.startDelay || 300,
    }
  }

  componentDidMount() {
      LayoutAnimation.spring();
      setTimeout(() => {
        this.setState({ progress: this.props.progress })
      }, this.state.startDelay)
  }

  componentWillReceiveProps(nextProps) {
      this.setState({ progress: nextProps.progress })
  }

  componentWillUpdate() {
      LayoutAnimation.spring()
  }



  render() {
    return (
        <View style={this.props.style}>
            <View style={[styles.flexBox, styles.progressBar, this.props.style]}>
                <View style={[{ flex: this.state.progress },
                    { backgroundColor: this.props.filledColor || '#D50000' }]} />
                <View style={[{ flex: 100 - this.state.progress },
                    { backgroundColor: this.props.unfilledColor || '#FFF' }]} />
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    flexBox: {
        flexDirection: 'row',
    },
    progressBar: {
        overflow: 'hidden',
        height: 14,
        borderWidth: 1,
        borderColor: '#D50000',
        borderRadius: 10,
    }
});

ProgressBar.PropTypes = {
    style: React.PropTypes.node,
    progress: React.PropTypes.number.isRequired,
    filledColor: React.PropTypes.string,
    unfilledColor: React.PropTypes.string,
    startDelay: React.PropTypes.number,
};
