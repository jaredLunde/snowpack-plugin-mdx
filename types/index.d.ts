import type {TransformOptions} from '@babel/core'
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
