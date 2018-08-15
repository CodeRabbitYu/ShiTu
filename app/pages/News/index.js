/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React from 'react';

import { BaseContainer} from '../../components';

import {observer} from 'mobx-react';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import { Welfare } from './Welfare';
import { BuDeJie } from './BuDeJie';
import { BuDeJieDetail } from './BuDeJieDetail';

import type {NavigationState} from 'react-navigation';

type State = {
  typeArr: Array<typeItem>
}

type typeItem = {
  title: string;
  type: string | number;
  navigate: NavigationState;
}

@observer
class News extends React.Component<any, State> {

	componentDidMount() {
		this.props.navigation.setParams({
			title: '百思不得姐',
		});
	}

	constructor(props: any) {
		super(props);
		const { navigate } = this.props.navigation;
		this.state = {
			typeArr: [
				{'title': '福利', 'type': '福利', 'navigate': navigate},
				{'title': '图片', 'type': 10,   'navigate': navigate},
				{'title': '全部', 'type': 1,    'navigate': navigate},
				{'title': '视频', 'type': 41,   'navigate': navigate},
				{'title': '笑话', 'type': 29,   'navigate': navigate},
			],
		};
	}

	render() {
		return (
			<BaseContainer title={'百思不得姐'} isTopNavigator={true}>
				<ScrollableTabView
					renderTabBar={() => <DefaultTabBar />}
					tabBarActiveTextColor='#4ECBFC'
					tabBarInactiveTextColor='black'
					tabBarBackgroundColor='white'
					tabBarUnderlineStyle={{backgroundColor: '#4ECBFC', height: 2}}
					tabBarTextStyle={{fontSize: 15}}
				>
					{
						this.state.typeArr.map((item, i) => {
							if (i === 0) {
								return (
									<Welfare tabLabel={item.title} key={i} navigate={item.navigate}/>
								);
							} else {
								return (
									<BuDeJie type={item.type} tabLabel={item.title} key={i} navigate={item.navigate}/>
								);
							}
						})
					}
				</ScrollableTabView>
			</BaseContainer>
		);
	}
}

export {
	News,
	Welfare,
	BuDeJie,
	BuDeJieDetail,
};
