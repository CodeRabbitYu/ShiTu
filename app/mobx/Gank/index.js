/**
 * Created by Rabbit on 2018/4/16.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx'
import { handleImageSize } from "../../utils";
import { loadGankData } from "../../servers/gank";

import produce from "immer"

import type { RGankResult, RGank } from "../../servers/gank";
import Immutable from 'immutable';

class GankMobx {
  @observable gankData = [];
  @observable refreshing = true;
  @observable defaultData = [];
  @observable results: RGankResult;

  @action.bound
  async fetchGankData() {

    this.refreshing = true;
    this.results = [];
    try {
      let results = await loadGankData();
      results.results.map((item) => handleImageSize(item, 2))
        .map(task => task.fork(
          (err) => console.warn('Image failed to load', err),
          (gank) => {
            // console.log(gank);
            this.refreshing = false;
            this.defaultData = [{_id: 'test'}];
            this.gankData.push(gank);
          })
        )
    } catch (e) {
      console.log(e);
    }
    // console.log(this.gankData);
  }

  @computed get gankDataComputed() {
      let gankData = [];
      // console.log(this.results.results.slice());
    // let results = this.results.results;

    return this.results.results.map((item) => handleImageSize(item, 2))
        .map(task => task.fork(
          (err) => console.warn('Image failed to load', err),
          (gank) => {
            // console.log(gank);

            // gankData.push(gank);
            console.log(gankData);
            this.refreshing = false;
            this.defaultData = [{_id: 'test'}];
            this.gankData = gankData;
            // return gankData;
            // this.refreshing = false;
            // this.defaultData = [{_id: 'test'}];
            //
            // console.log(gank);
            //
            // gankData.push(gank);

            // console.log(gankData);

            // return gankData;

            // return {
            //   gankData: gankData.push(gank)
            // }

          })
        )
  }

}

export default GankMobx;