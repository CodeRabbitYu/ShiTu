
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
        navigationOptions: ()=> TabOptions('识兔','识兔','识兔','识兔'),
    },
    Gank: {
        screen:Gank,
        // title: '干货集中营',
        navigationOptions: ()=> TabOptions('干货','干货','干货','干货集中营'),
    },
    Main:{
        screen:Main,
        navigationOptions: ()=> TabOptions('个人中心','个人中心','个人中心','个人中心'),
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
            height:0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
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

export const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            !focused
                ?
                <Image
                    source={{uri : normalImage}}
                    style={[styles.TabBarIcon, {tintColor: tintColor}]}
                />
                :
                <Image
                    source={{uri : selectedImage}}
                    style={[styles.TabBarIcon, {tintColor: tintColor}]}
                />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:FONT_SIZE(20),color:'white'};
    // header的style
    const headerStyle = {backgroundColor:'#4ECBFC'};
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle};
};

const StackOptions = ({navigation}) => {
    // console.log(navigation);
    let {state,goBack} = navigation;

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
    let headerRight;
    if (state.params.headerRight){
        headerRight = state.params.headerRight;
    }
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header,headerRight}
};

const styles = StyleSheet.create({
    TabBarIcon:{
        height:35,
        width:35,
    }
});

export default MyApp;