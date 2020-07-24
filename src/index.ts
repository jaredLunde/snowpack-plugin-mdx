/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path'
import * as babel from '@babel/core'
import type {TransformOptions} from '@babel/core'
// @ts-ignore
import mdx from '@mdx-js/mdx'

const ext = /\.md$|\.mdx$/
const DEFAULT_RENDERER = `
import * as React from 'react'
import { mdx } from '@mdx-js/react'
`

module.exports = function plugin(
  _: any,
  pluginOptions: SnowpackPluginMdxOptions
) {
  return {
    defaultBuildScript: 'build:mdx,md',
    async build({contents, filePath}: {contents: string; filePath: string}) {
      if (!ext.test(filePath)) {
        return null
      }

      const mdxResult = await mdx(contents, {
        filepath: path.resolve(filePath),
        ...pluginOptions.mdxOptions,
      })
      const code = `${pluginOptions.renderer || DEFAULT_RENDERER}\n${mdxResult}`
      const config = babel.loadPartialConfig({
        filename: filePath,
        ...pluginOptions.babelOptions,
      })
      const transformOptions = config?.options
      const {code: transpiled} =
        (await babel.transformAsync(code, transformOptions)) || {}
      return {result: transpiled}
    },
  }
}

export interface SnowpackPluginMdxOptions {
  /**
   * These options are passed directly to babel.transformAsync()
   */
  babelOptions: TransformOptions
  /**
   * These options are passed directly to the MDX compiler
   */
  mdxOptions: Record<string, any>
  /**
   * Override the default renderer
   *
   * @default ```js
   *   import * as React from 'react'
   *   import { mdx } from '＠mdx-js/react'
   * ```
   */
  renderer: string
}
