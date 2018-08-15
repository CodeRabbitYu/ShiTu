/**
 * @flow
 * Created by Rabbit on 2018/5/9.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {System} from '../../../../../utils';
import {Button, CustomIcon} from '../../../../../components';

import Icon from 'react-native-vector-icons/Ionicons';
import type {ToolBar} from '../../../../../servers/News/interfaces';

type Props = {
  toolBarData: ToolBar;
};

type State = {
  buttonData: Array<ButtonItem>
}

type ButtonItem = {
  icon: string;
  title: string;
  selected: boolean;
}

export class ToolBarView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const { love, hate, repost, comment } = props.toolBarData;
		this.state = {
			buttonData: [
				{icon: 'md-thumbs-up',   title: love,    selected: false},
				{icon: 'md-thumbs-down', title: hate,    selected: false},
				{icon: 'md-open',        title: repost,  selected: false},
				{icon: 'md-text',        title: comment, selected: false}
			]
		};
	}

  toolItemPress = (index: number) => {

  	const buttonData = this.state.buttonData;

  	buttonData.map((item: ButtonItem, dataIndex: number) => {

  		// if (buttonData.find(item => item.selected)) return;

  		if (index === 0 || index === 1) {
			  if (index === dataIndex) {
				  item.selected = true;
				  // item.selected = !item.selected;
			  } else {
			  	item.selected = false;
			  }
		  } else {
			  if (index === dataIndex) {
				  item.selected = !item.selected;
			  }
		  }
  	});

  	this.setState({ buttonData });
  };

  createButton = () => {
  	return this.state.buttonData.map((item, index) => {
  		const color = item.selected ? 'red' : 'orange';
  		return (
  			<Button key={index} onPress={() => this.toolItemPress(index)} activeOpacity={1}>
  				<View style={styles.button}>
  					<Icon name={item.icon} size={20} color={color}/>
  					<Text style={styles.buttonTitle}>{item.title}</Text>
  					<View style={styles.buttonLine} />
  				</View>
  			</Button>
  		);
  	});
  }

  render() {
  	return (
  		<View style={styles.toolBar}>
  			{this.createButton()}
  		</View>
  	);
  }
}

const styles = StyleSheet.create({

	toolBar: {
		height: px2dp(60),
		flexDirection: 'row',
		borderTopWidth: StyleSheet.hairlineWidth / 2,
		borderTopColor: '#ddd',
		marginTop: px2dp(10),
	},
	button: {
		width: System.SCREEN_WIDTH / 4,
		height: px2dp(60),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonTitle: {
		marginLeft: px2dp(10),
		marginBottom: px2dp(6),
		fontSize: FONT_SIZE(15),
		color: 'red',
	},
	buttonLine: {
		position: 'absolute',
		right: 0,
		top: px2dp(10),
		width: StyleSheet.hairlineWidth / 2,
		height: px2dp(40),
		backgroundColor: '#ddd'
	}
});