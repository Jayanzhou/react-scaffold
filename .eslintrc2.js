module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended',
		'plugin:unicorn/recommended',
		'plugin:promise/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'unicorn', 'promise'],
	rules: {
		'import/extensions': [
			ERROR,
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
				json: 'never',
				js: 'never',
			},
		],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.tsx', '.ts', '.js', '.json'],
			},
		},
	},
}
