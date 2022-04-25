#!/usr/bin/env node

const minimist = require('minimist');
const configure = require('../src/configure');
const { _: paths, ...args } = minimist(process.argv.slice(2));

const parts = [
    args.watch ? 'Watching' : 'Generating',
    ...paths.map(p => `"${p}"`)
];

console.log(parts.join(' '));
const { indexgen, watch } = configure(args);
paths.forEach(dir => indexgen(dir));
if (args.watch) paths.forEach(dir => watch(dir));
