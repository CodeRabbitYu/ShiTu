/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	StatusBar
} from 'react-native';

import * as Animatable from 'react-native-animatable';
const AnimationButton = Animatable.createAnimatableComponent(Button);
const AnimationImageBackground = Animatable.createAnimatableComponent(ImageBackground);

import {ShiTuMobx} from '../../mobx/ShiTu';

import { Images } from '../../resource';
import { Button, Theme, BaseContainer } from '../../components';
import { System } from '../../utils';
import {observer, inject} from 'mobx-react';
import RootStore from '../../store/RootStore';
import {ConfigStore} from '../../store/ConfigStore';


type Props = {
  navigation: any,
	rootStore: RootStore;
	configStore: ConfigStore;
};

@inject('configStore')
@observer
export class ShiTu extends Component<Props> {

	shiTuMobx: ShiTuMobx;

	constructor(props: Props) {
		super(props);
		this.shiTuMobx = new ShiTuMobx();
	}

	componentDidMount() {
	}

	render() {
		return (
			<BaseContainer title={'识兔'} isTopNavigator={true}>
				<AnimationImageBackground style={styles.container}
					animation="fadeIn"
					// source={Images.default}
					//                         source={{uri: this.props.rootStore.shiTuMobx.backgroundImageUri}}
					                        source={{uri: this.props.configStore.params}}
					blurRadius={System.Android ? 5 : 8}
				>
					<AnimationButton title={'点我寻找!'}
						animation="bounceInLeft"
						useNativeDriver
						style={styles.button}
						titleStyle={styles.buttonTitle}
						onPress={() => this.props.navigation.navigate('Sample')}
					/>
				</AnimationImageBackground>
			</BaseContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	button: {
		padding: 10,
		backgroundColor: '#4ECBFC',
		borderRadius: 5,
		shadowColor: 'rgba(0, 0, 0, 0.15)',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowRadius: 3,
		shadowOpacity: 1,
		elevation: 2
	},
	buttonTitle: {
		color: 'white',
		fontSize: 16,
	}
});
