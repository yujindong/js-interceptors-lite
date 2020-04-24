module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": true
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  // "plugins": ["import"],
  "extends": [
    "eslint:recommended"
    // "plugin:import/errors"
  ],
  "rules": {
    "no-unused-vars": [2, { "ignoreRestSiblings": true }],
    "prefer-arrow-callback": 2,
    "quotes": [2, "double"],
    "semi": [2, "always"],
  }
}
