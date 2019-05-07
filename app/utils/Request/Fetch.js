/**
 * @flow
 * Created by Rabbit on 2018/4/13.
 */

import RNFetchBlob from 'rn-fetch-blob';

interface RTBody {
  [key: string]: string | number | boolean | Object;
}

type ErrorType = {
  [key: string]: any
};

type MethodType = string | 'GET' | 'POST' | 'DELETE' | 'PUT' | 'get' | 'post' | 'delete' | 'put';

// 处理url
function encodeQuery(url: string, params: Object = {}) {
  let _url = url;
  if (!params || !Object.keys(params).length) {
    return _url;
  }
  _url = _url.indexOf('?') === -1 ? `${_url}?` : `${_url}&`;
  const query = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return `${_url}${query}`;
}
// 处理错误请求
function throwError(json: any) {
  const error: ErrorType = new Error(json);
  error.msg = json.msg;
  error.status = json.status;
  throw error;
}
async function checkStatus(resp) {
  let responseData;

  if (resp.respInfo.status === 200) {
    responseData = resp.json();
    if (responseData.status === 'success') {
      return responseData;
    } else {
      console.log('200 ---- throwError', responseData);
      throwError(responseData);
    }
    // return responseData;
  } else {
    // console.log('throwError', resp.text());
    throwError(resp.text());
  }

  return resp.text();
}

class Fetch {
  // 框架可以用过cancel 取消某个网络请求
  /**
   * 设置Header请求头
   */
  header: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json',
  };
  /**
   * Config参数
   */
  config: {
    // 指示器,iOS专属
    // indicator:true,
    // 超时
    // timeout:3000
    // 缓存
    // fileCache : bool,
    // 缓存地址
    // path : string,
    // appendExt : string,
    // session : string,
    // addAndroidDownloads : any,
    trusty: false
  };

  /**
   *
   * @param method            请求方式GET, POST, PUT, DELETE
   * @param url               请求网址
   * @param params            请求参数
   * @param config            网络配置文件
   * @param headers           请求头
   * @returns {Promise.<TResult>}
   *
   */
  static fetch<T>({
    method = 'GET',
    url,
    params = {},
    config = {},
    headers
  }: {
    method: MethodType,
    url: string,
    params: Object,
    config: Object,
    headers: RTBody
  }): Promise<T> {
    let _params;
    let _url = url;
    const _config = {
      indicator: true,
      timeout: 30000,
      trusty: false,
      ...config
    };
    const _headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'ShiTu',
      ...headers
    };

    // let userData = await AsyncStorage.getItem('USER_TOKEN');

    const _method: any = method.toUpperCase();

    if (_method === 'GET' && params) {
      _url = encodeQuery(_url, params);
    }

    if (_method === 'POST' && params) {
      _params = JSON.stringify(params);
    }

    if (__DEV__) {
      console.log('_url:', _url);
      // console.log('_params:', _params);
      // console.log('_config:', _config);
      // console.log('_method:', _method);
      // console.log('_header:', _headers);
    }

    //
    // let baidu = 'http://image.baidu.com/wiseshitu?guess=1&uptype=upload_wise&queryImageUrl=http://pr2rtw08n.bkt.clouddn.com/68196417-6d0d-4a2a-886c-64e751ae89c2.jpeg&querySign=&simid='
    //
    // let testUrl: string = 'http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F32fa828ba61ea8d3fcd2e9ce9e0a304e241f5803.jpg';
    // testUrl = 'http://pr2rtw08n.bkt.clouddn.com/68196417-6d0d-4a2a-886c-64e751ae89c2.jpeg';
    //
    //
    // const _url =
    //   'http://image.baidu.com/search/detail?z=0' +
    //   '&word=%E7%8E%8B%E4%B9%89%E5%8D%9A%E4%BD%9C%E5%93%81&hs=0&pn=0' +
    //   '&spn=0&di=0&pi=42860072193&tn=baiduimagedetail&is=0%2C0' +
    //   '&ie=utf-8&oe=utf-8&cs=1635775129%2C499054354&os=' +
    //   '&simid=&adpicid=0&lpn=0&fm=&sme=&cg=&bdtype=-1&oriquery=' +
    //   '&objurl=' + 'http://pr2rtw08n.bkt.clouddn.com/68196417-6d0d-4a2a-886c-64e751ae89c2.jpeg' +
    //   '&fromurl=&gsm=0&catename=pcindexhot&islist=&querylist=';
    //
    // 'http://'
    //
    // https://graph.baidu.com/details?isfromtusoupc=1&tn=pc&carousel=0&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=&image=http://mms-graph.cdn.bcebos.com/1.jpeg
    //
    // testUrl

    // 'http://graph.baidu.com/s?sign=202966bac3f2d4838e2bc01557197646&f=all&tn=wise' +
    // '&jsup=%7B%22promotion_name%22%3A%22platform_tusou_homepage%22%7D&pageFrom=graph_upload_wise&idctag=nj' +
    // '&sids=10006_10040_10190_10290_10390_10693_10705_10301_10708_10801_10902_11006_10905_10911_11000_10014_10117_10016_10018_11021_11031&logid=3246103176'

    // ('https://graph.baidu.com/details?isfromtusoupc=0&tn=wise&carousel=0&tpl_from=wise&promotion_name=pc_image_shituindex&extUiData%5bisLogoShow%5d=1&image=&image=http://pr2rtw08n.bkt.clouddn.com/68bc2b40-674c-4b98-becc-3d801b9c401d.jpeg');

    return RNFetchBlob.config(_config)
      .fetch(_method, _url, _headers, _params)
      .then(resp => {
        return checkStatus(resp);
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   *
   * @param url       请求网址
   * @param params    参数
   * @param headers
   * @param config    fetchblob配置
   * @returns
   *
   */
  static get<T>(url: string, params: Object = {}, headers: Object = {}, config: Object = {}): Promise<T> {
    return Fetch.fetch({ method: 'get', url, params, headers, config });
    // .then((data)=>{
    //   // console.log(data);
    //   return data;
    // })
    // .catch((error)=>{
    //   // console.log(error.msg);
    //   throw error;
    // })
  }

  static post<T>(url: string, params: Object = {}, headers: Object = {}, config: Object = {}): Promise<T> {
    return Fetch.fetch({ method: 'post', url, params, headers, config });
    // .then((data)=>{
    //   // console.log(data);
    //   return data;
    // })
    // .catch((error)=>{
    //   // console.log(error.msg);
    //   throw error;
    // })
  }

  static upload<T>(url: string, params: Object = {}, headers: Object = {}, config: Object = {}): Promise<T> {
    const _headers = { 'Content-Type': 'multipart/form-data', ...headers };
    return RNFetchBlob.config(config)
      .fetch('POST', url, _headers, params)
      .then(response => response.json())
      .then(response => {
        // 上传信息返回
        console.log(response);
        return response;
      })
      .catch(error => {
        // 错误信息
        console.log(error);
        throw error;
      });
  }
}

export { Fetch };
