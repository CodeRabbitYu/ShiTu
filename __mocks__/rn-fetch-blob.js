/**
 * @flow
 * Created by Rabbit on 2018/7/24.
 */

// const existsMock = jest.fn();
// existsMock.mockReturnValueOnce({then: jest.fn()});

export default {
	DocumentDir: () => {},
	ImageCache: {
		get: {
			clear: () => {},
		},
	},
	fs: {
		// exists: existsMock,
		dirs: {
			MainBundleDir: () => {},
			CacheDir: () => {},
			DocumentDir: () => {},
		},
	},
};