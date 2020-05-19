# Smoozzy ESLint Config

Shareable config for Smoozzy projects


## How to use

Install ESLint

```sh
npm install eslint @smoozzy/eslint-config
```

Create config `.eslintrc.js`

```javascript
module.exports = {
    root: true,

    env: {
        browser: true,
    },

    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },

    extends: [
        '@smoozzy/eslint-config',
    ],
};

```


## ESLint and Plugins

* [ESLint](https://eslint.org/docs/rules/) (v5.0+)
* [Jest](https://github.com/jest-community/eslint-plugin-jest) (v23.0+)
* [Jest Formatting](https://github.com/dangreenisrael/eslint-plugin-jest-formatting) (v1.0+)
* [Vue](https://github.com/vuejs/eslint-plugin-vue) (v5.0+)


### Jest plugin

You can add Jest version explicitly to config file or the config tries to detect Jest version automatically

```javascript
module.exports = {
    // ...

    settings: {
        jest: {
            version: 26,  
        },
    },
};
```


## Further Reading

__ECMAScript features sets__

* [Speaking JavaScript](http://speakingjs.com/es5/) by Axel Rauschmayer (ES5)
* [Exploring ES6](https://exploringjs.com/es6/) by Axel Rauschmayer (ES6)
* [ECMAScript 2016: the final feature set](https://2ality.com/2016/01/ecmascript-2016.html) (ES7)
* [ECMAScript 2017: the final feature set](https://2ality.com/2016/02/ecmascript-2017.html)
* [ECMAScript 2018: the final feature set](https://2ality.com/2017/02/ecmascript-2018.html)
* [ECMAScript 2019: the final feature set](https://2ality.com/2018/02/ecmascript-2019.html)
* [ECMAScript 2020: the final feature set](https://2ality.com/2019/12/ecmascript-2020.html)

__ESLint__

* [Awesome ESLint](https://github.com/dustinspecker/awesome-eslint)
* [Configuring ESLint](https://eslint.org/docs/user-guide/configuring)
* [Shareable Configs](https://eslint.org/docs/developer-guide/shareable-configs)
