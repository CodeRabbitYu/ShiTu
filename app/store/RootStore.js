/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import { ConfigStore } from './ConfigStore';
import { PublicStore } from './PublicStore';
import { ShiTuStore } from './ShiTu/ShiTuStore';
import { ThemeStore } from './ThemeStore';

const configStore = new ConfigStore();
const publicStore = new PublicStore();
const shiTuStore = new ShiTuStore();
const themeStore = new ThemeStore();

export { configStore, publicStore, shiTuStore, themeStore };
