/**
 * Created by wufeng on 2017/1/4.
 */
import React, {
    Component
} from 'react'

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
    Text,
    ListView,
    PixelRatio,
    Platform,
    Image
} from 'react-native'

import Dimensions from 'Dimensions'
const {width, height} = Dimensions.get('window');

/**
 * 确认框
 * 传过来的参数:
 * {
 *     leftButtonText: '',// 左边按钮的文字
 *     onLeftClick: function,// 点击左边按钮的回调
 *     rightButtonText: '',// 右边按钮的文字
 *     onRightClick: function,// 点击右边按钮的回调
 *     title: "",// 标题
 *     message: "",// 提示信息
 * }
 */
export default class AlertModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            leftButtonText: props.leftButtonText,
            rightButtonText: props.rightButtonText,
            title: props.title,
            message: props.message,
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => this.hide(false)}>
                <View style={modalStyle.container}>
                    <View style={modalStyle.dialogContainer}>
                        {this.state.title ?
                            <Text style={modalStyle.dialogTitle}>{this.state.title}</Text> : null
                        }
                        <Text style={[modalStyle.dialogPrompt, this.props.messageStyle]}>{this.state.message}</Text>
                        <View style={modalStyle.buttonContainer}>
                            {this.state.leftButtonText ?
                                <TouchableOpacity
                                    onPress={() => this.props.onLeftClick()}
                                    style={[modalStyle.dialogConfirmButton, modalStyle.leftButton]}>
                                    <Text style={modalStyle.dialogConfirmButtonText}>{this.state.leftButtonText}</Text>
                                </TouchableOpacity>
                                : null
                            }
                            <TouchableOpacity
                                onPress={() => this.props.onRightClick()}
                                style={[modalStyle.dialogConfirmButton, modalStyle.rightButton, this.state.leftButtonText ? {} : modalStyle.leftButton]}>
                                <Text style={modalStyle.dialogConfirmButtonText}>{this.state.rightButtonText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    setLeftText(leftButtonText) {
        this.setState({
            leftButtonText: leftButtonText
        })
    }

    setRightText(rightButtonText) {
        this.setState({
            rightButtonText: rightButtonText
        })
    }

    setTitle(title) {
        this.setState({
            title: title
        })
    }

    setMessage(message) {
        this.setState({
            message: message
        })
    }

    /**
     * 显示
     */
    show() {
        this.setState({
            modalVisible: true,
        })
    }

    /**
     * 隐藏
     */
    hide() {
        this.setState({
            modalVisible: false,
        })
    }

}

var modalStyle = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogContainer: {
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    dialogTitle: {
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        marginTop:15,
        marginBottom: -12,
        marginLeft:10,
        marginRight:10,
        fontWeight:'900',
        color:'#333333',
    },
    dialogPrompt: {
        fontSize: 14,
        marginTop: 16,
        marginBottom: 16,
        alignSelf: 'center',
        marginLeft:29,
        marginRight:29,
        fontWeight:'100',
        lineHeight:22,
        color:'black',
        textAlign:'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    dialogConfirmButton: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#aaaaaa',
    },
    leftButton: {
        borderBottomLeftRadius: 8,
        marginRight: -(1 / PixelRatio.get()),
        borderRightWidth: 0
    },
    rightButton: {
        borderBottomRightRadius: 8,
    },
    buttonVerticalLine: {
        backgroundColor: '#aaaaaa',
        width: 1,
    },
    buttonHorizontalLine: {
        backgroundColor: '#aaaaaa',
        height: 1,
    },
    dialogConfirmButtonText: {
        color: '#007aff',
        fontSize: 16,
    }
});