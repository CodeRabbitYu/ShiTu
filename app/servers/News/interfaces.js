/**
 * @flow
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
  largeUrl: string,
  used: boolean;
  who: string;
  height: number;
  width: number;
}

export interface RTGankResult {
  error: boolean;
  results: RTWeal[];
}

/** @desc 不得姐单条数据 */
export interface RTBDJList {
  id: string;
  type: string;
  text: string;
  user_id: string;
  name: string;
  screen_name: string;
  profile_image: string;
  created_at: string;
  create_time: string;
  passtime: string;
  love: string;
  hate: string;
  comment: string;
  repost: string;
  bookmark: string;
  bimageuri: string;
  voiceuri: string;
  voicetime: string;
  voicelength: string;
  status: string;
  theme_id: string;
  theme_name: string;
  theme_type: string;
  videouri: string;
  videotime: string;
  original_pid: string;
  cache_version: string;
  playcount: string;
  playfcount: string;
  cai: string;
  top_cmt: Array<>;
  weixin_url: string;
  themes: Array<>;
  image1: string;
  image2: string;
  is_gif: string;
  image0: string;
  image_small: string;
  cdn_img: string;
  width: string;
  height: string;
  tag: string;
  t: string;
  ding: string;
  favourite: string;
  isLongPicture: boolean;
  imageHeight: number;
  containerHeight: number;

  userInfoData: UserInfo;
  toolBarData: ToolBar;
  jokeData: Joke;
  pictureData: Picture;
}

/** @desc 不得姐参数 */
export interface RTBDJInfo {
  vendor: string;
  count: number;
  page: number;
  maxid: string;
  maxtime: string;
}

/** @desc 不得姐总数据源 */
export interface RTBDJResult {
  info: RTBDJInfo;
  list: RTBDJList[];
}



/** @desc 用户信息 */
export interface UserInfo extends RTBDJList{
  profile_image: string;
  name: string;
  passtime: string;
}

/** @desc 底部功能条 */
export interface ToolBar extends RTBDJList{
  love: string;
  hate: string;
  repost: string;
  comment: string;
}

/** @desc 笑话 */
export interface Joke extends RTBDJList {
  text: string;
}

/** @desc 图片 */
export interface Picture extends RTBDJList{
  cdn_img: string;
  height: string;
  width: string;
  isLongPicture: boolean;
  imageHeight: number;
  containerHeight: number;
	weixin_url: string,
}