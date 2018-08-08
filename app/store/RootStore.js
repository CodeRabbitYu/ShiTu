/**
 * @flow
 * Created by Rabbit on 2018/8/6.
 */


import { ConfigStore } from './ConfigStore';
import { PowerStore } from './PowerStore';

const configStore = new ConfigStore();
const powerStore = new  PowerStore();


export { configStore, powerStore };
