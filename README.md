# Module Indexgen

<p align="right"><code>88.11% cov</code>&nbsp;<code>229 sloc</code>&nbsp;<code>28 files</code>&nbsp;<code>4 deps</code>&nbsp;<code>10 dev deps</code></p>

Generates barrel (index.js) files that rollup exports for each module in a directory and re-exports them as a single module.

<br />

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Example](#example)
- [Architecture](#architecture)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

###### <p align="right"><a href="https://www.npmjs.com/package/module-indexgen">https://www.npmjs.com/package/module-indexgen</a></p>
```
npm install module-indexgen
```

Not to be confused with `indexgen` which is similar but deprecated.

## Usage

```
npx indexgen <targetDir> [<targetDir>...] [options]
```

Options:

`--watch`: Regenerate on file changes.

`--watchDelay`: Number of milliseconds to delay before reacting to file changes. Default is `1000`.

`--type`: `cjs` or `esm`. Default is `cjs`.

`--fullySpecified`: Maintain fully specified import paths as required by `esm`. Default is `true` for `esm`, otherwise `false`.

`--only`: Glob pattern to limit included files. Default is `*.{cjs,mjs,js,json,jsx}`.

`--ignore`: Paths to ignore. Default is `node_modules`.

`--case`: Case to apply to generated keys. Options are `camel`, `pascal`, `auto`, `none`. Default is `auto`.

`--sortSeparator`: Ignores the left side for the purpose of ordering, e.g. `1--b.js` and `2--a.js` becomes `b` and `a` in that order. Default is `--`.

`--reverseDelimiter`: Reverses generated keys by comma, e.g. `bar,foo` becomes `fooBar`. Default is `,`.

## Example

Given the following directory structure:

```
proj/
    src/
        components/
            foo.js
            bar.js
```

Running `indexgen` from the `proj` directory produces:

```
proj/
    src/
        index.js
        components/
            bar.js
            foo.js
            foo-bar.js
            index.js
```

Contents of `proj/src/components/index.js`:

```js
module.exports = {
    bar: require('./bar'),
    foo: require('./foo'),    
    fooBar: require('./foo-bar')
}
```

Notice the key for `foo-bar` is camel cased to `fooBar`.

Contents of `proj/src/index.js`:

```js
module.exports = {
    components: require('./components')
}
```

`require('./src')` produces:

```
{
    components: {
        foo: (exported value for foo.js),
        bar: (exported value for bar.js),
        fooBar: (exported value for foo-bar.js)
    }
}
```

## Architecture

###### <p align="right"><em>Can't see the diagram?</em> <a id="link-1" href="https://github.com/mattriley/node-module-indexgen#user-content-link-1">View it on GitHub</a></p>
```mermaid
graph TD;
    strategies-->util;
    lib-->strategies;
    lib-->util;
    fsx-->io;
    commands-->fsx;
    commands-->lib;
    commands-->io;
```
<p align="center">
  <em>This diagram was generated with <a href="https://github.com/mattriley/node-module-composer">Module Composer</a></em>
</p>
<br>
