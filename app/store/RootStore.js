/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import { ConfigStore } from './ConfigStore';
import { PublicStore } from './PublicStore';
import { ShiTuStore } from './ShiTu/ShiTuStore';

const configStore = new ConfigStore();
const publicStore = new PublicStore();
const shiTuStore = new ShiTuStore();

export { configStore, publicStore, shiTuStore };
