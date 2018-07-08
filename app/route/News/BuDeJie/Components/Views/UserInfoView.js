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
import {Button, CustomImage} from '../../../../../components';
import type {UserInfo} from '../../../../../servers/News/interfaces';

type Props = {
  userInfoData: UserInfo;
};

export function UserInfoView(props: Props) {
	let _profile_image;

	const { profile_image, name, passtime } = props.userInfoData;

	_profile_image = profile_image;
	if (!profile_image) {
		_profile_image = 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png';
	}
	return (
		<View>
			<View style={{flexDirection: 'row'}}>
				<Button activeOpacity={1} onPress={() => alert('点击用户信息')}>
					<CustomImage source={{uri: _profile_image}} style={styles.icon}/>
				</Button>
				<Button style={styles.userDetailView} activeOpacity={1} onPress={() => alert('点击用户信息')}>
					<View>
						<Text style={styles.userText} numberOfLines={2}>{name}</Text>
						<Text style={styles.userTime}>{passtime}</Text>
					</View>
				</Button>
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	userInfo: {
		flexDirection: 'row',
	},
	icon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginVertical: 5,
		marginLeft: 10,
	},
	userDetailView: {
		alignSelf: 'center',
		marginLeft: 8,
		marginVertical: 5,
		marginRight: '15%',
	},
	userText: {
		fontSize: 13,
		marginBottom: 1,
		color: '#4474A9',
	},
	userTime: {
		fontSize: 11,
		color: '#989898',
	},
});