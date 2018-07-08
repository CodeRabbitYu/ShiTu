/**
 * Created by Rabbit on 2018/4/13.
 */

import axios from 'axios';

const _Axios = axios.create({
	// baseURL: "http://shitu.leanapp.cn/api",           // baseUrl
	baseURL: 'http://localhost:3000/api',
	// baseURL: 'http://gank.io/api',
	timeout: 10000,         // 超时
	responseType: 'json',   // 服务器响应的数据类型
	headers: {              // 请求头
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	},
	paramsSerializer: (params) => encodeQuery(params),
	// method:"",              // 请求类型
	// adapter: function (config) {}    // 允许自定义处理请求，以使测试更轻松
	// maxContentLength: 2000,      // 定义允许的响应内容的最大尺寸
	// maxRedirects: 5,         //  定义在 node.js 中 follow 的最大重定向数目, 如果设置为0，将不会 follow 任何重定向
	// httpAgent: new http.Agent({ keepAlive: true }),      // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。
	// httpsAgent: new https.Agent({ keepAlive: true },     // 允许像这样配置选项：`keepAlive` 默认没有启用
});

// 处理参数
const encodeQuery = (params = {}) => {
	return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
};

// 网络请求前处理
_Axios.interceptors.request.use(
	config => {
		console.log(config);

		if (
			config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
		) {

			// console.log(qs.stringify(config.data))
			// console.log(JSON.stringify(config.data));

			// 序列化
			config.data = encodeQuery(config.data);

		}

		return config;
	},
	error => {
		return Promise.reject(error.data.message);
	}
);

// 网络返回处理
_Axios.interceptors.response.use(
	res => {
		// console.log(res);

		// 对响应数据做些事, 需要看后台如何处理。
		// if (res.data && !res.data.success) {
		//     // 如果错误，返回错误信息
		//     return Promise.reject(res.data.message);
		// }

		return res;
	},
	error => {
		console.log(error);
	}
);

const Axios = {
	get: async (url, params, config) => {
		return _Axios({
			method: 'get',
			url: url,
			params,
			// data: encodeQuery(params),
			...config
		})
			.then((data) => {
				// console.log(data);
				return data;
			})
			.catch((error) => {
				// console.log(error.msg);
				throw error;
			});
	},
	post: async (url, params, config) => {
		return _Axios({
			method: 'post',
			url: url,
			data: params,
			...config
		})
			.then((data) => {
				// console.log(data);
				return data;
			})
			.catch((error) => {
				// console.log(error.msg);
				throw error;
			});
	}
};

export {
	Axios
};