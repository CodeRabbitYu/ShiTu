/**
 * Created by Rabbit on 2018/5/4.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx'
import type {RTGankResult} from "../../servers/News/types";
import {loadBuDeJieData, RTBuDeJieType} from "../../servers/News";


class BuDeJieMobx {
  @observable isRefreshing: boolean = true;
  @observable dataSource: Array<RTGankResult> = [];
  @observable maxtime: string = '';

  @action
  async fetchBuDeJieData(type: RTBuDeJieType, value) {
    const dataSource = await loadBuDeJieData(type, value)

    runInAction(()=>{
      this.dataSource = dataSource.list;
      this.maxtime = dataSource.info.maxid;
    })

  }

}

export { BuDeJieMobx };