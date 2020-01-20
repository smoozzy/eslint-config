module.exports = {
    root: true,

    env: {
        commonjs: true,
        node: true,
    },

    parserOptions: {
        ecmaVersion: 2018,
    },

    // rules
    ...require('./src'),
};
