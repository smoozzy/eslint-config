/* eslint-disable camelcase, max-len */

/* Rules list
 * https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/README.md#available-rules
 */

const semver = require('semver');
const {
    error,
    warn,
    off,
    isTesting,
} = require('../utils');


/**
 * Attributes order for rule `vue/attributes-order`
 *
 * @type {string[]}
 */
const ATTRIBUTES_ORDER = [
    'DEFINITION',        // ex: `is`
    'GLOBAL',            // ex: `id`
    'OTHER_ATTR',        // ex: `custom-prop="foo"`, `v-bind:prop="foo"`, `:prop="foo"`
    'UNIQUE',            // ex: `ref`, `key`, `slot`
    'LIST_RENDERING',    // ex: `v-for item in items`
    'CONDITIONALS',      // ex: `v-if`, `v-else-if`, `v-else`, `v-show`, `v-cloak`
    'RENDER_MODIFIERS',  // ex: `v-once`, `v-pre`
    'OTHER_DIRECTIVES',  // ex: `v-custom-directive`
    'TWO_WAY_BINDING',   // ex: `v-model`
    'EVENTS',            // ex: `@click="functionCall"`, `v-on="event"`
    'CONTENT',           // ex: `v-text`, `v-html`
];

/* Rules list for Vue plugin 5.0
 * @link https://github.com/vuejs/eslint-plugin-vue/blob/v5.0.0/docs/rules/README.md
 */
