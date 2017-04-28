/**
 * Created by Rabbit on 2017/4/27.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

@observer
export default class WelfareItem extends Component {
    static navigationOptions = {
        // cardStack- 配置card stack
        cardStack:{
            // 是否允许通过手势关闭该界面，在iOS上默认为true，在Android上默认为false
            gesturesEnabled:true
        },

    };

    @observable
    isShow = false;

    constructor(props){
        super(props);
        this.state = {
            // isShowNav:false,
        }
    }

    _onPress = ()=> {
        console.log('111');
        // !this.state.isShowNav
        this.setState({
            isShow: !this.state.isShow
        });
        // this.isShow = true;
    };

    render() {
        const { state: { params: { url } } } = this.props.navigation;
        // const { isShowNav} = this.state;
        return (
            <TouchableOpacity onPress={this._onPress}>
                {this.state.isShow ?
                    <View>
                        <Image
                            source={{uri:url}}
                            style={{
                        height:SCREEN_HEIGHT-64,
                        width:SCREEN_WIDTH}}
                        />
                    </View>
                    :
                    <Image
                        source={{uri:url}}
                        style={{
                        height:SCREEN_HEIGHT,
                        width:SCREEN_WIDTH}}
                    />
                }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

