/**
 * Created by Rabbit on 2017/6/26.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AppState,
    Image,
    TextInput,
} from 'react-native';

import TestItem from './TestItem';

export  default  class App extends Component {

    static navigationOptions = {
        tabBarVisible:false,
        // header:null,
    }

    constructor(props){
        super(props);
        this.state = {
            currentAppState: AppState.currentState,
        };
    }

   

    render() {
        return (
            <View style={styles.container}>
                <View style={{width:SCREEN_WIDTH,height:50,backgroundColor:'#f7f7f7',flexDirection:'row'}}>
                    <Text>11111</Text>
                    <Image style={{height:40,width:40,backgroundColor:'red',
                    //alignSelf:'center',
                    justifyContent:'space-between',
                    //alignItems:'flex-end',
                    alignContent:'space-between'
                    }}/>
                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop:25
    },
});