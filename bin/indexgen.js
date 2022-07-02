#!/usr/bin/env node

const minimist = require('minimist');
const process = require('process');
const package = require(process.cwd() + '/package.json');
const compose = require('../src/compose');

const { _, ...args } = minimist(process.argv.slice(2));
const type = package.type === 'module' ? 'esm' : 'cjs';
const paths = _.filter(p => p.length);
const configs = [{ paths, type, ...args }];

const parts = [
    args.watch ? 'Watching' : 'Generating',
    ...paths.map(p => `"${p}"`)
];

if (args.showConfig) console.log(JSON.stringify(config, null, 2))
console.log(parts.join(' '));

const { modules } = compose({ configs });
const { commands } = modules;
paths.forEach(dir => commands.indexgen(dir));
if (args.watch) paths.forEach(dir => commands.watch(dir));
