#!/usr/bin/env node

const minimist = require('minimist');
const process = require('process');
const compose = require('../src/compose');

const { _, ...args } = minimist(process.argv.slice(2));
const paths = _.filter(path => path.length);
const configs = [{ ...args, paths }];
const { config, modules: { commands } } = compose({ configs });
console.log(config);
paths.forEach(dir => commands.indexgen(dir));
if (args.watch) paths.forEach(dir => commands.watch(dir));
