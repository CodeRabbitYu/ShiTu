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

	const { profile_image, name, theme_name } = props.userInfoData;

	_profile_image = profile_image;
	if (!profile_image) {
		_profile_image = 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png';
	}
	return (
		<View style={styles.userInfo}>
			<Button activeOpacity={1} onPress={() => alert('点击用户信息')}>
				<CustomImage source={{uri: _profile_image}} style={styles.icon}/>
			</Button>
			<Button style={styles.userDetailView} activeOpacity={1} onPress={() => alert('点击用户信息')}>
				<View>
					<Text style={styles.userText} numberOfLines={2}>{name}</Text>
					<Text style={styles.userTime}>{theme_name}</Text>
				</View>
			</Button>
		</View>
	);
}


const styles = StyleSheet.create({
	userInfo: {
		flexDirection: 'row',
		marginTop: px2dp(20)
	},
	icon: {
		width: px2dp(80),
		height: px2dp(80),
		borderRadius: px2dp(40),
		marginVertical: px2dp(10),
		marginLeft: px2dp(20),
	},
	userDetailView: {
		alignSelf: 'center',
		marginLeft: px2dp(16),
		marginVertical: px2dp(10),
		marginRight: '15%',
	},
	userText: {
		fontSize: FONT_SIZE(16),
		color: '#4474A9',
	},
	userTime: {
		marginTop: px2dp(10),
		fontSize: 13,
		color: '#989898',
	},
});