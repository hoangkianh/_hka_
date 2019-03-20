module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'wordpress'
  ],
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
		'no-tabs': [
			'error',
			{ allowIndentationTabs: true }
		],
		'indent': ['error', 'tab']
  }
}
