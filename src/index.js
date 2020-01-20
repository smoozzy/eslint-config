'use strict';

const semver = require('semver');
const meta = require('../package.json');
const {getPackageVersion} = require('./utils');


// @see https://eslint.org/docs/developer-guide/shareable-configs
// @see https://eslint.org/docs/user-guide/configuring

const version = getPackageVersion('eslint');

// check plugin version
if (!version || !semver.satisfies(version, meta.peerDependencies.eslint)) {
    return;
}

// export config
module.exports = require(`./rules/eslint`)(version);
