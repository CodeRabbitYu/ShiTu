/**
 * Created by Rabbit on 2018/4/12.
 */

export { default as System } from './System';

import { Fetch, Axios } from './Request/index';

import {addCustomProps} from './addCustomProps';
import {Config} from './Config';

import Global from './Global';
import ThemeCustom from './ThemeCustom';

export { Fetch, Axios, addCustomProps, Global, ThemeCustom, Config };