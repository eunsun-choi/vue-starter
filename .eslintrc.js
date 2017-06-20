module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': './build//webpack.base.conf.js'
      }
    }
  },
  // allow browser globals
  "env": {
    es6: true,
    "browser": true,
    "node": true
  },
  // allow spread operator
  parserOptions: {
    ecmaVersion: 6,
      ecmaFeatures: {
        experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  // allow globals
  globals: {
    document: false,
    navigator: false,
    window: false
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // console is ok
    'no-console': 0,
    // allow unary
    'no-plusplus': 0,
    // allow the use of variables/functions before they are defined as JS anyway does hoisting
    'no-use-before-define': 0,
    // allow reassigning/modifying function parameters or their properties
    'no-param-reassign': 0,
    // allow mixed operators
    'no-mixed-operators': 0,
    // allow dangling underscores in identifiers
    'no-underscore-dangle': 0,
    'no-lonely-if': 0,
    // disallow unused variables & allow unsused parameters
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none' }],
    // allow ternary
    'no-unused-expressions': ["error", { "allowTernary": true }],
    // don't allow linebreak on operator unless it's ternary
    'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
    // allow long lines in some cases
    'max-len': ["error", 150, { "ignoreTemplateLiterals": true, "ignoreStrings": true, "ignoreUrls": true }],
  },
};
