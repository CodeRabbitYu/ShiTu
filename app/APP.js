
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
} from 'react-native';

import ShiTu from './pages/ShiTu';
import Gank from './pages/Gank';
import Detail from './pages/Detail';
import Main from './pages/Main';
const MyTab = TabNavigator({
    ShiTu: {
        screen: ShiTu,
        title:'识兔',
        navigationOptions: {
            tabBar: {
                label: '识兔',
                icon: ({tintColor}) => (
                    <Image
                        source={{uri : '识兔'}}
                        style={[tabBarIcon, {tintColor: tintColor}]}
                    />
                ),
            },
            header: {
                // bool值，header是否可见。
                visible: true,
                // header的title的style
                titleStyle:{fontSize:22,color:'white'},
                // header的style
                style:{backgroundColor:'#4ECBFC'},
                // 返回按钮在iOS平台上，默认是title的值
                // backTitle
            },
        }
    },
    Gank: {
        screen:Gank,
        title: '干货集中营',
        tabBar:{
            label: '干货',
            icon: ({ tintColor }) => (
                <Image
                    source={{uri : '干货'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
        header: {
            // bool值，header是否可见。
            visible: true,
            // header的title的style
            titleStyle:{fontSize:22,color:'white'},
            // header的style
            style:{backgroundColor:'#4ECBFC'},
            // 返回按钮在iOS平台上，默认是title的值
            // backTitle
        },
    },
    Main:{
        screen:Main,
        title: '个人中心',
        tabBar:{
            icon: ({ tintColor }) => (
                <Image
                    source={{uri : '个人中心'}}
                    style={[tabBarIcon, {tintColor: tintColor}]}
                />
            ),
        },
    }

}, {
    tabBarPosition: 'bottom',
    swipeEnabled:true,
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
        inactiveTintColor:'#d81e06',
        // 是否显示label，默认为true
        showLabel:false,
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
        navigationOptions: {
            header: {
                title: '互助',
                style: {
                    backgroundColor: '#fff'
                },
                backTitle: null
            },
            mode:'modal'
        },
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            header: {
                title: '互助',
                style: {
                    backgroundColor: '#fff'
                },
                backTitle: null
            },
            mode:'modal'
        },
        headerMode: 'screen',

    },
}, {
    headerMode: 'screen',
    // mode:'modal'
});

export default MyApp;