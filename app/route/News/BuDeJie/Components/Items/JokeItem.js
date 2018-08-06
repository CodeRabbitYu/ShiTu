/**
 * @flow
 * Created by Rabbit on 2018/5/14.
 */

import React from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import type {Joke} from '../../../../../servers/News/interfaces';

type Props = {
  jokeData: Joke
}

export const JokeItem = (props: Props) => {
	const { text } = props.jokeData;
	return (
		<View style={styles.jokeView}>
			<Text style={styles.jokeText}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	jokeView: {
		marginHorizontal: px2dp(20),
		// marginTop: 3,
		marginVertical: px2dp(10),
	},
	jokeText: {
		lineHeight: px2dp(44),
		fontSize: FONT_SIZE(17),
	}
});