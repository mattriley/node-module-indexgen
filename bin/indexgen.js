#!/usr/bin/env node

const minimist = require('minimist');
const process = require('process');
const compose = require('../src/compose');
const fs = require('fs');

const { _, ...args } = minimist(process.argv.slice(2));
const paths = _.filter(path => path.length);

// TODO: Refactor
const pathConfigs = Object.fromEntries(paths.map(dirPath => {
    const configOverridePath = `${dirPath}/indexgen.config.json`;
    const configOverride = fs.existsSync(configOverridePath) ? JSON.parse(fs.readFileSync(configOverridePath, 'utf-8')) : {};
    return [dirPath, configOverride];
}));

const configs = [{ ...args, paths, overrides: pathConfigs }];
const { config, modules: { commands } } = compose({ configs });
console.log(config);
paths.forEach(dir => commands.indexgen(dir));
if (args.watch) paths.forEach(dir => commands.watch(dir));
