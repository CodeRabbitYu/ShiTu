module.exports = {
	"parser": "babel-eslint",
	"env": {
		"es6": true,
		"node": true,
		"react-native/react-native": true,
	},
	"globals": {
		"px2dp": true,
		"FONT_SIZE": true,
		"SCREEN_WIDTH": true,
		"SCREEN_HEIGHT": true,
		"iOS": true,
		"Android": true,
		"Toast": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:flowtype/recommended",
	],
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"react-native",
		"flowtype"
	],
	"rules": {
		// 启用严格模式
		'strict': 'error',
		// 空格方式,使用tab
		"indent": [
			"error",
			"tab",
		],
		// 处理器类型的转义
		"linebreak-style": [
			"error",
			"unix"
		],
		// 允许使用 单引号和es6的``
		"quotes": [
			"error",
			"single",
			{ "allowTemplateLiterals": true }
		],
		// 禁止不必要的分号
		"semi": [
			"error",
			"always"
		],
		// 禁止分号前后有空格
		"semi-spacing": 2,
		// 尽可能使用`===`
		"eqeqeq": 2,
		// 强制在代码块中开括号前和闭括号后有空格
		"block-spacing": [2, "always"],
		// 在代码块之前强制使用空格
		"space-before-blocks": 2,
		// 要求操作符周围有空格
		"space-infix-ops": 2,
		// 一元操作符必须要有空格
		"space-unary-ops": 2,
		// 强制在注释中 // 或 /* 使用一致的空格
		"spaced-comment": [2, "always", { exceptions: ["-"] }],
		// 强制关键字周围空格的一致性
		"keyword-spacing": [
			2,
			{ "before": true, "after": true }
		],
		// 强制在箭头函数中 "xxx() => {}"
		"arrow-spacing": [
			"error",
			{ "before": true, "after": true }
		],
		// 在冒号后要加上空格
		"key-spacing":[
			"error",
			{ "beforeColon": false }
		],
		// 禁止空格和 tab 的混合缩进
		"no-mixed-spaces-and-tabs": 0,
		// 不允许使用var
		"no-var": 2,
		// 要求在逗号后使用一个或多个空格
		"comma-spacing": [
			"error",
			{ "after": true }
		],
		// 禁止分号之前出现空格
		"semi-spacing": ["error", {"before": false, "after": true}],
		// 不允许改变用const声明的变量
		'no-const-assign': 'error',
		// 如果一个变量不会被重新赋值，最好使用const进行声明。
		'prefer-const': 'error',



		// 不允许使用行内样式
		"react-native/no-inline-styles": 2,
		// 强制类型后面要有一个","
		"flowtype/delimiter-dangle": [
			2,
			"only-multiline"
		],
		// 在 : 后强制加空格
		"flowtype/space-after-type-colon": [
			2,
			"always"
		],
		// 在 | & 符号中,强制加空格
		"flowtype/union-intersection-spacing": [
			2,
			"always"
		],

		"no-extra-boolean-cast": 0,
		"no-useless-computed-key": 0,

	}
};