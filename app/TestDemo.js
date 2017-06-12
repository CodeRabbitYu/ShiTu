
/**
 * Created by Rabbit on 2017/4/19.
 */
import {
    StackNavigator,
    TabNavigator,
    createNavigator,
    createNavigationContainer,
    TabRouter,
    addNavigationHelpers,
} from 'react-navigation';

import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
    Image
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
        navigationOptions: ()=> TabOptions('个人中心',MainIcon,MainIcon,'个人中心'),
    },
    Login:{
        screen:Login,
        navigationOptions: ({navigation}) => LoginOptions({navigation})
    }
},{
    mode:'modal',
});

const CustomTabBar = ({
    navigation,
}) => {
    const { routes} = navigation.state;
    console.log(navigation.state)
    return (
        <View style={styles.tabContainer}>
            {routes.map(route => {
                // console.log(route);
                if(route.key == "ShiTu"){
                    return(
                        <TouchableOpacity
                            onPress={() => navigation.navigate(route.routeName)}
                            style={[styles.tab,{height:60}]}
                            key={route.routeName}
                        >
                            <Text>{route.routeName}</Text>
                        </TouchableOpacity>
                    )
                }else {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate(route.routeName)}
                            style={styles.tab}
                            key={route.routeName}
                        >
                            <Image
                                source={require('./resources/ShiTu.png')}
                                style={[{height:35,width:35 }]}
                            />
                        </TouchableOpacity>
                    )
                }
            })}
        </View>
    );
}

const CustomTabView = ({
    router,
    navigation,
}) => {
    const {routes, index} = navigation.state;
    const ActiveScreen = router.getComponentForState(navigation.state);

    return (
        <View style={[styles.container]}>
            <CustomTabBar navigation={navigation}/>
            <ActiveScreen
                navigation={addNavigationHelpers({
                                      ...navigation,
                                      state: routes[index],
                                    })}
            />
        </View>
    )


};

const CustomTabRouter = TabRouter({
    Gank: {
        screen:Gank,
        navigationOptions: ()=> TabOptions('干货集中营',ShiTuIcon,ShiTuIcon,'干货集中营'),
    },
    ShiTu: {
        screen: ShiTu,
        navigationOptions: ()=> TabOptions('识兔',ShiTuIcon,ShiTuIcon,'识兔'),
    },
    Main:{
        screen:Main,
        navigationOptions: ()=> TabOptions('我的',ShiTuIcon,ShiTuIcon,'我的'),
    },
}, {
    // Change this to start on a different tab
    initialRouteName: 'ShiTu',
    tabBarPosition: 'bottom',
    // tabBarComponent:TabBarBottom,
    swipeEnabled: true,
    animationEnabled: false,
    backBehavior: 'none',
    lazy: true,

});

const CustomTabs = createNavigationContainer(createNavigator(CustomTabRouter)(CustomTabView));



const MyTab = TabNavigator({
        ShiTuStack: {
            screen: ShiTuStack,
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
            showLabel:iOS?false:true,
            // 不透明度为按选项卡(iOS和Android < 5.0)
            pressOpacity:0.3,

            indicatorStyle :{
                height:0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了,
            }
        }
    });

const TestDemo = StackNavigator({
    CustomTabs: {
        screen: CustomTabs,
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
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    Test:{
        screen:Test,
        navigationOptions:{
            headerTitle:'Test',
        }
    }

}, {
    headerMode: 'screen',
    // transitionConfig:()=>({
    //     screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    // })
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

    const headerStyle = {backgroundColor:'#4ECBFC'};
    const headerTitle = state.params.title;
    const headerTitleStyle = {fontSize:iOS?FONT_SIZE(20):FONT_SIZE(24),
        color:'white',fontWeight:'500',alignSelf:'center'}
    const headerBackTitle = false;
    const headerLeft = (
        <Button
            isCustom={true}
            customView={
                            <Icon
                                name='ios-arrow-back'
                                size={30}
                                color='white'
                                style={{marginLeft:12}}
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
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,header,headerLeft,headerRight}
};

const LoginOptions = ({navigation}) => {
    let {state,goBack} = navigation;
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
    const gesturesEnabled = false;
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header,headerRight,gesturesEnabled}
};

const styles = StyleSheet.create({
    container: {
        height:SCREEN_HEIGHT - 64 ,
        // flex:1,
        // marginTop: Platform.OS === 'ios' ? 20 : 0,
        // position:'absolute',
        // bottom:0,
        // width:375,
    },
    tabContainer: {
        flexDirection: 'row',
        height: 49,
        zIndex:99999,
        position:'absolute',
        bottom:0,
        width:375,
        alignItems: 'flex-end',
    },
    tab: {
        // zIndex:99999,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height:49,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        backgroundColor:'red'
    }
});

export default TestDemo;