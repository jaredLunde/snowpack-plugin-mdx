<hr>
<div>
  <h1>
    snowpack-plugin-mdx
  </h1>
  <blockquote>Use the <a href="https://github.com/mdx-js/mdx/tree/master/packages/mdx">MDX compiler</a> to build <code>.mdx</code> and <code>.md</code> files in <a href="https://www.snowpack.dev/">Snowpack</a></blockquote>
  <pre>npm i -D snowpack-plugin-mdx @mdx-js/mdx @mdx-js/react</pre>

</div>

<p>
  <a aria-label="Types" href="https://www.npmjs.com/package/snowpack-plugin-mdx">
    <img alt="Types" src="https://img.shields.io/npm/types/snowpack-plugin-mdx?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/jaredLunde/snowpack-plugin-mdx">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/jaredLunde/snowpack-plugin-mdx?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/jaredLunde/snowpack-plugin-mdx">
    <img alt="Build status" src="https://img.shields.io/travis/com/jaredLunde/snowpack-plugin-mdx?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/snowpack-plugin-mdx">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/snowpack-plugin-mdx?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/snowpack-plugin-mdx?style=for-the-badge&labelColor=24292e">
  </a>
</p>
<hr>

## Quick start

```js
// snowpack.config.json
{
  "plugins": [["snowpack-plugin-mdx", { /* see "Plugin Options" below */}]]
}
```

#### Default Build Script

```js
{
  // Matches all ".mdx" and ".md" files
  "scripts": {"build:mdx,md": "snowpack-plugin-mdx"}
}
```

You can override this by setting your own `"snowpack-plugin-mdx"` build script.

#### Plugin Options

````typescript
interface SnowpackPluginMdxOptions {
  /**
   * Includes only the  specified paths
   */
  include?: string[]
  /**
   * Excludes the specified paths
   */
  exclude?: string[]
  /**
   * These options are passed directly to babel.transformAsync()
   */
  babelOptions?: TransformOptions
  /**
   * These options are passed directly to the MDX compiler
   */
  mdxOptions?: Record<string, any>
  /**
   * Override the default renderer
   *
   * @default ```js
   *   import * as React from 'react'
   *   import { mdx } from '＠mdx-js/react'
   * ```
   */
  renderer?: string
}
````

## LICENSE

MIT
