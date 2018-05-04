/**
 * Created by Rabbit on 2018/5/4.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx'
import type {RTGankResult} from "../../servers/News/types";


class BuDeJieMobx {
  @observable isRefreshing: boolean = true;
  @observable dataSource: Array<RTGankResult> = [];
  @observable page: number = 1;

}

export default BuDeJieMobx;