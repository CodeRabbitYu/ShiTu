
/**
 * Created by Rabbit on 2017/4/19.
 */
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import ShiTu from './pages/ShiTu';
import Gank from './pages/Gank';
import Detail from './pages/Detail';
const MyTab = TabNavigator({
    ShiTu: {
        screen: ShiTu,
    },
    Gank: {
        screen:Gank,
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
    MyTab: {screen: MyTab},
    Detail: {screen: Detail},
}, {
    headerMode: 'screen',

});

export default MyApp;