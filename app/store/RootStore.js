/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import { ShiTuMobx } from '../mobx/ShiTu';
import { WelfareDetailMobx } from '../mobx/News';
import { ConfigStore } from './ConfigStore';

class RootStore {

	// shiTuMobx: ShiTuMobx;
	// welfareDetailMobx: WelfareDetailMobx;
	// configStore: ConfigStore;

	constructor() {
		this.shiTuMobx = new ShiTuMobx();
		this.welfareDetailMobx = new WelfareDetailMobx();
		this.configStore = new ConfigStore();
	}
}

// export { RootStore };
export default RootStore;