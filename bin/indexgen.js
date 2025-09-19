#!/usr/bin/env node

const minimist = require('minimist');
const process = require('process');
const compose = require('../src/compose');
const fs = require('fs');

const { _, ...args } = minimist(process.argv.slice(2));
const paths = _.filter(path => path.length);

const pathConfigs = Object.fromEntries(paths.map(dirPath => {
    const configOverridePath = `${dirPath}/indexgen.config.json`;
    const configOverride = fs.existsSync(configOverridePath) ? JSON.parse(fs.readFileSync(configOverridePath, 'utf-8')) : {};
    return [dirPath, configOverride];
}));

const config = { ...args, paths, overrides: pathConfigs };

console.warn(config)

const modules = compose({ config });
console.log(modules.config);
paths.forEach(dir => modules.commands.indexgen(dir));
if (args.watch) paths.forEach(dir => modules.commands.watch(dir));
