module.exports = config => {

    const fullySpecified = config.fullySpecified ?? config.type === 'esm';
    const applicableExtensions = config.applicableExtensions.map(ext => String(ext).toLowerCase());
    return { ...config, fullySpecified, applicableExtensions };

}
