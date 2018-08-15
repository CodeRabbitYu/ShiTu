/**
 * @flow
 * Created by Rabbit on 2018/8/15.
 */

import {AsyncStorage} from 'react-native';

import {observable, action, runInAction} from 'mobx';

class LoginMobx {
	@observable userData: Object;
	@observable params: Object = {};

	/**
	 * 获取用户输入的手机号和验证码
	 * @param value
	 * @param type
	 */
	@action.bound
	setLoginData (value: string, type: string) {
		this.params[type] = value;
	}

	/**
	 * 发送验证码
	 * @param params
	 * @returns {Promise<void>}
	 */
	@action.bound
	async sendCode(params: any) {
		try {
			// 调用发送验证码接口
			// const data = await fetchSendCode(...params);
			// console.log('responseData', data);
			return '1234';
		} catch (e) {
			console.log(e);
			throw (e);
		}
	}

	/**
	 * 判断用户是否输入手机号和验证码
	 * @returns {boolean}
	 */
	@action.bound
	checkObj() {
		const typeArr = [{key: 'mobile', value: '手机号'}, {key: 'code', value: '验证码'}];
		for (let i = 0; i < typeArr.length; i++) {
			if (!this.params[typeArr[i].key]) {
				console.log(typeArr[i].value + '不能为空');
				return false;
			}
		}
		return true;
	}

	/**
	 * 登录
	 * @param params
	 * @returns {Promise<void>}
	 */
	@action.bound
	async login(params: any) {

		try {
			// 调用登录接口，这里暂时没有使用哦
			// const data = await fetchLogin(...params);
			// console.log('responseData', data);

			const data = {
				userName: 'Rabbit',
				id: '1',
			};


			await AsyncStorage.setItem('USER_INFO', JSON.stringify(data));

			runInAction(() => {
				this.userData = data;
			});
		} catch (e) {
			console.log(e);
			throw (e);
		}
	}
}

export { LoginMobx };