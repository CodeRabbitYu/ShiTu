/**
 * @flow
 * Created by Rabbit on 2018/4/16.
 */

import { Fetch } from "../../components";

export interface RGank {
  _id: string;
  createdAt: string;
  desc: string;
  images: Array<string>;
  publishedAt: string;
  source: string;
  type: string;
  url: string;
  used: boolean;
  who: string;
}

export interface RGankResult {
  error: boolean;
  results: RGank[];
}

// export async function getRecommendBooks(): Promise<ISimplifyBook[]> {
//   const path = '/searchedBooks/recommend';
//   const books: ISimplifyBook[] | null = await apiRequest.get<ISimplifyBook[]>(path);
//   return  books || [];
// }

export async function loadGankData(): Promise<RGankResult> {

  let url = 'http://gank.io/api/data/iOS/20/1';
  url = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/20/1';

  const Gank: RGankResult[] = await Fetch.get(url);

  return Gank;


  // Request.get(url)
  //   .then((data) => {
  //     console.log(data);
  //
  //     console.log(data.results);
  //
  //     data.results.map((gank, index) => {
  //       console.log(gank.who);
  //       console.log(gank.url);
  //     })
  //
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
}