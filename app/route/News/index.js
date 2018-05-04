/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';
import {Text, View} from "react-native";

import {imageSize, System} from '../../utils';
import {Button, TableList, FastImage} from '../../components'

// import {loadGankData, RGank} from '../../servers/News';

import {observer} from 'mobx-react';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import WealPicture from './WealPicture';
import BuDeJie from './BuDeJie';

type State = {
  typeArr: Array<any>
}

@observer
export class Gank extends React.Component<any, State> {

  componentDidMount() {
    this.props.navigation.setParams({
      title: '百思不得姐',
    })
  }

  constructor(props: any){
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {
      typeArr : [
        {'title': '视频', 'type': 41, 'navigate': navigate},
        {'title': '图片', 'type': 10, 'navigate': navigate},
        {'title': '段子', 'type': 29, 'navigate': navigate},
        {'title': '声音', 'type': 31, 'navigate': navigate},
        {'title': '福利', 'type': '福利','navigate': navigate},
      ],
    }
  }

  render() {
    return(
      <ScrollableTabView
        renderTabBar={() => <ScrollableTabBar />}
        tabBarActiveTextColor='#4ECBFC'
        tabBarInactiveTextColor='black'
        tabBarBackgroundColor='white'
        tabBarUnderlineStyle={{backgroundColor:'#4ECBFC',height:2}}
        tabBarTextStyle={{fontSize: 15}}
      >
        {
          this.state.typeArr.map((item, i) => {
            return(
              <BuDeJie type={item.type} tabLabel={item.title} key={i}/>
            )
            // if (i === 0) {
            //   return (
            //     <WealPicture tabLabel={item.title} key={i} />
            //   );
            // } else {
            //   return(
            //     <BuDeJie type={item.type} tabLabel={item.title} key={i}/>
            //   )
            // }
            })
        }
      </ScrollableTabView>
    )
  }
}
