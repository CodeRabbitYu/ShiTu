/**
 * @flow
 * Created by Rabbit on 2018/5/9.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {System} from "../../../../utils";
import {Button, CustomIcon} from "../../../../components";

import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  love: string;
  hate: string;
  repost: string;
  comment: string;
};

type State = {
  buttonData: Array<ButtonItem>
}

type ButtonItem = {
  icon: string;
  title: string;
  selected: boolean;
}

export class ToolBarItem extends React.Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      buttonData: [
        {'icon': 'ios-thumbs-up-outline',   'title': props.love,    'selected': false},
        {'icon': 'ios-thumbs-down-outline', 'title': props.hate,    'selected': false},
        {'icon': 'ios-open-outline',        'title': props.repost,  'selected': false},
        {'icon': 'ios-text-outline',        'title': props.comment, 'selected': false}
      ]
    }
  }

  toolItemPress = (index: number) => {

    const buttonData = this.state.buttonData;

    buttonData.map((item: ButtonItem, dataIndex: number) => {

      if (buttonData.find(item => item.selected)) return;

      if (index === 0 || index === 1){
        if (index === dataIndex && !item.selected) {
          item.selected = !item.selected;
        }
      }
    });

    this.setState({ buttonData })

  };

  createButton = () => {
    return this.state.buttonData.map((item, index) => {
      const color = item.selected ? 'red' : 'orange';
      return(
        <Button key={index} onPress={()=>this.toolItemPress(index)} activeOpacity={1}>
          <View style={styles.button}>
            <Icon name={item.icon} size={20} color={color}/>
            <Text style={styles.buttonTitle}>{item.title}</Text>
            <View style={styles.buttonLine} />
          </View>
        </Button>
      )
    })
  }

  render(){
    return(
      <View style={styles.toolBar}>
        {this.createButton()}
      </View>
    )
  }
}

const toolItemPress = (index: number, props: Props) => {
  const { toolItemPress } = props;



  toolItemPress(index);
}

const createButton = (props: Props) => {
  const buttonData =  [
    {'icon': 'ios-thumbs-up-outline',   'title': props.love,    'selected': false},
    {'icon': 'ios-thumbs-down-outline', 'title': props.hate,    'selected': false},
    {'icon': 'ios-open-outline',        'title': props.repost,  'selected': false},
    {'icon': 'ios-text-outline',        'title': props.comment, 'selected': false}
  ];

  return buttonData.map((item, index) => {
    let color = item.selected ? 'red' : 'orange';
    return(
      <Button key={index} onPress={()=>toolItemPress(index, props)} activeOpacity={1}>
        <View style={styles.button}>
          <Icon name={item.icon} size={20} color={color}/>
          <Text style={styles.buttonTitle}>{item.title}</Text>
          <View style={styles.buttonLine} />
        </View>
      </Button>
    )
  })

}

export function ToolBarItem111(props: Props) {
  console.log(props);
  return(
    <View style={styles.toolBar}>
      {createButton(props)}
    </View>
  )
}

const styles = StyleSheet.create({

  toolBar:{
    height:30,
    flexDirection:'row',
    borderTopWidth:0.5,
    borderTopColor:'#ddd',
    marginTop: 10,
  },
  button:{
    width: System.SCREEN_WIDTH / 4,
    height:30,
    flexDirection:'row',
    alignItems :'center',
    justifyContent:'center',
  },
  buttonTitle:{
    marginLeft:3,
    fontSize:15,
    color: 'red'
  },
  buttonLine:{
    position:'absolute',
    right:0,
    top:5,
    width:0.5,
    height:20,
    backgroundColor:'#ddd'
  }
});