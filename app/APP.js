
/**
 * Created by Rabbit on 2017/4/19.
 */
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
} from 'react-native';

import ShiTu from './pages/ShiTu';
import Gank from './pages/Gank';
import Detail from './pages/Detail';
import Main from './pages/Main';

import WelfareContainer from './pages/WelfareContainer'
import SearchHistory from './pages/SearchHistory';
import WelfarePicture from './pages/WelfarePicture';

import Button from './component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

const MyTab = TabNavigator({
    ShiTu: {
        screen: ShiTu,
        navigationOptions:{
            title:'hshs',
            tabBarLabel: '识兔',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={{uri : '识兔'}}
                    style={[tabBarIcon, {tintColor: tintColor}]}
                />
            ),
            headerTitle:'识兔',
            // header的title的style
            headerTitleStyle:{fontSize:FONT_SIZE(20),color:'white'},
            // header的style
            headerStyle:{backgroundColor:'#4ECBFC'},
        },
    },

    Gank: {
        screen:Gank,
        // title: '干货集中营',
        navigationOptions: {
            tabBarLabel: '干货',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={{uri : '干货'}}
                    style={[tabBarIcon, {tintColor: tintColor}]}
                />
            ),
            headerTitle: '干货集中营',
            // bool值，header是否可见。
            visible: true,
            // header的title的style
            headerTitleStyle:{fontSize:FONT_SIZE(20),color:'white'},
            // header的style
            headerStyle:{backgroundColor:'#4ECBFC'},
        },


    },
    Main:{
        screen:Main,
        navigationOptions: {
            tabBarLabel: '个人中心',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={{uri : '个人中心'}}
                    style={[tabBarIcon, {tintColor: tintColor}]}
                />
            ),
            headerTitle: '个人中心',
            // bool值，header是否可见。
            visible: true,
            // header的title的style
            headerTitleStyle:{fontSize:FONT_SIZE(20),color:'white'},
            // header的style
            headerStyle:{backgroundColor:'#4ECBFC'},
            // 返回按钮在iOS平台上，默认是title的值
            headerBackTitle: null
        },
    },

}, {
    tabBarPosition: 'bottom',
    swipeEnabled:false,
    animationEnabled:false,
    tabBarOptions: {
        // tabbar上label的style
        labelStyle: {
        },
        // tabbar的style
        style: {
            height:49
        },
        // label和icon的背景色 活跃状态下
        activeBackgroundColor:'white',
        // label和icon的前景色 活跃状态下（选中）
        activeTintColor:'#4ECBFC',
        // label和icon的背景色 不活跃状态下
        inactiveBackgroundColor:'white',
        // label和icon的前景色 不活跃状态下(未选中)
        inactiveTintColor:'#aaa',
        // 是否显示label，默认为true
        showLabel:true,
        // 不透明度为按选项卡(iOS和Android < 5.0)
        pressOpacity:0.3,

        indicatorStyle :{
            backgroundColor:'blue',
        }
    }
});

const MyApp = StackNavigator({
    MyTab: {
        screen: MyTab,
    },
    Detail: {
        screen: Detail,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    SearchHistory:{
        screen:SearchHistory,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },

    WelfarePicture:{
        screen:WelfarePicture,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },

}, {
    headerMode: 'screen',
    // mode:'modal'
});

const  StackOptions = ({navigation}) => {
    console.log(navigation);
    let {state,goBack} = navigation;

    let headerHeight;

    const visible= state.params.isVisible;
    let header;
    if (visible === true){
        header = null;
    }

    const headerStyle = {backgroundColor:'#4ECBFC'};
    const headerTitle = state.params.title;
    const headerTitleStyle = {fontSize:FONT_SIZE(20),color:'white',fontWeight:'500'}
    const headerBackTitle = false;
    const headerLeft = (
        <Button
            isCustom={true}
            customView={
                            <Icon
                                name='ios-arrow-back'
                                size={30}
                                color='white'
                                style={{marginLeft:13}}
                            />
                        }
            onPress={()=>{goBack()}}
        />
    );


    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header}
};




export default MyApp;