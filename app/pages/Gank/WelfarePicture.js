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

import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

@observer
export default class WelfareItem extends Component {
    static navigationOptions = {
        // cardStack- 配置card stack
        cardStack:{
            // 是否允许通过手势关闭该界面，在iOS上默认为true，在Android上默认为false
            gesturesEnabled:false
        },

    };

    @observable
    isShow = false;

    componentDidMount(){
        this.props.navigation.setParams({title:'hahahahaha'});
        // this.props.navigation.setParams({ headerLeft:({ navigation ,goBack})=>(
        //     <TouchableOpacity onPress={()=>{goBack('Main')}}>
        //         <Text>hahaha</Text>
        //     </TouchableOpacity>
        // )
        // });
        console.log(this.props.navigation);
    }

    constructor(props){
        super(props);
        this.state = {
            // isShowNav:false,
        }
    }

    _onPress = ()=> {
        // !this.state.isShowNav
        this.setState({
            isShow: !this.state.isShow
        });
        // this.isShow = true;
    };

    render() {
        const { state: { params: { url ,title } } } = this.props.navigation;
        // const { isShowNav} = this.state;
        console.log(this.props.navigation);

        let style ;
        this.state.isShow ?
            style={width:SCREEN_WIDTH,height:SCREEN_HEIGHT-64}
            : {width:SCREEN_WIDTH,height:SCREEN_HEIGHT}

        return (
            <TouchableOpacity onPress={this._onPress} activeOpacity={1}>
                {this.state.isShow ?
                    <View style={{height:64,backgroundColor:'#4ECBFC',flexDirection:'row'}}>
                        <Button
                            isCustom={true}
                            customView={
                            <Icon
                                name='ios-arrow-back'
                                size={30}
                                color='white'
                                style={{marginLeft:iOS?0:12,marginTop:27}}
                            />
                        }
                            style={{marginLeft:12}}
                            onPress={()=>{this.props.navigation.goBack()}}
                        />
                        <Text style={styles.navTitleStyle}>{title}</Text>
                    </View>
                    :null
                }
                    <Image
                        source={{uri:url}}
                        style={[{
                        height:SCREEN_HEIGHT,
                        width:SCREEN_WIDTH},style]}
                    />

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    navTitleStyle:{
        // alignItems:'center',
        color:'white',
        fontSize:FONT_SIZE(20),

        height:64,
        width:SCREEN_WIDTH - 47,
        // alignSelf:'center',
        // alignItems:'center',
        // justifyContent:'center',
        textAlign:'center',
        marginTop:30,
        fontWeight:'500'
    }
});

