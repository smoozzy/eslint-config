const semver = require('semver');
const meta = require('../package.json');
const {getPackageVersion} = require('./utils');


// @see https://eslint.org/docs/developer-guide/shareable-configs
// @see https://eslint.org/docs/user-guide/configuring

// export config
module.exports = [
    ...Object.entries(meta.peerDependencies),      // eslint package
    ...Object.entries(meta.optionalDependencies),  // plugins
].reduce((config, [plugin, range]) => {
    const version = getPackageVersion(plugin);

    // check plugin version
    if (!version || !semver.satisfies(version, range)) {
        return config;
    }

    // get plugin rules
    const fileRule = plugin.replace(/^eslint-plugin-/, '');
    const rules = require(`./rules/${fileRule}`)(version);

    // merge config
    Object.entries(rules).reduce((memo, [key, value]) => {
        const original = memo[key];

        if (Array.isArray(original)) {
            memo[key] = original.concat(value);
            return memo;
        }

        if (typeof original === 'object') {
            Object.assign(original, value);
            return memo;
        }

        // set (or replace) config key
        memo[key] = value;
        return memo;
    }, config);

    return config;
}, {});
