/**
 * Created by Rabbit on 2017/6/6.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text as NativeText, View, StyleSheet, TextInput, Platform } from 'react-native'

class RTTextInput extends Component {
    focus() {
        const ref = this.props.textInputRef;
        this.refs[ref].focus();
        this.refs.containerRef.style = {
            backgroundColor:'red'
        }
    }
    blur() {
        const ref = this.props.textInputRef;
        this.refs[ref].blur();
    }

    constructor
    render() {
        let {
            containerStyle,
            inputStyle,
            textInputRef,
            containerRef,
            selectionColor,
            success,
            successColor,
            error,
            errorColor,
            ...attributes
        } = this.props;
        success || true ? selectionColor = successColor || 'red' : selectionColor = 'blue';
        error ? selectionColor = errorColor || 'red' : null;
        // alert(selectionColor);
        alert(successColor);
        return (
            <View
                ref={containerRef}
                style={[styles.container,
                success ? { borderBottomColor : successColor } :
                error ? { borderBottomColor : errorColor}:
                containerStyle && containerStyle ] }
            >
                <TextInput
                    ref={textInputRef}
                    selectionColor={selectionColor}
                    style={[styles.input, inputStyle && inputStyle]}
                    underlineColorAndroid={selectionColor}
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
    success:PropTypes.bool,
    successColor:PropTypes.string,
    error:PropTypes.bool,
    errorColor:PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        // marginLeft: 15,
        // marginRight: 15,

        ...Platform.select({
            ios: {
                borderBottomColor:'purple',
                borderBottomWidth: 1,
                // marginLeft: 20,
                // marginRight: 20,
            },
        }),
    },
    input: {
        // underlineColorAndroid:'red',
        height: iOS?36:46,
        width: SCREEN_WIDTH,
        color: 'blue',
        fontSize: FONT_SIZE(14),
    },
});

export default RTTextInput;

