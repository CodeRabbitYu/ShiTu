/**
 * @flow
 * Created by Rabbit on 2018/7/24.
 */

import {welfareDetailMobx} from '../app/mobx/News/WealPictureDetailMobx';

// jest.mock('rn-fetch-blob', () => require('../__mocks__/rn-fetch-blob'));
jest.mock('rn-fetch-blob');

function sum(a, b) {
	return a + b;
}

class ContainEqual {

	params() {

		const _params = {
			name: '五六七',
			age: 20,
			sex: 'man'
		};

		return _params;
	}
}

describe('WealPictureDetailMobx', () => {

	// it('should times', function () {
	// 	const detailMobx = new WealPictureDetailMobx();
	//
	// 	const drink = jest.fn();
	// 	detailMobx.setHiddenNavBar(true);
	// 	expect(detailMobx).toHaveBeenCalled(2);
	// });



	const detailMobx = new WealPictureDetailMobx();
	const contain = new ContainEqual();


	it('还是测试参数', function () {
		const params = {
			name: '五六七',
			age: 20,
			sex: 'aaa'
		};
		expect(contain.params()).not.toStrictEqual(params);
	});

	it('对象参数是否一致', function () {
		const params = {
			name: '五六七',
			age: 20,
			sex: 'man'
		};
		expect(contain.params()).toEqual(params);
	});

	it('数组中的参数，是否与提供的对象参数一致', function () {
		const params = {
			name: '五六七',
			age: 20,
			sex: 'man'
		};
		expect([contain.params()]).toContainEqual(params);
	});

	it('测试setHiddenNavBar方法是否成立', function () {
		expect(detailMobx.setHiddenNavBar(true)).toEqual(true);
	});


	it('should saveImageWithIOS', function () {

		expect(detailMobx.saveImageWithIOS(''));
	});

	// it('should sum', function () {
	// 	expect(sum(10, '12')).toBe('102');
	// });

});