/**
 * @flow
 * Created by Rabbit on 2018/4/13.
 */


import RNFetchBlob from 'rn-fetch-blob';

import {
	AsyncStorage
} from 'react-native';

interface RTBody {
  [key: string]: string | number | boolean;
}

// 处理url
function encodeQuery(url,  params = {}) {
	let _url = url;
	if (!params || !Object.keys(params).length) {
		return _url;
	}
	_url = _url.indexOf('?') === -1 ? `${_url}?` : `${_url}&`;
	const query = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
	return `${_url}${query}`;
}
// 处理错误请求
function throwError(json) {
	const error = new Error(json);
	error.msg = json.msg;
	error.status = json.status;
	throw error;
}
function checkStatus (resp, json) {
	if (resp.respInfo.status === 200 && resp.respInfo.status < 300) {
		return json;
	} else {
		console.log(resp, json);
		throwError(json);
	}
	return json;
}

class Fetch {
	// 框架可以用过cancel 取消某个网络请求
  /**
   * 设置Header请求头
   */
  header: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json',
  }
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
  }

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
  static fetch<T>({method, url, params = {}, config = {}, headers}): Promise<T> {
  	let _method;
  	let _params;
  	let _url = url;
  	const _config = { indicator: true, timeout: 30000, trusty: false, ...config};
  	const _headers = {
  		'Content-Type': 'application/json',
		  'User-Agent': 'ShiTu',
		  ...headers
  	};

  	// let userData = await AsyncStorage.getItem('USER_TOKEN');

  	if (!method) _method = 'GET';
  	else _method  = method.toUpperCase();

  	if (_method === 'GET' && params) {
  		_url = encodeQuery(_url, params);
  	}

  	if (_method === 'POST' && params) {
  		_params =  JSON.stringify(params);
  	}

  	if (__DEV__) {
  		console.log('_url:', _url);
  		// console.log('_params:', _params);
  		// console.log('_config:', _config);
  		// console.log('_method:', _method);
  		// console.log('_header:', _headers);
  	}

  	return RNFetchBlob
		  .config(_config)
		  .fetch(_method, _url, _headers, _params)
  		.then(resp => {
  			// console.log(resp);
  			return checkStatus(resp, resp.json());
  		})
  		.then((response) => {
  			return response;
  		})
  		.catch((error) => {
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
  static get<T>( url, params = {}, headers = {}, config = {}): Promise<T> {

  	return Fetch.fetch({method: 'get', url, params, headers, config });
  	// .then((data)=>{
  	//   // console.log(data);
  	//   return data;
  	// })
  	// .catch((error)=>{
  	//   // console.log(error.msg);
  	//   throw error;
  	// })
  }

  static post(url, params = {}, headers = {}, config = {} ): Promise {
  	return Fetch.fetch({method: 'post', url, params, headers, config });
  	// .then((data)=>{
  	//   // console.log(data);
  	//   return data;
  	// })
  	// .catch((error)=>{
  	//   // console.log(error.msg);
  	//   throw error;
  	// })
  }

  static upload(url, params = {}, _headers = {}, config = {} ): Promise {
  	const headers = {'Content-Type': 'multipart/form-data', ..._headers};
	  return RNFetchBlob
		  .config(config)
		  .fetch('POST', url, headers, params)
		  .then((response) => response.json())
		  .then((response) => {
			  // 上传信息返回
			  // console.log(response);
			  return response;
		  })
		  .catch((error) => {
			  // 错误信息
			  // console.log(error);
			  throw error;
		  });

  }
}

export { Fetch };
