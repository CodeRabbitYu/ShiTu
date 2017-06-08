/**
 * Created by Rabbit on 2017/6/6.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text as NativeText, View, StyleSheet, TextInput, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
class RTTextInput extends Component {
    focus() {
        const ref = this.props.textInputRef;
        this.refs[ref].focus();
    }
    blur() {
        const ref = this.props.textInputRef;
        this.refs[ref].blur();
    }

    // constructor
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
            iconName,
            ...attributes
        } = this.props;
        success ? selectionColor = successColor || '#4ECBFC' : selectionColor = '#4ECBFC';
        error ? selectionColor = errorColor || 'red' : null;
        return (
            <View
                ref={containerRef}
                style={[styles.container,
                success ? { borderBottomColor : successColor } :
                error ? { borderBottomColor : errorColor}:
                containerStyle && containerStyle ] }
            >
                <Icon name={iconName}
                      size = {30}
                      color={selectionColor}
                      style={styles.iconStyle}
                      padding={0}
                />
                <TextInput
                    ref={textInputRef}
                    selectionColor={selectionColor}
                    style={[styles.input, inputStyle && inputStyle]}
                    underlineColorAndroid={'transparent'}
                    clearButtonMode={'while-editing'}
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
        marginLeft: 15,
        // marginRight: 15,
        flexDirection:'row',
        borderBottomColor:'#4ECBFC',
        borderBottomWidth: 1,

    },
    input: {
        // underlineColorAndroid:'red',
        marginLeft:5,
        marginRight:10,
        height: iOS?46:46,
        width: SCREEN_WIDTH - 50,
        color: 'blue',
        fontSize: FONT_SIZE(14),
    },
    iconStyle:{
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        height:28,
        width:28,

    }
});

export default RTTextInput;

