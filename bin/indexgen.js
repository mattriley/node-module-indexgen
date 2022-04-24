#!/usr/bin/env node

const minimist = require('minimist');
const configure = require('../src/configure');
const { _: pathList, ...args } = minimist(process.argv.slice(2));
const paths = pathList.flatMap(p => p.split(','));

const parts = [
    args.watch ? 'Watching' : 'Generating',
    ...paths.map(p => `"${p}"`)
];

console.log(parts.join(' '));
const { indexgen, watch } = configure(args);
paths.forEach(dir => indexgen(dir));
if (args.watch) paths.forEach(dir => watch(dir));
