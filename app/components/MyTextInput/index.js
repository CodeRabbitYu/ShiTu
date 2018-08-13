/**
 * @flow
 * Created by Rabbit on 2018/8/4.
 */

import React, {Component} from 'react';
import {Platform, TextInput} from 'react-native';

type Props = {
	defaultValue: string,
	value: string,
}
class MyTextInput extends Component<Props> {
	shouldComponentUpdate(nextProps) {
		return Platform.OS !== 'ios' || (this.props.value === nextProps.value &&
			(nextProps.defaultValue === 'undefined' || nextProps.defaultValue === '' )) ||
			(this.props.defaultValue === nextProps.defaultValue &&
				(nextProps.value === 'undefined' || nextProps.value === '' ));
	}

	render() {
		return <TextInput {...this.props} />;
	}
}

export default MyTextInput;