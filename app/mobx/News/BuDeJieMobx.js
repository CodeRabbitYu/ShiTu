/**
 * Created by Rabbit on 2018/5/4.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx'
import type {RTGankResult} from "../../servers/News/types";
import {loadBuDeJieData, RTBuDeJieType} from "../../servers/News";
import { System } from "../../utils";


const ContainerHeight = System.SCREEN_HEIGHT - 49 - 64 - 54;


class BuDeJieMobx {
  @observable isRefreshing: boolean = true;
  @observable dataSource: Array<RTGankResult> = [];
  @observable maxtime: string = '';

  @action
  async fetchBuDeJieData(type: RTBuDeJieType, value) {
    const dataSource = await loadBuDeJieData(type, value)

    dataSource.list.map(item => {
      let imageHeight = System.SCREEN_WIDTH * item.height / item.width;

      item.imageHeight = imageHeight;
      item.isLongPicture = false;

      if (imageHeight > ContainerHeight && imageHeight < System.SCREEN_HEIGHT) {
        item.imageHeight = imageHeight - 80;
        item.isLongPicture = false;
      } else if(imageHeight > System.SCREEN_HEIGHT && item.is_gif === '0') {
        item.imageHeight = System.SCREEN_HEIGHT * 0.5;
        item.isLongPicture = true;
      }
    })

    console.log(dataSource);

    runInAction(()=>{
      this.dataSource = dataSource.list;
      this.maxtime = dataSource.info.maxid;
    })

  }

}

export { BuDeJieMobx };