const rules5_0 = {
    // Base:
    // ✓ vue/comment-directive                    // support comment-directives in `<template>`
    // ✓ vue/jsx-uses-vars                        // prevent variables used in JSX to be marked as unused

    // Essential (Error Prevention):
    // ✓ vue/no-async-in-computed-properties      // disallow asynchronous actions in computed properties
    // ✓ vue/no-dupe-keys                         // disallow duplication of field names
    // ✓ vue/no-duplicate-attributes              // disallow duplication of attributes
    // ✓ vue/no-parsing-error                     // disallow parsing errors in `<template>`
    // ✓ vue/no-reserved-keys                     // disallow overwriting reserved keys
    // ✓ vue/no-shared-component-data             // enforce component's data property to be a function
    // ✓ vue/no-side-effects-in-computed-properties // disallow side effects in computed properties
    // ✓ vue/no-template-key                      // disallow `key` attribute on `<template>`
    // ✓ vue/no-textarea-mustache                 // disallow mustaches in `<textarea>`
    // ✓ vue/no-unused-components                 // disallow registering components that are not used inside templates
    // ✓ vue/no-unused-vars                       // disallow unused variable definitions of `v-for` directives or scope attributes
    // ✓ vue/no-use-v-if-with-v-for               // disallow use `v-if` on the same element as `v-for`
    // ✓ vue/require-component-is                 // require `v-bind:is` of `<component>` elements
    // ✓ vue/require-prop-type-constructor        // require prop type to be a constructor
    // ✓ vue/require-render-return                // enforce render function to always return value
    // ✓ vue/require-v-for-key                    // require `v-bind:key` with `v-for` directives
    // ✓ vue/require-valid-default-prop           // enforce props default values to be valid
    // ✓ vue/return-in-computed-property          // enforce that a return statement is present in computed property
    // ✓ vue/use-v-on-exact                       // enforce usage of `exact` modifier on `v-on`
    // ✓ vue/valid-template-root                  // enforce valid template root
    // ✓ vue/valid-v-bind                         // enforce valid `v-bind` directives
    // ✓ vue/valid-v-cloak                        // enforce valid `v-cloak` directives
    // ✓ vue/valid-v-else-if                      // enforce valid `v-else-if` directives
    // ✓ vue/valid-v-else                         // enforce valid `v-else` directives
    // ✓ vue/valid-v-for                          // enforce valid `v-for` directives
    // ✓ vue/valid-v-html                         // enforce valid `v-html` directives
    // ✓ vue/valid-v-if                           // enforce valid `v-if` directives
    // ✓ vue/valid-v-model                        // enforce valid `v-model` directives
    // ✓ vue/valid-v-on                           // enforce valid `v-on` directives
    // ✓ vue/valid-v-once                         // enforce valid `v-once` directives
    // ✓ vue/valid-v-pre                          // enforce valid `v-pre` directives
    // ✓ vue/valid-v-show                         // enforce valid `v-show` directives
    // ✓ vue/valid-v-text                         // enforce valid `v-text` directives

    // Strongly Recommended (Improving Readability):
    // ⚑ vue/attribute-hyphenation                // enforce attribute naming style on custom components in template
    // ⚑ vue/html-closing-bracket-newline         // require or disallow a line break before tag's closing brackets
    // ⚑ vue/html-closing-bracket-spacing         // require or disallow a space before tag's closing brackets
    // ⚑ vue/html-end-tags                        // enforce end tag style
    'vue/html-indent': [error, 4],                // enforce consistent indentation in `<template>`
    // ⚑ vue/html-quotes                          // enforce quotes style of HTML attributes
    // ⚑ vue/html-self-closing                    // enforce self-closing style
    'vue/max-attributes-per-line': ['error', {    // enforce the maximum number of attributes per line
        singleline: 2,
        multiline: {
            max: 1,
            allowFirstLine: true,
        },
    }],
    // ⚑ vue/multiline-html-element-content-newline // require a line break before and after the contents of a multiline element
    // ⚑ vue/mustache-interpolation-spacing       // enforce unified spacing in mustache interpolations
    // ⚑ vue/name-property-casing                 // enforce specific casing for the name property in Vue components
    // ⚑ vue/no-multi-spaces                      // disallow multiple spaces
    // ⚑ vue/no-spaces-around-equal-signs-in-attribute  // disallow spaces around equal signs in attribute
    // ⚑ vue/no-template-shadow                   // disallow variable declarations from shadowing variables declared in the outer scope
    // ⚑ vue/prop-name-casing                     // enforce specific casing for the Prop name in Vue components
    'vue/require-default-prop': isTesting ? warn : off, // require default value for props
    // ⚑ vue/require-prop-types                   // require type definitions in props
    // ⚑ vue/singleline-html-element-content-newline // require a line break before and after the contents of a singleline element
    // ⚑ vue/v-bind-style                         // enforce `v-bind` directive style
    // ⚑ vue/v-on-style                           // enforce `v-on` directive style

    // Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    'vue/attributes-order': [error, {             // enforce order of attributes
        order: ATTRIBUTES_ORDER,
    }],
    // ⚑ vue/no-v-html                            // disallow use of `v-html` to prevent XSS attack
    'vue/order-in-components': [error, {          // enforce order of properties in components
        order: [
            'name',
            'functional',
            'el',
            'parent',
            'extends',
            'mixins',
            ['props', 'propsData'],
            ['components', 'directives', 'filters'],
            'inheritAttrs',
            'model',
            'data',
            'computed',
            'methods',
            'watch',
            'LIFECYCLE_HOOKS',
            ['delimiters', 'comments'],
            ['template', 'render'],
            'renderError',
        ],
    }],
    // ⚑ vue/this-in-template                     // enforce usage of `this` in template

    // Uncategorized
    'vue/component-name-in-template-casing': warn, // enforce specific casing for the component naming style in template
    'vue/script-indent': [error, 4, {             // enforce consistent indentation in `<script>`
        baseIndent: 1,
        switchCase: 1,
    }],
};

/* Rules introduced in Vue plugin 5.2
 * @link https://github.com/vuejs/eslint-plugin-vue/releases/tag/v5.2.0
 */
const rules5_2 = {
    // Uncategorized
    'vue/array-bracket-spacing': [error, 'never'], // enforce consistent spacing inside array brackets
    'vue/arrow-spacing': [error, {                // enforce consistent spacing before and after the arrow in arrow functions
        before: true,
        after: true,
    }],
    'vue/block-spacing': [error, 'always'],       // disallow or enforce spaces inside of blocks after opening block and before closing block
    'vue/brace-style': [error, '1tbs'],           // enforce consistent brace style for blocks
    'vue/camelcase': error,                       // enforce camelcase naming convention
    'vue/comma-dangle': [error, {                 // require trailing commas
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
    }],
    'vue/component-name-in-template-casing': [error, 'kebab-case', { // enforce specific casing for the component naming style in template
        registeredComponentsOnly: true,
    }],
    'vue/eqeqeq': error,                          // require the use of `===` and `!==`
    'vue/key-spacing': [error, {                  // enforce consistent spacing between keys and values in object literal properties
        beforeColon: false,
        afterColon: true,
    }],
    //   vue/match-component-file-name            // require component name property to match its file name
    //   vue/no-boolean-default                   // disallow boolean defaults
    //   vue/no-restricted-syntax                 // disallow specified syntax
    'vue/object-curly-spacing': [error, 'never'], // enforce consistent spacing inside braces
    'vue/require-direct-export': error,           // require the component to be directly exported
    'vue/space-infix-ops': error,                 // require spacing around infix operators
    'vue/space-unary-ops': [error, {              // enforce consistent spacing before or after unary operators
        words: true,
        nonwords: false,
    }],
    'vue/v-on-function-call': error,              // enforce or forbid parentheses after method calls without arguments in `v-on` directives
};

