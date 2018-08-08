/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx';
import {ConfigStore} from '../../store/ConfigStore';

class ShiTuMobx extends ConfigStore {

	@observable backgroundImageUrl: string;

	constructor() {
		super();
	}

}

export { ShiTuMobx };