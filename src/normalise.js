const normConfig = config => {
    const fullySpecified = config.fullySpecified ?? config.type === 'esm';
    const applicableExtensions = config.applicableExtensions.map(ext => String(ext).toLowerCase());
    return { ...config, fullySpecified, applicableExtensions };
}

module.exports = config => {
    const overrides = Object.entries(config.overrides ?? {}).map(([dirpath, configOverride]) => {
        configOverride = normConfig({ ...config, ...configOverride });
        return [dirpath, configOverride];
    });
    return { ...config, overrides };
};
