/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */

import { ConfigStore } from './ConfigStore';
import { PowerStore } from './PowerStore';
import { PublicStore } from './PublicStore';

const configStore = new ConfigStore();
const powerStore = new PowerStore();
const publicStore = new PublicStore();

export { configStore, powerStore, publicStore };
