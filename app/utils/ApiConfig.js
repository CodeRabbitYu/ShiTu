/**
 * @flow
 * Created by Rabbit on 2018/8/13.
 */
import { System } from './index';

const base = {
  // baseURL: System.iOS ? 'http://localhost:3000/api' : 'http://192.168.31.236:3000/api',

  // baseURL:iOS?'http://localhost:1234/api':'http://10.0.2.2:1234/api',

  // baseURL:!iOS?'http://localhost:1234/api':'http://172.16.17.61:1234/api',

  // baseURL :__DEV__ ? iOS?'http://localhost:3000/api':'http://172.16.17.11:3000/api' : 'http://shitu.leanapp.cn/api'
  baseURL: 'http://shitu.leanapp.cn/api',
  // baseURL: 'http://127.0.0.1:7001'
};

const ApiConfig = {
  api: {
    userToken: base.baseURL + '/userToken',
    shitu: {
      detailURL: base.baseURL + '/detailUrl'
    },
    gank: {
      listData: base.baseURL + '/gank/listData'
    },
    news: {
      list: base.baseURL + '/news'
    },
    user: {
      login: base.baseURL + '/user/login'
    },
    qiniu: {
      upLoadToken: base.baseURL + '/uploadToken'
    },
    test: {
      test: base.baseURL + '/test'
    }
  },
  qiniu: {
    // upload: 'http://upload-z2.qiniu.com';
    // upload: 'http://up-z2.qiniup.com',
    upload: 'http://up-z0.qiniup.com'
  }
};

export { ApiConfig };
