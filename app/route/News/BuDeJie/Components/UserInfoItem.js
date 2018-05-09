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
import {Button} from "../../../../components";

type Props = {
  profile_image: string;
  name: string;
  passtime: string;
};
export class UserInfoItem extends React.PureComponent<Props> {

  render() {
    return (
      <Button activeOpacity={0.7}>
        <View  style={{flexDirection:'row'}}>
          <Image source={{uri:this.props.profile_image}} style={styles.icon}/>
          <View style={styles.userDetailView}>
            <Text style={styles.userText}>{this.props.name}</Text>
            <Text style={styles.userTime}>{this.props.passtime}</Text>
          </View>
        </View>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  userInfo:{
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
    marginLeft: 10,
  },
  userDetailView:{
    alignSelf: 'center',
    marginLeft: 8,
    marginTop: 5,
  },
  userText:{
    fontSize: 13,
    marginBottom: 1,
    color: '#4474A9',
  },
  userTime:{
    fontSize: 11,
    color: '#989898',
  },
});