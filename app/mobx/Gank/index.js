/**
 * Created by Rabbit on 2018/4/16.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx'
import { imageSize } from "../../utils";
import { loadGankData } from "../../servers/Gank";


import type { RGankResult, RGank } from "../../servers/Gank";
import Immutable from 'immutable';

class GankMobx {
  @observable gankData = [];
  @observable isRefreshing = false;
  @observable isMoreData = false;
  @observable defaultData = [];
  @observable results: RGankResult[] = [];

  @observable page: number = 1;

  constructor(page: number, isRefreshing: boolean){
    // this.page = page;
    // this.isRefreshing = isRefreshing;
    // this.defaultData = [{_id: 'test'}];
    this.defaultData = [];
  }

  @action.bound
  clearList() {
    this.isRefreshing = true;
    this.page = 1;
  }

  @computed get isLoadMoreData() {
    const isLoadMore = this.isMoreData;
    const page = this.page;
    const length = this.results.length;

    console.log('----数据源长度----', length);
    console.log('----页数----', page);

    return page !== 1 && length === 0;
  }
  @action.bound
  async fetchGankData() {
    // if ( this.isLoadMoreData){
    console.log('请求网络');

    this.isMoreData = true;
    this.isRefreshing = false;

    try {
      const gankData = await loadGankData(this.page);
      let results = gankData.results;
      console.log(results);

      this.defaultData = results;


      // if (this.page === 1){
      //   this.results = gankData.results;
      //   this.isMoreData = false;
      // } else {
      //   this.results.push(...gankData.results);
      //   this.isMoreData = false;
      // }

      // console.log('isMoreData', this.isMoreData);

      console.log('----计算属性----', this.isLoadMoreData);

      console.log('page', this.page);

      if (!this.isLoadMoreData) {

        // console.log('第一次进入', this.page);




        // this.isMoreData = false;


        // if (this.page === 1) {
        //   this.results = results;
        //   this.handleData(this.results);
        // } else {
        //   this.results = this.results.concat(results);
        //   this.handleData(this.results);
        // }


        // if (this.page === 4){
        //   return;
        // }
        // else {
        //   this.results = results;
        //   this.handleData(this.results);
        // }


        this.isMoreData = false;
        this.page += 1;

        // console.log('第一次进入的数据源数量', this.results.slice().length);
        // }
        // else {

        // if (this.page === 2) return;
        // this.isMoreData = false;
        // console.log('加载更多数据Load', this.page);
        // this.results = this.results.concat(results);
        // // this.isMoreData = false;
        // console.log('加载更多后数据源数量', this.results.slice().length);
        // this.handleData(this.results);
        // }

      }
      // this.isMoreData = false;

      // this.handleData(this.results);

    } catch (e) {
      console.log(e);
    }
  }

  @action.bound
  async fetchGankData1() {

    console.log('page', this.page);

    // console.log('加载更多的状态', this.isLoadMoreData);

    console.log('isMoreData', this.isMoreData);

    // console.log('isRefreshing', this.isRefreshing);

    // this.isMoreData = true;

    this.isMoreData = true;


    // if ( this.isLoadMoreData){
    console.log('进来了吗');
    // this.isMoreData = true;
    try {
      const gankData = await loadGankData(this.page);

      if (this.page === 1){
        this.results = gankData.results;
        this.isMoreData = false;
      } else {
        this.results.push(...gankData.results);
        this.isMoreData = false;
      }




      //
      // // console.log(gankData);
      // // this.isMoreData = false;
      //
      // runInAction(()=>{
      //   this.defaultData = [{_id: 'test'}];
      //   this.page += 1;
      // })
      //
      // this.results.concat(gankData.results);
      //
      // // this.isMoreData = false;
      // console.log(this.results.slice());
      //
      // console.log('改变后的页数', this.page);

      this.handleData(this.results);

    } catch (e) {
      console.log(e);
    }


    // }


  }

  @action.bound
  async fetchMoreData() {

    console.log('加载更多数据More', this.isMoreData);

    // if (this.results.slice().length === 0 || this.page === 1) return;

    console.log('数据源数量', this.results.slice().length)
    // this.isMoreData = true;
    // console.log('页数', this.page);
    //
    // this.page += 1;
    await this.fetchGankData();

  }

  @action.bound handleData(results) {
    results.map((item) => imageSize(item, 2))
      .map(task => task.fork(
        (err) => console.warn('Image failed to load', err),
        (gank: RGank) => {
          // console.log(gank.url);
          // this.isRefreshing = false;
          this.defaultData = [{_id: 'test'}];
          this.gankData.push(gank);
          // console.log('length', this.gankData.slice().length);
        })
      )
  }
}

export default GankMobx;