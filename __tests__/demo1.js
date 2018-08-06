// import { expect,  toBe } from 'jest';

// function sum(a, b) {
//   return a + b;
// }
//
// test('1 + 2 = 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });
//
// test('2 + 2 = 4', () => {
//   expect(2 + 2).toBe(4);
// });
//
// test('object assignment', () => {
//   const data = {one: 1};
//   data['two'] = 2;
//   expect(data).toEqual({one: 1, two: 2});
// });
//
// test('null', () => {
//   const n = null;
//   expect(n).toBeNull();
//   expect(n).toBeDefined();
//   expect(n).not.toBeUndefined();
//   expect(n).not.toBeTruthy();
//   expect(n).toBeFalsy();
// });
//
// test('zero', () => {
//   const z = 0;
//   expect(z).not.toBeNull();
//   expect(z).toBeDefined();
//   expect(z).not.toBeUndefined();
//   expect(z).not.toBeTruthy();
//   expect(z).toBeFalsy();
// });

// describe('arrayContaining', () => {
//   const expected = ['Alice', 'Bob'];
//   it('matches even if received contains additional elements', () => {
//     expect(['Alice', 'Bob', 'Eve', 'VVV']).toEqual(expect.arrayContaining(expected));
//   });
//   it('does not match if received does not contain expected elements', () => {
//     expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
//   });
// });

// describe('stringMatching in arrayContaining', () => {
//   const expected = [
//     expect.stringMatching(/^Alic/),
//     expect.stringMatching(/^[BR]ob/),
//   ];
//   it('matches even if received contains additional elements', () => {
//     expect(['Alicia', 'Roberto', 'Evelina']).toEqual(
//       expect.arrayContaining(expected),
//     );
//   });
//   it('does not match if received does not contain expected elements', () => {
//     expect(['Roberto', 'Evelina']).not.toEqual(
//       expect.arrayContaining(expected),
//     );
//   });
// });

// test('resolves to lemon', () => {
//   // make sure to add a return statement
//   return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
// });
//
test('rejects to octopus', () => {
	// make sure to add a return statement
	return expect(Promise.reject(new Error('octopus'))).rejects.toThrow(
		'octopus',
	);
});


// import {WealPictureDetailMobx} from '../app/mobx/News/WealPictureDetailMobx';
import {Test} from './Test';



describe('Test', () => {
	it('Test --- title', () => {

		const test = new Test();

		const text = 'Finish docs';

		const testParams = {
			'title': 'Finish docs',
		};

		expect.not.stringContaining(text);

		expect(test.setTitle(testParams));
	});
});


// test('the data is peanut butter', () => {
// 	expect.assertions(1);
// 	WealPictureDetailMobx.setHiddenNavBar(true);
// 	expect(data).toBe('peanut butter');
// });


// const mockFn = jest.fn();
// mockFn();
// expect(mockFn).toHaveBeenCalled();

// With a mock implementation:
// const returnsTrue = jest.fn(() => true);
// console.log(returnsTrue()); // true;