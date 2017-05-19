
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
    AsyncStorage
} from 'react-native';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import ShiTu from './pages/ShiTu/ShiTu';
import Gank from './pages/Gank/Gank';
import WebViewDetail from './pages/Component/WebViewDetail';
import Main from './pages/Main/Main';
import SearchHistory from './pages/Main/SearchHistory';
import WelfarePicture from './pages/Gank/WelfarePicture';

import Button from './component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './pages/Login/Login';
import Test from './pages/Component/test';

const ShiTuIcon = require('./resources/ShiTu.png');
const GankIcon = require('./resources/Gank.png');
const MainIcon = require('./resources/Main.png');



// 为了实现登录的modal效果,所以将ShiTu页面单独拆分出来.
// 推荐除了Login的页面,其他的都不要写在里面
const ShiTuStack = StackNavigator({
    ShiTu:{
        screen:ShiTu,
        navigationOptions: ()=> TabOptions('识兔',ShiTuIcon,ShiTuIcon,'识兔'),
    },
    Login:{
        screen:Login,
        navigationOptions:{
            headerTitle:'Login',
        }
    }
},{
    mode:'modal',
});

// 为了实现登录的modal效果,所以将Gank页面单独拆分出来.
const GankStack = StackNavigator({
    Gank:{
        screen:Gank,
        navigationOptions: ()=> TabOptions('干货',GankIcon,GankIcon,'干货集中营'),
    },
    Login:{
        screen:Login,
        navigationOptions:{
            headerTitle:'Login',
        }
    }
},{
    mode:'modal',
});
//// 为了实现登录的modal效果,所以将Main页面单独拆分出来.
const MainStack = StackNavigator({
    Main:{
        screen:Main,
        // navigationOptions: ()=> TabOptions('个人中心',MainIcon,MainIcon,'个人中心'),
    },
    Login:{
        screen:Login,
        navigationOptions: ({navigation}) => LoginOptions({navigation})
    }
},{
    mode:'modal',
});

const MyTab = TabNavigator({
    ShiTuStack: {
        screen: ShiTuStack,
        /**
        navigationOptions:{
            tabBarLabel: '识兔',
            tabBarIcon: ({tintColor,focused}) => (
                focused
                    ?
                    <Image
                        source={{uri : '识兔'}}
                        style={[tabBarIcon, {tintColor: tintColor}]}
                    />
                    :
                    <Image
                        source={{uri : '干货'}}
                        style={[tabBarIcon, {tintColor: tintColor}]}
                    />
            ),
            headerTitle:'识兔',
            // header的title的style
            headerTitleStyle:{fontSize:FONT_SIZE(20),color:'white'},
            // header的style
            headerStyle:{backgroundColor:'#4ECBFC'},
        },
        */
        navigationOptions:{
            header:null
        }
    },
    GankStack: {
        screen:GankStack,
        navigationOptions:{
            header:null
        }
    },
    MainStack:{
        screen:MainStack,
        navigationOptions:{
            header:null
        }
    },
},
    {
    tabBarPosition: 'bottom',
    // tabBarComponent:TabBarBottom,
    swipeEnabled:false,
    animationEnabled:false,
    backBehavior:'none',
    lazy:true,
    tabBarOptions: {
        // tabbar上label的style
        labelStyle: {
            // marginTop:0
        },
        // tabbar的Iconstyle
        iconStyle:{
            height:35,
            width:35,
            margin:0
        },
        // tabbar的style
        style: {
            height:49,
            backgroundColor:'white'
        },
        // label和icon的背景色 活跃状态下
        activeBackgroundColor:'white',
        // label和icon的前景色 活跃状态下（选中）
        activeTintColor:'#4ECBFC',
        // label和icon的背景色 不活跃状态下
        inactiveBackgroundColor:'white',
        // label和icon的前景色 不活跃状态下(未选中)
        inactiveTintColor:'#aaa',
        showIcon:true,
        // 是否显示label，默认为true
        showLabel:iOS?true:true,
        // 不透明度为按选项卡(iOS和Android < 5.0)
        pressOpacity:0.3,

        indicatorStyle :{
            height:0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
        }
    }
});

const MyApp = StackNavigator({
    MyTab: {
        screen: MyTab,
    },
    WebViewDetail: {
        screen: WebViewDetail,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    SearchHistory:{
        screen:SearchHistory,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },

    WelfarePicture:{
        screen:WelfarePicture,
        // navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    Test:{
        screen:Test,
        navigationOptions:{
            headerTitle:'Test',
        }
    }

}, {
    headerMode: 'screen',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    })
});

const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{height:35,width:35 }, {tintColor: tintColor}]}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(20):FONT_SIZE(24),color:'white',alignSelf:'center'};
    // header的style
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};

const StackOptions = ({navigation}) => {
    // console.log(navigation);
    let {state,goBack} = navigation;
    // if (!state.params.isVisible){
    //     return;
    // }

    const headerStyle = {backgroundColor:'#4ECBFC'};
    const headerTitle = state.params.title;
    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(20):FONT_SIZE(24),color:'white',fontWeight:'500'}
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
    let headerRight;
    if (state.params.headerRight){
        headerRight = state.params.headerRight;
    }
    let header;
    if (state.params.isVisible === true){
        header = null;
    }
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header,headerRight}
};

const LoginOptions = ({navigation}) => {
    let {state,goBack} = navigation;
    // if (!state.params.isVisible){
    //     return;
    // }

    const headerStyle = {backgroundColor:'#4ECBFC'};
    const headerTitle = '登录';
    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(20):FONT_SIZE(24),color:'white',fontWeight:'500'}
    const headerBackTitle = false;
    const headerLeft = (
        <Button
            isCustom={true}
            customView={
                            <Icon
                                name='md-close'
                                size={30}
                                color='white'
                                style={{marginLeft:13}}
                            />
                        }
            onPress={()=>{goBack()}}
        />
    );
    let headerRight;
    if (state.params.headerRight){
        headerRight = state.params.headerRight;
    }
    let header;
    if (state.params.isVisible === true){
        header = null;
    }
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header,headerRight}
}

export default MyApp;