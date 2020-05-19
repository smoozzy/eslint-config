/* Rules list
 * https://github.com/dangreenisrael/eslint-plugin-jest-formatting
 */

const {
    error,
} = require('../utils');


module.exports = () => ({
    plugins: [
        'jest-formatting',
    ],

    extends: [
        'plugin:jest-formatting/recommended',
    ],

    rules: {
        // ✓ jest-formatting/padding-around-after-all-blocks
        // ✓ jest-formatting/padding-around-after-each-blocks
        // ✓ jest-formatting/padding-around-before-all-blocks
        // ✓ jest-formatting/padding-around-before-each-blocks
        'jest-formatting/padding-around-expect-groups': error,
        // ✓ jest-formatting/padding-around-describe-blocks
        // ✓ jest-formatting/padding-around-test-blocks
        //   jest-formatting/padding-around-all
    },
});
