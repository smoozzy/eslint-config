'use strict';

/* eslint-disable camelcase */

/* Rules list
 * https://github.com/jest-community/eslint-plugin-jest
 */

const semver = require('semver');
const {
    error,
    off,
    warn,
    getPackageVersion,
} = require('../utils');


/**
 * Jest package version
 *
 * @type {string}
 */
const JEST_VERSION = getPackageVersion('jest');

/* Rules list for Jest plugin 23.0
 * @link https://github.com/jest-community/eslint-plugin-jest/tree/v23.0.0#rules
 */
const rules23_0 = {
    'jest/consistent-test-it': [error, {          // enforce consistent test or it keyword
        fn: 'it',
    }],
    // ⚑ jest/expect-expect                       // enforce assertion to be made in a test body
    //   jest/lowercase-name                      // disallow capitalized test names
    //   jest/no-alias-methods                    // disallow alias methods
    // ⚑ jest/no-commented-out-tests              // disallow commented out tests
    // ⚑ jest/no-disabled-tests                   // disallow disabled tests
    'jest/no-duplicate-hooks': error,             // disallow duplicate hooks within a `describe` block
    //   jest/no-expect-resolves                  // disallow using `expect().resolves`
    // ✓ jest/no-export                           // disallow export from test files
    // ✓ jest/no-focused-tests                    // disallow focused tests
    //   jest/no-hooks                            // disallow setup and teardown hooks
    // ✓ jest/no-identical-title                  // disallow identical titles
    'jest/no-if': warn,                           // disallow conditional logic
    // ⚑ jest/no-jasmine-globals                  // disallow Jasmine globals
    // ✓ jest/no-jest-import                      // disallow importing `jest`
    //   jest/no-large-snapshots                  // disallow large snapshots
    // ✓ jest/no-mocks-import                     // disallow manually importing from `__mocks__`
    // ✓ jest/no-standalone-expect                // prevents `expect` statements outside of a `test` or `it` block
    // ✓ jest/no-test-callback                    // using a callback in asynchronous tests
    // ✓ jest/no-test-prefixes                    // disallow using `f` & `x` prefixes to define focused/skipped tests
    //   jest/no-test-return-statement            // disallow explicitly returning from tests
    'jest/no-truthy-falsy': error,                // disallow using `toBeTruthy()` & `toBeFalsy()`
    // ✓ jest/no-try-expect                       // prevent `catch` assertions in tests
    'jest/prefer-called-with': error,             // suggest using `toBeCalledWith()` OR `toHaveBeenCalledWith()`
    //   jest/prefer-expect-assertions            // suggest using `expect.assertions()` OR `expect.hasAssertions()`
    'jest/prefer-hooks-on-top': error,            // suggest to have all hooks at top-level before tests
    //   jest/prefer-inline-snapshots             // suggest using `toMatchInlineSnapshot()`
    'jest/prefer-spy-on': error,                  // suggest using `jest.spyOn()`
    'jest/prefer-strict-equal': error,            // suggest using `toStrictEqual()`
    'jest/prefer-to-be-null': error,              // suggest using `toBeNull()`
    'jest/prefer-to-be-undefined': error,         // suggest using `toBeUndefined()`
    'jest/prefer-to-contain': error,              // suggest using `toContain()`
    'jest/prefer-to-have-length': error,          // suggest using `toHaveLength()`
    'jest/prefer-todo': error,                    // suggest using `test.todo()`
    'jest/require-top-level-describe': error,     // require a top-level `describe` block
    'jest/require-to-throw-message': warn,        // require that `toThrow()` and `toThrowError` includes a message
    // ✓ jest/valid-describe                      // enforce valid `describe()` callback
    // ✓ jest/valid-expect                        // enforce valid `expect()` usage
    // ✓ jest/valid-expect-in-promise             // enforce having return statement when testing with promises
    'jest/valid-title': warn,                     // enforce valid titles for jest blocks
};

/* Rules introduced in Jest plugin 23.9
 * @link https://github.com/jest-community/eslint-plugin-jest/releases/tag/v23.9.0
 */
const rules23_9 = {
    'jest/no-deprecated-functions': error,        // disallow use of deprecated functions
};

/* Rules introduced in Jest plugin 23.11
 * @link https://github.com/jest-community/eslint-plugin-jest/releases/tag/v23.11.0
 */
const rules23_11 = {
    'jest/no-truthy-falsy': off,                  // (deprecated in v23.12)
    'jest/no-restricted-matchers': [error, {      // disallow specific matchers & modifiers
        toBeFalsy: null,
        toBeTruthy: null,
    }],
};


module.exports = (version) => ({
    plugins: [
        'jest',
    ],

    extends: [
        'plugin:jest/recommended',
    ],

    rules: Object.assign(
        {},  // target
        rules23_0,  // base rules
        semver.satisfies(version, '>= 23.9.0') && rules23_9,
        semver.satisfies(version, '>= 23.11.0') && rules23_11
    ),

    settings: {
        jest: {
            version: JEST_VERSION !== null ? semver.major(JEST_VERSION) : 23,
        },
    },
});
