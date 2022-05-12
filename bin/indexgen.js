#!/usr/bin/env node

const minimist = require('minimist');
const compose = require('../src/compose');
const process = require('process');
const { _, ...args } = minimist(process.argv.slice(2));
const paths = _.filter(p => p.length);

const parts = [
    args.watch ? 'Watching' : 'Generating',
    ...paths.map(p => `"${p}"`)
];

console.log(parts.join(' '));
const { commands } = compose(args);
paths.forEach(dir => commands.indexgen(dir));
if (args.watch) paths.forEach(dir => commands.watch(dir));
