
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
                title:'识兔',
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
        // title: '干货集中营',
        navigationOptions: {
            tabBar: {
                label: '干货',
                icon: ({tintColor}) => (
                    <Image
                        source={{uri : '干货'}}
                        style={[tabBarIcon, {tintColor: tintColor}]}
                    />
                ),
            },
            header: {
                title: '干货集中营',
                // bool值，header是否可见。
                visible: true,
                // header的title的style
                titleStyle: {fontSize: 22, color: 'white'},
                // header的style
                style: {backgroundColor: '#4ECBFC'},
                // 返回按钮在iOS平台上，默认是title的值
                // backTitle
            },
        }
    },
    Main:{
        screen:Main,
        navigationOptions: {
            tabBar: {
                label: '个人中心',
                icon: ({tintColor}) => (
                    <Image
                        source={{uri : '个人中心'}}
                        style={[tabBarIcon, {tintColor: tintColor}]}
                    />
                ),
            },
            header: {
                title: '个人中心',
                // bool值，header是否可见。
                visible: true,
                // header的title的style
                titleStyle: {fontSize: 22, color: 'white'},
                // header的style
                style: {backgroundColor: '#4ECBFC'},
                // 返回按钮在iOS平台上，默认是title的值
                backTitle: null
            },
        }
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
        mode:'modal'
    },
    Detail: {
        screen: Detail,
        navigationOptions:{
            header: ({ state, setParams ,goBack}) => StackHeader({ state, setParams ,goBack})
        }
    },
    SearchHistory:{
        screen:SearchHistory,
        navigationOptions: {
            header: ({ state, setParams ,goBack}) => StackHeader({ state, setParams ,goBack})
        }
    },

    WelfarePicture:{
        screen:WelfarePicture,
        navigationOptions:{
            header: ({ state, setParams ,goBack}) => StackHeader({ state, setParams ,goBack})
        }
    },

}, {
    headerMode: 'screen',
    // mode:'modal'
});

export const StackHeader = ({state, setParams ,goBack}) => {
    let title = (
        <Text style={{fontSize:22,color:'white'}}>{state.params.title}</Text>
    );
    style={backgroundColor:'#4ECBFC'};
    visible= state.params.isVisible;
    let left = (
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
    return  {title,style ,visible, left};
};



export default MyApp;