/* Rules introduced in Vue plugin 6.0
 * @link https://github.com/vuejs/eslint-plugin-vue/releases/tag/v6.0.0
 */
const rules6_0 = {
    // Uncategorized
    'vue/dot-location': [error, 'property'],      // enforce consistent newlines before and after dots
    'vue/keyword-spacing': [error, {              // enforce consistent spacing between keys and values in object literal properties
        before: true,
        after: true,
    }],
    'vue/no-deprecated-scope-attribute': error,   // disallow deprecated `scope` attribute (in Vue.js 2.5.0+)
    'vue/no-empty-pattern': error,                // disallow empty destructuring patterns
    'vue/v-slot-style': error,                    // enforce `v-slot` directive style
    'vue/valid-v-slot': error,                    // enforce valid `v-slot` directives
};

/* Rules introduced in Vue plugin 6.1
 * @link https://github.com/vuejs/eslint-plugin-vue/releases/tag/v6.1.0
 */
const rules6_1 = {
    // Uncategorized
    'vue/component-definition-name-casing': error, // enforce specific casing for component definition name
    'vue/component-tags-order': [error, {         // enforce order of component top-level elements
        order: [
            'template',
            'script',
            'style',
        ],
    }],
    'vue/no-deprecated-slot-attribute': error,    // disallow deprecated `slot` attribute (in Vue.js 2.6.0+)
    'vue/no-deprecated-slot-scope-attribute': error, // disallow deprecated `slot-scope` attribute (in Vue.js 2.6.0+)
    'vue/no-irregular-whitespace': [error, {      // disallow irregular whitespace
        skipStrings: false,
    }],
    'vue/no-reserved-component-names': error,     // disallow the use of reserved names in component definitions
    //   vue/no-unsupported-features              // disallow unsupported Vue.js syntax on the specified version
    'vue/no-static-inline-styles': error,         // disallow static inline `style` attributes
    'vue/require-name-property': error,           // require a name property in Vue components
    //   vue/static-class-names-order             // enforce static class names order
    'vue/valid-v-bind-sync': error,               // enforce valid `.sync` modifier on `v-bind` directives
};
const overrides6_1 = {  // applies only to `.vue` files
    'vue/max-len': [error, {                      // enforce a maximum line length
        code: 120,
        template: 120,
        comments: 120,
        ignoreUrls: true,
        ignoreStrings: true,
    }],
};

/* Rules introduced in Vue plugin 6.2
 * @link https://github.com/vuejs/eslint-plugin-vue/releases/tag/v6.2.0
 */
const rules6_2 = {
    // Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    'vue/attributes-order': [error, {             // enforce order of attributes
        order: ATTRIBUTES_ORDER,
        alphabetical: true,
    }],

    // Uncategorized
    'vue/padding-line-between-blocks': error,     // require padding lines between blocks
    //   vue/sort-keys                            // enforce sort-keys in a manner that is compatible with order-in-components
};


module.exports = (version) => ({
    plugins: [
        'vue',
    ],

    extends: [
        'plugin:vue/recommended',
    ],

    rules: Object.assign(
        {},  // target
        rules5_0,  // base rules
        semver.satisfies(version, '>= 5.2.0') && rules5_2,
        semver.satisfies(version, '>= 6.0.0') && rules6_0,
        semver.satisfies(version, '>= 6.1.0') && rules6_1,
        semver.satisfies(version, '>= 6.2.0') && rules6_2
    ),

    overrides: [{
        files: [
            '*.vue',
        ],
        rules: Object.assign(
            {  // target and base rules
                indent: off,
            },
            semver.satisfies(version, '>= 6.1.0') && overrides6_1
        ),
    }],
});
