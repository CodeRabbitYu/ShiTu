/**
 * Created by Rabbit on 2018/5/4.
 */

export interface RTWeal {
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
  height: number;
  width: number;
}

export interface RTGankResult {
  error: boolean;
  results: RTWeal[];
}