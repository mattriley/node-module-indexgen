# Module Indexgen

<p align="right"><code>88.51% cov</code>&nbsp;<code>218 sloc</code>&nbsp;<code>27 files</code>&nbsp;<code>4 deps</code>&nbsp;<code>14 dev deps</code></p>

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

`--type`: `cjs` or `esm`. Default is determined by `type` in `package.json`.

`--watch`: Regenerate on file changes.

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
    commands-->fsx;
    commands-->lib;
    commands-->io;
    commands-->config;
    fsx-->config;
    fsx-->io;
    lib-->strategies;
    lib-->util;
    lib-->config;
    strategies-->util;
```
<p align="center">
  <em>This diagram was generated with <a href="https://github.com/mattriley/node-module-composer">Module Composer</a></em>
</p>
<br>
