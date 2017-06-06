/**
 * Created by Rabbit on 2017/6/6.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text as NativeText, View, StyleSheet, TextInput } from 'react-native'

class RTTextInput extends Component {
    focus() {
        const ref = this.props.textInputRef;
        this.refs[ref].focus();
    }
    blur() {
        const ref = this.props.textInputRef;
        this.refs[ref].blur();
    }
    render() {
        const {
            containerStyle,
            inputStyle,
            textInputRef,
            containerRef,
            selectionColor,
            ...attributes
        } = this.props;
        return (
            <View
                ref={containerRef}
                style={[styles.container, containerStyle && containerStyle]}
            >
                <TextInput
                    ref={textInputRef}
                    selectionColor={selectionColor || 'blue'}
                    style={[styles.input, inputStyle && inputStyle]}
                    {...attributes}
                />
            </View>
        )
    }
}

RTTextInput.propTypes = {
    containerStyle: View.propTypes.style,
    inputStyle: NativeText.propTypes.style,
    selectionColor: PropTypes.string,
    textInputRef: PropTypes.string,
    containerRef: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: iOS?'red':null,
        borderBottomWidth: iOS?1:null,
        marginLeft: iOS?20:15,
        marginRight: iOS?20:15,
    },
    input: {
        height: iOS?36:46,
        width: SCREEN_WIDTH,
        color: 'blue',
        fontSize: FONT_SIZE(14),
    },
});

export default RTTextInput;

