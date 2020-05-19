const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'testing';


/**
 * Returns package version
 *
 * @param {string} packageName
 * @return {null|string}
 */
function getPackageVersion(packageName) {
    try {
        return require(`${packageName}/package.json`).version;

    } catch (ex) {
        return null;
    }
}


module.exports = {
    error: 'error',  // "✓" mark
    off: 'off',
    warn: 'warn',  // "⚑" mark
    isDevelopment: !isProduction && !isTesting,
    isProduction,
    isTesting,
    getPackageVersion,
};
