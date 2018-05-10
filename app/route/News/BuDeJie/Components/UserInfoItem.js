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
import {Button,FastImage} from "../../../../components";

type Props = {
  profile_image: string;
  name: string;
  passtime: string;
  userInfoPress: Function;
};

export function UserInfoItem(props: Props) {
  let _profile_image;

  const { profile_image, name, passtime, userInfoPress } = props;
  _profile_image = profile_image;
  if (!profile_image) {
    _profile_image = 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png';
  }
  return (
    <View>
        <View style={{flexDirection:'row' }}>
          <Button activeOpacity={1} onPress={userInfoPress}>
            <FastImage source={{uri:_profile_image}} style={styles.icon}/>
          </Button>
          <Button style={styles.userDetailView} activeOpacity={1} onPress={userInfoPress}>
            <View >
              <Text style={styles.userText}>{name}</Text>
              <Text style={styles.userTime}>{passtime}</Text>
            </View>
          </Button>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  userInfo:{
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginVertical: 5,
    marginLeft: 10,
  },
  userDetailView:{
    alignSelf: 'center',
    marginLeft: 8,
    // marginTop: 5,
    marginVertical: 10,
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