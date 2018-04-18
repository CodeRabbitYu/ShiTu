/**
 * Created by Rabbit on 2018/4/16.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx'
import { handleImageSize } from "../../utils";
import { loadGankData } from "../../servers/gank";

import type { RGankResult, RGank } from "../../servers/gank";


class GankMobx {
  @observable gankData = [];
  @observable refreshing = true;
  @observable defaultData = [];

  @action.bound
  fetchGankData() {
    loadGankData().then(data => {
      let gankData = [];
      data.results.map((item) => handleImageSize(item, 2))
        .map(task => task.fork(
          (err) => console.warn('Image failed to load'),
          (gank) => {
            gankData.push(gank);
          })
        );
      console.log(gankData);
      this.gankData = gankData;

      console.log(this.gankData);

      this.refreshing = false;
      this.defaultData = [{_id: 'test'}];

    })
      .catch(e=>{
        console.log(e);
      })
  }
}

export default GankMobx;